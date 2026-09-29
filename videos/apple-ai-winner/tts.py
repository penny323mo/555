"""旁白語音合成：逐句合成做 24 kHz 單聲道 WAV，並快取喺 .tts-cache/。

引擎：
    google  Google 翻譯 TTS 端點（免 key；yue = 廣東話，cmn = 普通話）。非官方 API，
            適合個人/內部用途；公開發佈建議換 Google Cloud TTS（yue-HK）或 Azure（zh-HK）。
    melo    sherpa-onnx + MeloTTS 離線模型（只支援普通話，中英夾雜 OK）。
            需要 `pip install sherpa-onnx` 同設定 MELO_DIR 指向解壓後嘅模型資料夾：
            https://github.com/k2-fsa/sherpa-onnx/releases/download/tts-models/vits-melo-tts-zh_en.tar.bz2
"""

import hashlib
import os
import re
import subprocess
import time
import urllib.parse
import urllib.request
import wave
from pathlib import Path

import imageio_ffmpeg

SAMPLE_RATE = 24000
CACHE = Path(__file__).resolve().parent / '.tts-cache'

# 預設語速：Google TTS 原速偏慢，1.35 倍先係人正常聽嘅語速（用戶試過 1、1.25、1.5、2 倍，揀咗 1.35）。
# 係逐句加速後先排時間軸，所以字幕同畫面一定跟得上，唔使出片後再成條片調速。
DEFAULT_SPEED = {'google': 1.35, 'melo': 1.0}

GOOGLE_LANG = {'yue': 'yue', 'cmn': 'zh-TW'}

# 只影響「讀法」，唔影響字幕：符號同檔名改成順口嘅講法
SAY = {
    'yue': [('°C', '攝氏'), ('°F', '華氏'), ('.claude/commands', '點 claude 斜線 commands'), ('CLAUDE.md', 'CLAUDE 點 MD'),
            ('Cybercab', 'Cyber Cab'), ('Robotaxi', 'Robo taxi'), ('NVIDIA H100', '英偉達 H 一百')],
    'cmn': [('°C', '攝氏'), ('°F', '華氏'), ('.claude/commands', '點 claude 斜線 commands'), ('CLAUDE.md', 'CLAUDE 點 MD')],
}


def speech_text(text: str, lang: str) -> str:
    for a, b in SAY[lang]:
        text = text.replace(a, b)
    return re.sub(r'[「」]', '', text)


def _to_wav(src: Path, dst: Path) -> None:
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    subprocess.run(
        [ffmpeg, '-y', '-loglevel', 'error', '-i', str(src), '-ac', '1', '-ar', str(SAMPLE_RATE), '-sample_fmt', 's16', str(dst)],
        check=True,
    )


def _google(text: str, lang: str, out_mp3: Path) -> None:
    q = urllib.parse.urlencode({'ie': 'UTF-8', 'client': 'gtx', 'tl': GOOGLE_LANG[lang], 'q': text})
    req = urllib.request.Request(f'https://translate.googleapis.com/translate_tts?{q}', headers={'User-Agent': 'Mozilla/5.0'})
    for attempt in range(4):
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                out_mp3.write_bytes(r.read())
            return
        except OSError:
            if attempt == 3:
                raise
            time.sleep(2 ** attempt)


_melo = None


def _melo_tts(text: str, lang: str, out_wav: Path) -> None:
    global _melo
    if lang != 'cmn':
        raise ValueError('melo 引擎只支援普通話（cmn）')
    import sherpa_onnx  # 只有用 melo 先需要

    if _melo is None:
        d = Path(os.environ['MELO_DIR'])
        fsts = ','.join(str(d / f) for f in ('date.fst', 'phone.fst', 'number.fst', 'new_heteronym.fst'))
        vits = sherpa_onnx.OfflineTtsVitsModelConfig(
            model=str(d / 'model.onnx'), lexicon=str(d / 'lexicon.txt'), tokens=str(d / 'tokens.txt'), dict_dir=str(d / 'dict')
        )
        cfg = sherpa_onnx.OfflineTtsConfig(model=sherpa_onnx.OfflineTtsModelConfig(vits=vits, num_threads=4), rule_fsts=fsts)
        _melo = sherpa_onnx.OfflineTts(cfg)
    audio = _melo.generate(text, sid=0, speed=1.0)
    import soundfile as sf

    sf.write(str(out_wav), audio.samples, audio.sample_rate, format='WAV')


def _atempo(speed: float) -> str:
    # 舊版 ffmpeg 嘅 atempo 每級最多 2 倍，串連幾級就可以去到任何倍數
    parts = []
    while speed > 2.0:
        parts.append('atempo=2.0')
        speed /= 2.0
    parts.append(f'atempo={speed:.4f}')
    return ','.join(parts)


def synthesize(text: str, lang: str, engine: str = 'google', speed: float | None = None) -> Path:
    """回傳合成好嘅 WAV（24 kHz、mono、s16）路徑；同一句同一引擎只會合成一次。

    speed 預設跟 DEFAULT_SPEED；!= 1 時用 ffmpeg atempo 加速（唔變音調），加速版同樣快取。
    """
    if speed is None:
        speed = DEFAULT_SPEED[engine]
    base = _synthesize_base(text, lang, engine)
    if speed == 1.0:
        return base
    out = base.with_name(f'{base.stem}.x{speed:g}.wav')
    if not out.exists():
        subprocess.run(
            [imageio_ffmpeg.get_ffmpeg_exe(), '-y', '-loglevel', 'error', '-i', str(base), '-filter:a', _atempo(speed),
             '-ac', '1', '-ar', str(SAMPLE_RATE), '-sample_fmt', 's16', str(out)],
            check=True,
        )
    return out


def _synthesize_base(text: str, lang: str, engine: str) -> Path:
    said = speech_text(text, lang)
    voice = GOOGLE_LANG[lang] if engine == 'google' else engine
    key = hashlib.sha1(f'{engine}|{voice}|{said}'.encode()).hexdigest()[:16]
    out = CACHE / engine / lang / f'{key}.wav'
    if out.exists():
        return out
    out.parent.mkdir(parents=True, exist_ok=True)
    raw = out.with_suffix('.raw')
    if engine == 'google':
        _google(said, lang, raw)
        time.sleep(0.4)  # 唔好打得太密
    elif engine == 'melo':
        _melo_tts(said, lang, raw)
    else:
        raise ValueError(f'未知引擎：{engine}')
    _to_wav(raw, out)
    raw.unlink()
    return out


def wav_seconds(path: Path) -> float:
    with wave.open(str(path)) as w:
        return w.getnframes() / w.getframerate()


def wav_frames(path: Path) -> bytes:
    with wave.open(str(path)) as w:
        return w.readframes(w.getnframes())
