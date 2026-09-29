"""將 slides.html 逐格渲染成有旁白嘅 MP4，同時輸出 SRT 字幕同旁白稿。

用法：
    pip install playwright imageio-ffmpeg
    python render.py --lang yue --clip 10    # 先出頭 10 秒試聽，確認咗先出成條片
    python render.py --lang yue --speed 1.8  # 臨時改語速（Google 預設鎖 1.5 倍）
    python render.py --lang yue              # 廣東話旁白 → <slug>.yue.mp4
    python render.py --lang cmn              # 普通話旁白 → <slug>.cmn.mp4
    python render.py --lang cmn --engine melo   # 普通話用離線 MeloTTS（見 tts.py）
    python render.py --lang yue --silent     # 唔配音，用字數估時間
    python render.py --preview               # 只截每個 step 嘅最終畫面去 preview/

可選環境變數：
    CHROMIUM_PATH  指定 Chromium 執行檔（預設用 Playwright 自帶）
    FRAMES_DIR     暫存影格資料夾（預設 ./.frames）
"""

import argparse
import math
import os
import shutil
import subprocess
import wave
from pathlib import Path

import imageio_ffmpeg
from playwright.sync_api import sync_playwright

import tts

HERE = Path(__file__).resolve().parent
FPS = 30
LEAD, TAIL = 0.2, 0.45  # 每句旁白前後留白（秒）


def reading_seconds(text: str) -> float:
    # 冇配音時：中文字幕閱讀速度約每秒 7 個字，再加 0.9 秒緩衝
    return max(2.8, len(text) * 0.15 + 0.9)


def srt_time(sec: float) -> str:
    ms = int(round(sec * 1000))
    h, ms = divmod(ms, 3_600_000)
    m, ms = divmod(ms, 60_000)
    s, ms = divmod(ms, 1000)
    return f'{h:02}:{m:02}:{s:02},{ms:03}'


def frames_ceil(sec: float) -> float:
    return math.ceil(sec * FPS) / FPS


def build_timeline(page, args):
    counts = page.evaluate('SCENES.map((s) => s.steps.length)')
    timeline = []
    elapsed = 0.0
    for si, n in enumerate(counts):
        for k in range(n):
            if args.clip and elapsed >= args.clip:
                return timeline  # 試聽模式：夠鐘就唔再合成後面嘅句子
            text = page.evaluate(f'stepText({si}, {k}, {args.lang!r})')
            trans = frames_ceil(page.evaluate(f'transitionFor({si}, {k})'))
            clip = None
            if args.silent or args.preview:
                total = trans + reading_seconds(text)
            else:
                clip = tts.synthesize(text, args.lang, args.engine, args.speed)
                total = max(trans + 0.8, LEAD + tts.wav_seconds(clip) + TAIL)
                print(f'  [{si:02}.{k}] {tts.wav_seconds(clip):5.2f}s  {text[:40]}')
            timeline.append({'si': si, 'k': k, 'text': text, 'trans': trans, 'total': frames_ceil(total), 'clip': clip})
            elapsed += frames_ceil(total)
    return timeline


def write_srt_and_script(timeline, page, lang):
    brand = page.evaluate("(META.title || META.brand || '').replace(/<[^>]+>/g, '')")
    titles = page.evaluate("SCENES.map((s) => s.title || s.file || 'Terminal')")
    head = {'yue': '廣東話旁白稿', 'cmn': '普通話旁白稿'}[lang]
    srt, script, t, last_si = [], [f'# {brand} — {head}', ''], 0.0, -1
    for i, st in enumerate(timeline, 1):
        start, end = t, t + st['total']
        srt += [str(i), f'{srt_time(start)} --> {srt_time(end)}', st['text'], '']
        if st['si'] != last_si:
            script += ['', f"## {st['si'] + 1}. {titles[st['si']]}", '']
            last_si = st['si']
        script.append(f"- `{srt_time(start)[:8]}` {st['text']}")
        t = end
    (HERE / f'narration.{lang}.srt').write_text('\n'.join(srt), encoding='utf-8')
    (HERE / f'script.{lang}.md').write_text('\n'.join(script) + '\n', encoding='utf-8')
    return t


def write_audio(timeline, path: Path):
    """將每句旁白放喺佢嗰個 step 開始後 LEAD 秒，其餘補靜音，同畫面逐格對齊。"""
    with wave.open(str(path), 'wb') as out:
        out.setnchannels(1)
        out.setsampwidth(2)
        out.setframerate(tts.SAMPLE_RATE)
        for st in timeline:
            n_total = round(st['total'] * tts.SAMPLE_RATE)
            voice = tts.wav_frames(st['clip']) if st['clip'] else b''
            lead = round(LEAD * tts.SAMPLE_RATE) * 2 if voice else 0
            body = (b'\0' * lead + voice)[: n_total * 2]
            out.writeframes(body + b'\0' * (n_total * 2 - len(body)))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--lang', choices=['yue', 'cmn'], default='yue')
    ap.add_argument('--engine', choices=['google', 'melo'], default='google')
    ap.add_argument('--speed', type=float, default=None, help='旁白語速倍數；預設跟引擎（google 鎖 1.5）')
    ap.add_argument('--clip', type=float, default=None, metavar='SECONDS', help='只出頭 N 秒試聽片（出成條片前俾用戶確認）')
    ap.add_argument('--silent', action='store_true')
    ap.add_argument('--preview', action='store_true')
    args = ap.parse_args()

    frames_dir = Path(os.environ.get('FRAMES_DIR', HERE / ('preview' if args.preview else '.frames')))
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

        out_mp4 = HERE / f"{page.evaluate('META.slug') or 'video'}.{args.lang}{'.clip' if args.clip else ''}.mp4"
        timeline = build_timeline(page, args)
        total = sum(st['total'] for st in timeline)
        if not args.preview and not args.clip:
            write_srt_and_script(timeline, page, args.lang)
        print(f'{len(timeline)} steps, {total:.1f}s ({total / 60:.1f} min)')

        concat, n, elapsed = [], 0, 0.0
        for st in timeline:
            si, k = st['si'], st['k']
            if args.preview:
                page.evaluate(f"renderFrame({si}, {k}, 1, {elapsed / total}, {args.lang!r})")
                page.screenshot(path=str(frames_dir / f's{si:02}_{k:02}.png'))
                elapsed += st['total']
                continue
            nframes = round(st['trans'] * FPS)
            for f in range(1, nframes + 1):
                t = f / nframes
                prog = (elapsed + t * st['trans']) / total
                page.evaluate(f"renderFrame({si}, {k}, {t}, {prog}, {args.lang!r})")
                path = frames_dir / f'{n:05}.jpg'
                page.screenshot(path=str(path), type='jpeg', quality=94)
                n += 1
                # 最後一格停留到呢個 step 完結
                dur = 1 / FPS + (st['total'] - st['trans'] if f == nframes else 0)
                concat.append(f"file '{path}'\nduration {dur:.4f}")
            elapsed += st['total']
        browser.close()

    if args.preview:
        print(f'preview frames -> {frames_dir}')
        return

    # concat demuxer 要求最後一格重覆一次，先會用到佢嘅 duration
    concat.append(concat[-1].split('\n')[0])
    list_file = frames_dir / 'list.txt'
    list_file.write_text('\n'.join(concat), encoding='utf-8')

    audio_in = ['-f', 'lavfi', '-i', 'anullsrc=channel_layout=mono:sample_rate=24000']
    if not args.silent:
        voice = frames_dir / 'voice.wav'
        write_audio(timeline, voice)
        audio_in = ['-i', str(voice)]

    cmd = [
        imageio_ffmpeg.get_ffmpeg_exe(), '-y', '-loglevel', 'error',
        '-f', 'concat', '-safe', '0', '-i', str(list_file), *audio_in,
        '-vf', f'fps={FPS},format=yuv420p',
        '-c:v', 'libx264', '-preset', 'slow', '-crf', '22', '-tune', 'stillimage',
        '-c:a', 'aac', '-b:a', '96k', '-shortest', *(['-t', str(args.clip)] if args.clip else []),
        '-movflags', '+faststart', str(out_mp4),
    ]
    subprocess.run(cmd, check=True)
    shutil.rmtree(frames_dir, ignore_errors=True)
    print(f'video -> {out_mp4} ({out_mp4.stat().st_size / 1e6:.1f} MB)')


if __name__ == '__main__':
    main()
