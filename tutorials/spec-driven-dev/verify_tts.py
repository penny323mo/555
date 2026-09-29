"""配音自動核對：逐句合成 → SenseVoice 語音辨識 → 同原文比相似度，列出可能讀錯嘅句子。

用法：
    pip install sherpa-onnx soundfile opencc-python-reimplemented
    # 下載並解壓 SenseVoice（支援廣東話 / 普通話 / 英文）：
    # https://github.com/k2-fsa/sherpa-onnx/releases/download/asr-models/sherpa-onnx-sense-voice-zh-en-ja-ko-yue-2024-07-17.tar.bz2
    SENSEVOICE_DIR=/path/to/sherpa-onnx-sense-voice-zh-en-ja-ko-yue-2024-07-17 python verify_tts.py --lang yue
"""

import argparse
import difflib
import os
import re
import wave
from pathlib import Path

import numpy as np
import sherpa_onnx
from opencc import OpenCC
from playwright.sync_api import sync_playwright

import tts

HERE = Path(__file__).resolve().parent
t2s = OpenCC('t2s')


def norm(s: str) -> str:
    s = t2s.convert(tts.speech_text(s, 'cmn')).lower()
    return re.sub(r'[^\w]|_', '', s)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--lang', choices=['yue', 'cmn'], default='yue')
    ap.add_argument('--engine', choices=['google', 'melo'], default='google')
    ap.add_argument('--speed', type=float, default=1.5, help='旁白語速倍數（atempo，唔變音調）')
    ap.add_argument('--threshold', type=float, default=0.85)
    args = ap.parse_args()

    d = Path(os.environ['SENSEVOICE_DIR'])
    rec = sherpa_onnx.OfflineRecognizer.from_sense_voice(
        model=str(d / 'model.int8.onnx'), tokens=str(d / 'tokens.txt'), use_itn=True, num_threads=4, language=args.lang if args.lang == 'yue' else 'zh'
    )

    with sync_playwright() as p:
        opts = {'executable_path': os.environ['CHROMIUM_PATH']} if os.environ.get('CHROMIUM_PATH') else {}
        browser = p.chromium.launch(**opts)
        page = browser.new_page()
        page.goto((HERE / 'slides.html').as_uri())
        texts = page.evaluate(f'SCENES.flatMap((s, si) => s.steps.map((_, k) => [si, k, stepText(si, k, {args.lang!r})]))')
        browser.close()

    scores, flagged = [], []
    for si, k, text in texts:
        clip = tts.synthesize(text, args.lang, args.engine, args.speed)
        with wave.open(str(clip)) as w:
            audio = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768
            sr = w.getframerate()
        s = rec.create_stream()
        s.accept_waveform(sr, audio)
        rec.decode_stream(s)
        heard = s.result.text
        score = difflib.SequenceMatcher(None, norm(text), norm(heard)).ratio()
        scores.append(score)
        if score < args.threshold:
            flagged.append((si, k, score, text, heard))

    print(f'{args.lang}/{args.engine} x{args.speed:g}: {len(texts)} 句，平均相似度 {sum(scores) / len(scores):.3f}，低於 {args.threshold} 嘅有 {len(flagged)} 句')
    for si, k, score, text, heard in flagged:
        print(f'\n[{si:02}.{k}] {score:.2f}\n  原文：{text}\n  聽到：{heard}')


if __name__ == '__main__':
    main()
