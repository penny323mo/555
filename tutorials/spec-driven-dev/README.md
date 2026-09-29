# 教學影片：Spec-Driven Development × Coding Agent

1080p 教學片（廣東話約 7:51、普通話約 8:58，旁白 1.35 倍速），有**廣東話**同**普通話**兩個配音版本，用本 repo（天氣地圖）加「°C / °F 切換」做實戰例子。

| 檔案 | 用途 |
|---|---|
| `spec-driven-dev.yue.mp4` | 廣東話旁白 + 廣東話字幕 |
| `spec-driven-dev.cmn.mp4` | 普通話旁白 + 普通話字幕（畫面文字仍係廣東話書寫） |
| `narration.{yue,cmn}.srt` | 字幕檔（同影片時間軸一致，可上傳 YouTube） |
| `script.{yue,cmn}.md` | 按章節整理嘅旁白稿（附時間碼） |
| `scenes.js` | 畫面內容 + 廣東話旁白（唯一內容來源） |
| `narration.cmn.js` | 普通話旁白（句數同 `scenes.js` 一一對應） |
| `slides.html` | 渲染模板；直接用瀏覽器開，← → 翻頁，`?lang=cmn` 睇普通話字幕 |
| `tts.py` | 逐句合成語音（Google 翻譯 TTS / 離線 MeloTTS），快取喺 `.tts-cache/` |
| `render.py` | 逐格截圖 + 配音 → ffmpeg 合成 MP4，時間軸跟配音長度走 |
| `verify_tts.py` | 用 SenseVoice 語音辨識逐句核對配音，揪出讀錯嘅句子 |

## 內容大綱

1. Vibe coding 嘅四個問題
2. 咩係 Spec-Driven Development
3. 五步流程：Specify → Plan → Tasks → Implement → Verify
4. 點解同 coding agent 特別夾
5. 實戰：`specs/temp-unit/` 嘅 spec.md / plan.md / tasks.md、agent prompt 寫法、驗收
6. 放入 repo（`specs/` + `CLAUDE.md` 規則）
7. 現成工具：GitHub Spec Kit、Kiro、Claude Code
8. 常見陷阱 + 總結

## 重新生成

```bash
pip install playwright imageio-ffmpeg
python -m playwright install chromium   # 已有 Chromium 可改用 CHROMIUM_PATH=/path/to/chrome

python render.py --preview        # 每個 step 截一張圖去 preview/，檢查排版
python render.py --storyboard     # 分鏡 PDF（每頁 4 張）+ 讀稿 PDF，配音前確認內容
python render.py --lang yue       # 廣東話版
python render.py --lang cmn       # 普通話版
python render.py --lang yue --clip 10  # 先出頭 10 秒試聽（旁白固定 1.35 倍速，--speed 可臨時覆蓋）
python render.py --lang yue --silent   # 唔配音，按字數估時間
```

改咗旁白之後，只有改過嘅句子會重新合成（其餘用 `.tts-cache/`）。

### 核對配音

```bash
pip install sherpa-onnx soundfile opencc-python-reimplemented
# 下載 SenseVoice 並解壓：
# https://github.com/k2-fsa/sherpa-onnx/releases/download/asr-models/sherpa-onnx-sense-voice-zh-en-ja-ko-yue-2024-07-17.tar.bz2
SENSEVOICE_DIR=... python verify_tts.py --lang yue
```

目前結果（相似度 = 辨識文字同原文嘅字元相似度）：

| 版本 | 平均相似度 | < 0.85 句數 | 備註 |
|---|---|---|---|
| 廣東話 1.35 倍速（現用） | 0.960 | 1 / 67 | |
| 普通話 1.35 倍速（現用） | 0.952 | 3 / 67 | |
| 廣東話 1.5 倍速 | 0.958 | 1 / 67 | |
| 普通話 1.5 倍速 | 0.951 | 2 / 67 | |
| 廣東話 2 倍速 | 0.949 | 4 / 67 | 用戶覺得太快 |
| 普通話 2 倍速 | 0.947 | 3 / 67 | |
| 廣東話（Google `yue`，原速） | 0.959 | 1 / 67 | 低分句係 Given/When/Then，屬辨識誤差 |
| 普通話（Google `zh-TW`，原速） | 0.948 | 4 / 67 | 低分句係產品名、同音字（程式↔城市） |
| 普通話（離線 MeloTTS） | 0.816 | 38 / 67 | 只作後備 |
| 廣東話（離線 sherpa-onnx VITS） | — | — | 英文詞直接略過、發音差，唔建議 |

普通話聲線讀獨立英文詞（spec、task、prompt）好差，所以普通話稿改用「規格 / 任務 / 提示詞」。

## 配音工具總覽

| 工具 | 廣東話 | 普通話 | 成本 | 適合 |
|---|---|---|---|---|
| **Google 翻譯 TTS**（本專案預設） | ✅ | ✅ | 免費、免 key | 個人 / 內部用；非官方端點，無 SLA |
| **Azure AI Speech**（`zh-HK-HiuMaanNeural` 等） | ✅ 自然 | ✅ | 有免費額度 | 公開發佈首選；`edge-tts` 係同一批聲線嘅免費版 |
| **Google Cloud Text-to-Speech**（`yue-HK`） | ✅ | ✅ | 有免費額度 | 公開發佈；要 API key |
| **CosyVoice**（阿里開源，Apache-2.0） | ✅ 方言 + 聲音複製 | ✅ | 免費，要 GPU 較理想 | 想用自己把聲；中英夾雜好 |
| **ElevenLabs** | ⚠️ 官方 TTS 語言表未列廣東話 | ✅ | 收費 | 普通話 / 英文 |
| **sherpa-onnx**（離線） | ⚠️ 質素一般 | ✅ MeloTTS | 免費 | 完全離線環境 |
| 真人錄音 | ✅ | ✅ | — | 最佳質素：對住 `narration.*.srt` 錄 |

換引擎只需要喺 `tts.py` 加一個函數，輸出 WAV 就得，`render.py` 會自動跟新音檔長度排時間軸。
