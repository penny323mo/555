"""將 slides.html 逐格渲染成 MP4，同時輸出 SRT 字幕同旁白稿。

用法：
    pip install playwright imageio-ffmpeg
    python render.py                 # 輸出 spec-driven-dev.mp4 / narration.srt / script.md
    python render.py --preview       # 只截每個 step 嘅最終畫面去 preview/，方便檢查排版

可選環境變數：
    CHROMIUM_PATH  指定 Chromium 執行檔（預設用 Playwright 自帶）
    FRAMES_DIR     暫存影格資料夾（預設 ./.frames）
"""

import math
import os
import shutil
import subprocess
import sys
from pathlib import Path

import imageio_ffmpeg
from playwright.sync_api import sync_playwright

HERE = Path(__file__).resolve().parent
FPS = 30
OUT_MP4 = HERE / 'spec-driven-dev.mp4'
OUT_SRT = HERE / 'narration.srt'
OUT_SCRIPT = HERE / 'script.md'


def hold_seconds(text: str) -> float:
    # 中文字幕閱讀速度約每秒 7 個字，再加 0.9 秒緩衝
    return max(2.8, len(text) * 0.15 + 0.9)


def srt_time(sec: float) -> str:
    ms = int(round(sec * 1000))
    h, ms = divmod(ms, 3_600_000)
    m, ms = divmod(ms, 60_000)
    s, ms = divmod(ms, 1000)
    return f'{h:02}:{m:02}:{s:02},{ms:03}'


def build_timeline(page):
    steps = page.evaluate('SCENES.map((s) => s.steps)')
    timeline = []
    for si, scene_steps in enumerate(steps):
        for k, text in enumerate(scene_steps):
            # 過場長度對齊到整數格，SRT 時間先會同畫面完全一致
            trans = math.ceil(page.evaluate(f'transitionFor({si}, {k})') * FPS) / FPS
            timeline.append({'si': si, 'k': k, 'text': text, 'trans': trans, 'hold': hold_seconds(text)})
    return timeline


def write_srt_and_script(timeline, page):
    titles = page.evaluate("SCENES.map((s) => s.title || s.file || 'Terminal')")
    srt, script, t = [], ['# Spec-Driven Development × Coding Agent — 旁白稿', ''], 0.0
    last_si = -1
    for i, st in enumerate(timeline, 1):
        start, end = t, t + st['trans'] + st['hold']
        srt += [str(i), f'{srt_time(start)} --> {srt_time(end)}', st['text'], '']
        if st['si'] != last_si:
            script += ['', f"## {st['si'] + 1}. {titles[st['si']]}", '']
            last_si = st['si']
        script.append(f"- `{srt_time(start)[:8]}` {st['text']}")
        t = end
    OUT_SRT.write_text('\n'.join(srt), encoding='utf-8')
    OUT_SCRIPT.write_text('\n'.join(script) + '\n', encoding='utf-8')
    return t


def main():
    preview = '--preview' in sys.argv
    frames_dir = Path(os.environ.get('FRAMES_DIR', HERE / ('preview' if preview else '.frames')))
    shutil.rmtree(frames_dir, ignore_errors=True)
    frames_dir.mkdir(parents=True)

    with sync_playwright() as p:
        launch_opts = {}
        if os.environ.get('CHROMIUM_PATH'):
            launch_opts['executable_path'] = os.environ['CHROMIUM_PATH']
        browser = p.chromium.launch(**launch_opts)
        page = browser.new_page(viewport={'width': 1920, 'height': 1080})
        page.goto((HERE / 'slides.html').as_uri())
        page.evaluate('document.fonts.ready')

        timeline = build_timeline(page)
        total = write_srt_and_script(timeline, page)
        print(f'{len(timeline)} steps, {total:.1f}s ({total / 60:.1f} min)')

        concat, n, elapsed = [], 0, 0.0
        for st in timeline:
            si, k = st['si'], st['k']
            if preview:
                page.evaluate(f'renderFrame({si}, {k}, 1, {elapsed / total})')
                page.screenshot(path=str(frames_dir / f's{si:02}_{k:02}.png'))
                elapsed += st['trans'] + st['hold']
                continue
            nframes = max(1, round(st['trans'] * FPS))
            for f in range(1, nframes + 1):
                t = f / nframes
                prog = (elapsed + t * st['trans']) / total
                page.evaluate(f'renderFrame({si}, {k}, {t}, {prog})')
                path = frames_dir / f'{n:05}.jpg'
                page.screenshot(path=str(path), type='jpeg', quality=94)
                n += 1
                dur = 1 / FPS + (st['hold'] if f == nframes else 0)
                concat.append(f"file '{path}'\nduration {dur:.4f}")
            elapsed += st['trans'] + st['hold']
        browser.close()

    if preview:
        print(f'preview frames -> {frames_dir}')
        return

    # concat demuxer 要求最後一格重覆一次，先會用到佢嘅 duration
    concat.append(concat[-1].split('\n')[0])
    list_file = frames_dir / 'list.txt'
    list_file.write_text('\n'.join(concat), encoding='utf-8')

    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    cmd = [
        ffmpeg, '-y', '-loglevel', 'error',
        '-f', 'concat', '-safe', '0', '-i', str(list_file),
        '-f', 'lavfi', '-i', 'anullsrc=channel_layout=stereo:sample_rate=44100',
        '-vf', f'fps={FPS},format=yuv420p',
        '-c:v', 'libx264', '-preset', 'slow', '-crf', '22', '-tune', 'stillimage',
        '-c:a', 'aac', '-b:a', '64k', '-shortest',
        '-movflags', '+faststart', str(OUT_MP4),
    ]
    subprocess.run(cmd, check=True)
    shutil.rmtree(frames_dir, ignore_errors=True)
    print(f'video -> {OUT_MP4} ({OUT_MP4.stat().st_size / 1e6:.1f} MB)')


if __name__ == '__main__':
    main()
