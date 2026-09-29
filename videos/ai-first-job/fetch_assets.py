"""下載影片用到嘅字體同 3D 插圖（渲染前跑一次）。

    python fetch_assets.py

- 字體：Google Fonts（Noto Sans TC 黑體、LXGW WenKai TC 霞鶩文楷、Poppins 數字），
  裝去 ~/.local/share/fonts/tutorial-video/ 再 fc-cache，唔會放入 repo（檔案大）。
- 插圖：Microsoft Fluent Emoji 3D（MIT 授權），掃描 scenes.js 入面所有 `img: '名稱'`，
  下載到 assets/fluent/<slug>.png。名稱用 Fluent 資料夾名，例如 'Rocket'、'Satellite antenna'、
  'Hourglass not done'（完整清單：https://github.com/microsoft/fluentui-emoji/tree/main/assets）。
"""

import re
import subprocess
import urllib.parse
import urllib.request
from pathlib import Path

HERE = Path(__file__).resolve().parent
FONT_DIR = Path.home() / '.local/share/fonts/tutorial-video'
FONTS_CSS = (
    'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700;900'
    '&family=LXGW+WenKai+TC:wght@400;700&family=Poppins:wght@600;800'
)
FLUENT = 'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/{folder}/3D/{file}_3d.png'


def get(url: str) -> bytes:
    req = urllib.request.Request(url, headers={'User-Agent': 'curl/8'})  # 呢個 UA 會拎到 TTF
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read()


def slug(name: str) -> str:
    return re.sub(r'[^a-z0-9]+', '_', name.lower()).strip('_')


def fetch_fonts():
    FONT_DIR.mkdir(parents=True, exist_ok=True)
    css = get(FONTS_CSS).decode()
    faces = re.findall(r"font-family: '([^']+)';.*?font-weight: (\d+);.*?url\((\S+?)\)", css, re.S)
    for family, weight, url in faces:
        out = FONT_DIR / f'{slug(family)}_{weight}.ttf'
        if not out.exists():
            out.write_bytes(get(url))
            print(f'  font {family} {weight} ({out.stat().st_size / 1e6:.1f} MB)')
    subprocess.run(['fc-cache', '-f', str(FONT_DIR)], check=False)
    print(f'fonts ready: {len(faces)} faces in {FONT_DIR}')


def fetch_images():
    text = (HERE / 'scenes.js').read_text(encoding='utf-8')
    # img: '名稱'，加上標題頁 imgs 拼貼嘅 ['名稱', x, y, size]
    names = sorted(set(re.findall(r"img:\s*'([^']+)'", text)) | set(re.findall(r"\[\s*'([^']+)'\s*,\s*\d", text)))
    out_dir = HERE / 'assets/fluent'
    out_dir.mkdir(parents=True, exist_ok=True)
    missing = []
    for name in names:
        out = out_dir / f'{slug(name)}.png'
        if out.exists():
            continue
        # Fluent 檔名：細楷、空格變底線、保留連字號
        url = FLUENT.format(folder=urllib.parse.quote(name), file=urllib.parse.quote(name.lower().replace(' ', '_')))
        try:
            out.write_bytes(get(url))
        except OSError:
            missing.append(name)
    print(f'images ready: {len(names) - len(missing)}/{len(names)} in {out_dir}')
    if missing:
        print('  搵唔到（請核對 Fluent 資料夾名）:', ', '.join(missing))


if __name__ == '__main__':
    fetch_fonts()
    fetch_images()
