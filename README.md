# 互動天氣地圖（Weather Map）

一個類似 Windy.com 的互動天氣地圖網站 MVP，使用 Vite + React + TypeScript + MapLibre GL JS。

## 功能（規劃）

- 全屏互動地圖（桌面 + 手機觸控）
- Canvas 風場粒子動畫
- 五種天氣圖層切換：風 / 溫度 / 降雨 / 雲量 / 氣壓
- 城市搜尋（Open-Meteo，免 API key）
- 點擊地圖查詢天氣
- 繁體中文介面

## 技術棧

- **建置**：Vite
- **框架**：React + TypeScript
- **地圖**：MapLibre GL JS
- **狀態**：Zustand
- **天氣資料**：Open-Meteo（免費、免 key）
- **風場動畫**：自製 Canvas 粒子引擎

## 開發

```bash
npm install
npm run dev        # 開發伺服器
npm run build      # 產出 dist/
npm run typecheck  # 型別檢查
npm run lint       # ESLint
```

## 開發階段

- **Phase 1**：專案基礎與資料夾骨架 ✅
- Phase 2：地圖 + 響應式 UI 殼
- Phase 3：mock 風場粒子動畫
- Phase 4：Open-Meteo 真實搜尋 / 點擊查詢 + 真實風場
- Phase 5：五圖層系統
- Phase 6：部署（Vercel / GitHub Pages）

## 環境變數

複製 `.env.example` 為 `.env`。MVP 預設使用免 key 的 Open-Meteo，
`VITE_OPENWEATHER_KEY` 為未來備援圖層預留，可留空。
