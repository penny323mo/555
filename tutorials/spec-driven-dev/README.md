# 教學影片：Spec-Driven Development × Coding Agent

約 8½ 分鐘、1080p、廣東話繁中字幕嘅教學片，用本 repo（天氣地圖）加「°C / °F 切換」做實戰例子。

| 檔案 | 用途 |
|---|---|
| `spec-driven-dev.mp4` | 成品影片（字幕已燒入畫面，冇旁白聲） |
| `narration.srt` | 旁白字幕（同影片時間軸一致，可用嚟配音或上傳 YouTube） |
| `script.md` | 按章節整理嘅旁白稿（附時間碼） |
| `scenes.js` | **唯一內容來源**：畫面同旁白都喺呢度改 |
| `slides.html` | 渲染模板；直接用瀏覽器開，用 ← → 可以手動翻頁預覽 |
| `render.py` | 逐格截圖 → ffmpeg 合成 MP4，同時輸出 SRT 同旁白稿 |

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
python render.py --preview   # 每個 step 截一張圖去 preview/，檢查排版
python render.py             # 輸出 mp4 + srt + script.md（約 4 分鐘）
```

每句字幕嘅停留時間 = `max(2.8, 字數 × 0.15 + 0.9)` 秒（見 `render.py` 嘅 `hold_seconds`）。

## 加旁白聲

生成環境連唔到 TTS 服務，所以影片冇聲。想加廣東話旁白，可以：

- 用 `narration.srt` 對住影片自己錄音；或
- 用 `edge-tts`（voice `zh-HK-HiuMaanNeural`）逐句合成，再用 ffmpeg 混入：
  `ffmpeg -i spec-driven-dev.mp4 -i voice.m4a -map 0:v -map 1:a -c:v copy -shortest out.mp4`

如果真人語速比字幕慢，將 `hold_seconds` 嘅系數調高再重新渲染就得。
