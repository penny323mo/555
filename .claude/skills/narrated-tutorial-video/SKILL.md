---
name: narrated-tutorial-video
description: 由零生成有廣東話／普通話配音同字幕嘅 1080p 教學影片（MP4）：寫旁白稿 → HTML 版面逐格渲染 → TTS 逐句配音 → 語音辨識核對 → ffmpeg 合成。用戶講「整一條教學片／講解影片／tutorial video」、「幫我生成影片解釋 X」、「要廣東話旁述／普通話配音」、「將呢份 slides／流程做成影片」、「幫條片配音」，或者想將技術概念、開發流程、repo 功能做成影片時，都要用呢個 skill，就算用戶冇講明係 MP4 或者 TTS 都一樣。
---

# 有配音教學影片

用 HTML 做畫面、Playwright 逐格截圖、TTS 逐句配音、ffmpeg 合成。內容同時間軸全部由一個 `scenes.js` 控制，改稿之後重跑就得，唔使剪片軟件。

成條片要渲染 5–8 分鐘，改一次內容就要成個重做，所以流程有兩個用戶確認關口，越早發現問題越平：

1. **分鏡確認（內容）**：寫完稿，先出分鏡 PDF 同讀稿 PDF，用戶話內容 OK 先配音
2. **試聽確認（語速／聲線）**：配完音，先出 10 秒試聽，用戶話 OK 先出成條片

未過關口就唔好行下一步，亦唔好一次過出晒成條片先問。

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
cp -r <skill-dir>/template/. <output-dir>/     # slides.html, scenes.js, narration.cmn.js, render.py, tts.py, verify_tts.py, fetch_assets.py
pip install playwright imageio-ffmpeg
python fetch_assets.py    # 寫完 scenes.js 之後（同每次加新 img 之後）都要跑
```

`fetch_assets.py` 做兩樣嘢：
- **字體**：從 Google Fonts 下載 Noto Sans TC（標題 900、內文 500）、LXGW WenKai TC（霞鶩文楷，小標題同引言用）、Poppins（數字用），裝去 `~/.local/share/fonts/`。字體檔好大，唔好 commit。
- **3D 插圖**：掃描 `scenes.js` 入面所有 `img: '名稱'`，從 Microsoft Fluent Emoji（MIT 授權）下載到 `assets/fluent/`，細檔可以 commit。名稱要用 Fluent 資料夾名，例如 `'Rocket'`、`'Satellite antenna'`、`'Hourglass not done'`、`'Globe with meridians'`；腳本會列出搵唔到嘅名，要換過另一個。

受限網絡下，維基共享資源、NASA、Flickr、Unsplash 等相片來源通常被擋，所以用 Fluent 3D 插圖 + 自繪圖表（柱狀圖、時間線、放射圖）做配圖。

有預裝 Chromium 就設 `CHROMIUM_PATH`（雲端環境通常係 `/opt/pw-browsers/chromium-*/chrome-linux/chrome`），唔好跑 `playwright install`。中文字型要有 WenQuanYi Zen Hei 或者類似 CJK 字型（`fc-list | grep -i cjk\|wqy\|noto`）。

### 2. 寫內容（`scenes.js`）

先諗大綱，通常係：問題 → 概念 → 流程 → 實戰例子 → 陷阱 → 總結。如果係講 repo 相關嘅嘢，實戰例子最好用返用戶自己個 repo 嘅真實檔案同功能，觀眾會覺得切身好多。

- `META`：`slug`（輸出檔名）、`title`、`brand`（左上角）、`stages`（頂部進度 pill）
- 每個 scene 揀一個 `layout`，欄位睇 `template/scenes.js`，每個版面都有示範：
  - 文字類：`title` / `bullets` / `outro`
  - 結構類：`chapter`（章節卡，每個大部分之前加一張，對應「分段原則」）/ `bignum`（超大數字開場，一個關鍵數字 + 一句說明）
  - 配圖類：`hero`（左邊要點、右邊大 3D 插圖，最常用）/ `bars`（動畫柱狀圖）/ `timeline`（時間線，最多 5 個事件，亦可以做「想像一日」）
  - 大部分版面都支援 `img`：`title` 用 `imgs` 砌拼貼，`chapter`/`bignum`/`hero` 右邊放大圖，清單 item、`hub` 節點、`flow` 節點、`stats` 卡、`compare` 標題、`timeline` 事件都可以加細圖
  - 圖像類（優先用，比純清單吸引）：`stats`（數字卡，`hl: true` 用高亮色）/ `compare`（左右對比，右邊係主角）/ `hub`（中心 + 放射節點，最多 6 個）/ `flow`（流程）
  - 技術類：`file` / `terminal` / `repo`
- 盡量多用圖像類版面，唔好成條片都係清單，觀眾睇得悶
- `steps`：每句 = 一句旁白 = 一句字幕 = 一個畫面變化。item 用 `at: n` 指定喺第 n 句出現，令畫面跟住講嘢嘅節奏逐步出現
- **用字（用戶指定）**：畫面文字同字幕用**書面語**，配音先用**廣東話口語**。每個 step 寫成 `{ say: '口語', sub: '書面語' }`：`say` 係交俾 TTS 讀嘅，`sub` 係顯示喺字幕、SRT 同讀稿入面嘅。標題、item、卡片等畫面文字一律用書面語
- **重點詞高亮**：畫面文字同 `sub` 入面用 `==關鍵字==` 標記，會變橙色加粗（Mayer「提示原則」）。每句最多一兩個，唔好滿天高亮；SRT、讀音會自動去走記號
- 口語旁白一句 20–50 字；字幕太長會變兩行，壓到畫面
- **篇幅（用戶指定）**：用戶想要**內容豐富、8–10 分鐘**，大約 25–30 個 scene、80–90 句（1.35 倍速下每句約 6–7 秒）。唔好為咗短而刪內容；要加嘅係背景、數據圖、原理解釋、對比、想像情境、對手、對觀眾嘅實際影響。一句旁白可以同時帶出兩三個 item（同一個 `at`）
- 講真實人物、公司或者時事：數字要上網核對，寫明「資料截至某年某月」；推演同構想要喺畫面標明（例如 `hub` 嘅 `tag: '⚠️ 根據公開資料的推演'`）；題目偏負面嘅，要加一段持平嘅另一面
- 完整真實範例：`references/example-sdd-scenes.js`（15 scene、67 句，舊式純字串 steps）

**視覺風格（用戶指定，參考 Vox 式克制配色）**：淺色、大字、唔好太暗、唔好太 cyber、唔好平白單調、要有配圖。模板預設已經係咁：
- 字體分工：標題 Noto Sans TC 900、內文 500；小標題、引言、結語用霞鶩文楷；數字用 Poppins。`**粗體**` 可以喺 item 入面加粗重點詞
- 每個 scene 盡量都有一張 3D 插圖或者一個圖表，唔好出現純文字頁
- 米白底（`--bg`）+ 一隻主色藍（`--accent`）+ 一隻高亮橙（`--hl`），唔好再加其他顏色
- 卡片一律白色；旁白講緊嘅嗰項（`at === 當前 step`）自動用主色邊同陰影標示，其餘淡色
- 字幕係白卡深字，42px
- 唔好改返深藍底細字，亦唔好多色輪替：用戶試過，前者太暗，後者研究建議收窄

### 3. 檢查排版

```bash
python render.py --preview      # 每句一張圖去 preview/
```

用 PIL 將每個 scene 最後一張砌成 2×2 contact sheet 再睇，特別留意：
- 文字有冇爆出窗口，或者壓住底部字幕（>4 個 item 會自動 compact；file 超過 16 行、樹狀圖超過 9 行會自動縮字）
- 數字卡嘅數值唔好太長（例如「2,900 萬」就唔好再加單位），否則會超出卡片
- 仲係爆就刪行或者拆 scene，唔好一味縮字

### 4. 分鏡確認（關口 1）

```bash
python render.py --storyboard --lang yue    # 約 5 秒 → <slug>.yue.storyboard.pdf + <slug>.yue.script.pdf
```

會出兩份 PDF，分開出係用戶要求嘅：

- **分鏡**：橫向 A4，每頁 4 張畫面（2×2），標住「Scene N · 標題」，用嚟睇版面同視覺
- **讀稿**：直向 A4，按 Scene N 逐句列旁白（口語），下面灰字係對應字幕（書面語），用嚟睇內容同用詞，編號同分鏡對得返

兩份都用 `SendUserFile` 傳俾用戶，問佢內容、例子、用詞、次序 OK 未。用戶要改就改 `scenes.js` 或者 `narration.cmn.js`，再出一次，直到用戶確認為止。有普通話版嘅話，兩個語言各出一套。

`*.storyboard.pdf`、`*.script.pdf` 係臨時檔，唔好 commit。

### 5. 配音 + 核對讀音

語速已經鎖死：Google TTS 固定用 **1.35 倍**（`tts.py` 嘅 `DEFAULT_SPEED`）。用戶試過 1、1.25、1.5、2 倍，1.35 倍先係人正常聽嘅語速，所以唔使再問用戶要幾快，除非佢主動要求（`--speed` 可以臨時覆蓋）。

加速係逐句做（ffmpeg atempo，唔變音調），做完先按加速後嘅長度排畫面同字幕，所以一定同步。唔好出完片先成條片調速：咁樣會連動畫、過場、字幕顯示時間一齊壓縮，字幕會閃得太快。

用 `verify_tts.py` 核對讀音：佢用 SenseVoice 將每句配音辨識返做文字，再同原稿比相似度。你自己聽唔到聲，呢個係唯一客觀嘅檢查方法：

```bash
pip install sherpa-onnx soundfile opencc-python-reimplemented
curl -sSLO https://github.com/k2-fsa/sherpa-onnx/releases/download/asr-models/sherpa-onnx-sense-voice-zh-en-ja-ko-yue-2024-07-17.tar.bz2 && tar xjf sherpa-onnx-sense-voice-*.tar.bz2
SENSEVOICE_DIR=./sherpa-onnx-sense-voice-zh-en-ja-ko-yue-2024-07-17 python verify_tts.py --lang yue
```

**讀音規則（用戶指定）**：`AI` 一律逐個字母讀「A. I.」，包括 `OpenAI`、`xAI` 入面嘅 AI；`tts.py` 嘅 `speech_text()` 已經自動處理，寫稿時照寫「AI」就得，唔好寫成「艾」或者其他諧音。其他英文名讀得唔清楚，就加入 `SAY` 表（例如 Cybercab → Cyber Cab、NVIDIA H100 → 英偉達 H 一百、macOS → mac O S）。SAY 表都救唔到嘅字（例如 Google 廣東話聲讀「Thunderbolt」必錯），就喺 `say` 改用中文講法（「高速線」），`sub` 同畫面照寫原名。

參考基準（1.35 倍速）：廣東話 0.960、普通話 0.952。低分句要逐句睇清楚係真讀錯定係辨識誤差：同音字（程式↔城市）、產品名、Given/When/Then 呢類通常係辨識誤差。真讀錯就改稿，或者喺 `tts.py` 嘅 `SAY` 表加讀法替換（只影響讀音，唔影響字幕）。

### 6. 試聽確認（關口 2）

成條片要渲染 5–8 分鐘，所以正式出片前，一定要先出 5–10 秒試聽，用 `SendUserFile` 傳俾用戶，問「語速、聲線、畫面 OK 未？」。用戶確認咗先做第 6 步；用戶要改就改完再出一次試聽。

```bash
python render.py --lang yue --clip 10    # 約 10 秒就出到 → <slug>.yue.clip.mp4（唔會覆蓋 SRT）
```

兩個語言都要做就各出一段。`*.clip.mp4` 係臨時檔，唔好 commit。

### 7. 出成條片 + 驗證

```bash
FRAMES_DIR=/tmp/fy python render.py --lang yue &
FRAMES_DIR=/tmp/fc python render.py --lang cmn &   # 兩個語言可以並行，約 8 分鐘
```

出完片要驗證：
- 用 ffmpeg 睇長度同有冇音軌，長度應該等於 SRT 最後一句嘅結束時間
- 喺 SRT 揀開頭、中段、結尾各一句，用 ffmpeg `-ss/-t` 切嗰段聲出嚟做 ASR，確認辨識出嚟嘅文字同字幕一致，即係聲畫同步
- ffmpeg 未寫完 MP4 之前唔好 commit（encode 緊嘅檔案係壞嘅）

## TTS 引擎（按環境揀）

| 引擎 | 點用 | 備註 |
|---|---|---|
| Google 翻譯 TTS（預設，鎖 1.35 倍速） | `tts.py` 已實作，`translate.googleapis.com/translate_tts`，`tl=yue` / `zh-TW` | 免 key、質素好；非官方端點，公開發佈要講清楚 |
| sherpa-onnx MeloTTS（離線） | `--engine melo` + `MELO_DIR` | 只有普通話，約 0.82，後備 |
| sherpa-onnx 廣東話 VITS | 唔建議 | 英文詞直接跳過，發音差 |
| Azure Speech / Google Cloud TTS / CosyVoice | 喺 `tts.py` 加一個函數輸出 WAV | 公開發佈首選，要 key 或者 GPU |

受限網絡要先測試連線（`curl -sS -o /dev/null -w '%{http_code}' <url>`）。之前遇過嘅情況：
- Edge TTS（WebSocket）、Hugging Face、ModelScope 被擋
- `translate.googleapis.com` 同 GitHub Releases（`github.com/.../releases/download/...`）通

## 要留意

- **時間軸跟配音長度走**：每句長度 = max(過場 + 0.8 秒, 0.2 秒 + 加速後配音長度 + 0.45 秒)，並對齊到整數格。concat 清單入面最後一格嘅 duration 要包埋嗰 1/30 秒，唔係 67 句會累積約 2 秒偏差，SRT 會同畫面錯開。
- **普通話版**：畫面文字本身已經係書面語，所以普通話版通用；`narration.cmn.js` 只需要寫旁白（字串即可）。用戶冇要求就唔使做普通話版。
- **MP4 好大**（10 分鐘約 20 MB）：commit 入 git 之前要提用戶考慮 Git LFS。`.frames/`、`preview/`、`.tts-cache/` 要加入 `.gitignore`。
- 做完用 `SendUserFile` 將 MP4 同旁白稿傳俾用戶。回覆入面要講清楚用咗邊個 TTS、核對分數同有咩限制。
