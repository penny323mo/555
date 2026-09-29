---
name: narrated-tutorial-video
description: 由零生成有廣東話／普通話配音同字幕嘅 1080p 教學影片（MP4）：寫旁白稿 → HTML 版面逐格渲染 → TTS 逐句配音 → 語音辨識核對 → ffmpeg 合成。用戶講「整一條教學片／講解影片／tutorial video」、「幫我生成影片解釋 X」、「要廣東話旁述／普通話配音」、「將呢份 slides／流程做成影片」、「幫條片配音」，或者想將技術概念、開發流程、repo 功能做成影片時，都要用呢個 skill，就算用戶冇講明係 MP4 或者 TTS 都一樣。
---

# 有配音教學影片

用 HTML 做畫面、Playwright 逐格截圖、TTS 逐句配音、ffmpeg 合成。內容同時間軸全部由一個 `scenes.js` 控制，改稿之後重跑就得，唔使剪片軟件。

```
scenes.js（畫面 + 廣東話旁白）──┐
narration.cmn.js（普通話旁白）──┼─> slides.html ─> render.py ─> <slug>.yue.mp4 / .cmn.mp4
                                  │                    │           narration.*.srt / script.*.md
                          tts.py（逐句合成 + 快取）─────┘
                          verify_tts.py（ASR 核對讀音）
```

## 步驟

### 1. 開工作資料夾

```bash
cp -r <skill-dir>/template/. <output-dir>/     # slides.html, scenes.js, narration.cmn.js, render.py, tts.py, verify_tts.py
pip install playwright imageio-ffmpeg
```

有預裝 Chromium 就設 `CHROMIUM_PATH`（雲端環境通常係 `/opt/pw-browsers/chromium-*/chrome-linux/chrome`），唔好跑 `playwright install`。中文字型要有 WenQuanYi Zen Hei 或者類似 CJK 字型（`fc-list | grep -i cjk\|wqy\|noto`）。

### 2. 寫內容（`scenes.js`）

先諗大綱，通常係：問題 → 概念 → 流程 → 實戰例子 → 陷阱 → 總結。如果係講 repo 相關嘅嘢，實戰例子最好用返用戶自己個 repo 嘅真實檔案同功能，觀眾會覺得切身好多。

- `META`：`slug`（輸出檔名）、`title`、`brand`（左上角）、`stages`（頂部進度 pill）
- 每個 scene 揀一個 `layout`：`title` / `bullets` / `flow` / `file` / `terminal` / `repo` / `outro`，欄位睇 `template/scenes.js`（逐個版面有示範）
- `steps`：每句 = 一句旁白 = 一句字幕 = 一個畫面變化。item 用 `at: n` 指定喺第 n 句出現，令畫面跟住講嘢嘅節奏逐步出現
- 旁白用口語，一句 20–50 字；太長會變兩行字幕，壓到畫面
- 完整真實範例：`references/example-sdd-scenes.js`（15 scene、67 句）

普通話版就寫 `narration.cmn.js`，句數要同 `steps` 一一對應。普通話聲線讀句中嘅英文詞好差（"spec" 會讀成 "t"），所以要盡量用中文術語（spec→規格、task→任務、prompt→提示詞），產品名先保留英文。

### 3. 檢查排版

```bash
python render.py --preview      # 每句一張圖去 preview/
```

用 PIL 將每個 scene 最後一張砌成 2×2 contact sheet 再睇，特別留意：
- 文字有冇爆出窗口，或者壓住底部字幕（>4 個 item 會自動 compact；file 超過 16 行會自動縮字）
- 仲係爆就刪行或者拆 scene，唔好一味縮字

### 4. 配音 + 核對

```bash
python render.py --lang yue     # 會先逐句合成（快取喺 .tts-cache/），再渲染
```

想先核對讀音、唔渲染，可以跑 `verify_tts.py`：佢會用 SenseVoice 將每句配音辨識返做文字，再同原稿比相似度。你自己聽唔到聲，呢個係唯一客觀嘅檢查方法：

```bash
pip install sherpa-onnx soundfile opencc-python-reimplemented
curl -sSLO https://github.com/k2-fsa/sherpa-onnx/releases/download/asr-models/sherpa-onnx-sense-voice-zh-en-ja-ko-yue-2024-07-17.tar.bz2 && tar xjf sherpa-onnx-sense-voice-*.tar.bz2
SENSEVOICE_DIR=./sherpa-onnx-sense-voice-zh-en-ja-ko-yue-2024-07-17 python verify_tts.py --lang yue
```

**語速**：Google TTS 原速偏慢（每秒約 2.3 個中文字），用戶睇完覺得要快一倍，所以 `--speed` 預設係 2（ffmpeg atempo 加速，唔變音調）。核對同出片要用同一個 `--speed`。

參考基準（2 倍速）：廣東話同普通話平均都約 0.95，同原速差唔多，即係加速後仍然清楚。低分句要逐句睇清楚係真讀錯定係辨識誤差：同音字（程式↔城市）、產品名、Given/When/Then 呢類通常係辨識誤差。真讀錯就改稿，或者喺 `tts.py` 嘅 `SAY` 表加讀法替換（只影響讀音，唔影響字幕）。

### 5. 出片 + 驗證

```bash
FRAMES_DIR=/tmp/fy python render.py --lang yue &
FRAMES_DIR=/tmp/fc python render.py --lang cmn &   # 兩個語言可以並行，約 8 分鐘
```

出完片要驗證：
- 用 ffmpeg 睇長度同有冇音軌
- 喺 SRT 揀開頭、中段、結尾各一句，用 ffmpeg `-ss/-t` 切嗰段聲出嚟做 ASR，確認辨識出嚟嘅文字同字幕一致，即係聲畫同步

## TTS 引擎（按環境揀）

| 引擎 | 點用 | 備註 |
|---|---|---|
| Google 翻譯 TTS（預設） | `tts.py` 已實作，`translate.googleapis.com/translate_tts`，`tl=yue` / `zh-TW` | 免 key、質素好；非官方端點，公開發佈要講清楚 |
| sherpa-onnx MeloTTS（離線） | `--engine melo` + `MELO_DIR` | 只有普通話，約 0.82，後備 |
| sherpa-onnx 廣東話 VITS | 唔建議 | 英文詞直接跳過，發音差 |
| Azure Speech / Google Cloud TTS / CosyVoice | 喺 `tts.py` 加一個函數輸出 WAV | 公開發佈首選，要 key 或者 GPU |

受限網絡要先測試連線（`curl -sS -o /dev/null -w '%{http_code}' <url>`）。之前遇過嘅情況：
- Edge TTS（WebSocket）、Hugging Face、ModelScope 被擋
- `translate.googleapis.com` 同 GitHub Releases（`github.com/.../releases/download/...`）通

## 要留意

- **時間軸跟配音長度走**：每句長度 = max(過場 + 0.8 秒, 0.2 秒 + 加速後配音長度 + 0.45 秒)，並對齊到整數格。concat 清單入面最後一格嘅 duration 要包埋嗰 1/30 秒，唔係 67 句會累積約 2 秒偏差，SRT 會同畫面錯開。
- **普通話版嘅畫面文字**仍然係 `scenes.js` 嘅廣東話書面語。要完整本地化，就要另外寫一份畫面文字。
- **MP4 好大**（10 分鐘約 20 MB）：commit 入 git 之前要提用戶考慮 Git LFS。`.frames/`、`preview/`、`.tts-cache/` 要加入 `.gitignore`。
- 做完用 `SendUserFile` 將 MP4 同旁白稿傳俾用戶。回覆入面要講清楚用咗邊個 TTS、核對分數同有咩限制。
