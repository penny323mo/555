# 互動天氣地圖（Weather Map）

一個類似 Windy.com 的互動天氣地圖網站 MVP，使用 Vite + React + TypeScript + MapLibre GL JS。
全屏互動地圖、Canvas 風場粒子動畫、五種天氣圖層、城市搜尋與點擊查詢，介面全繁體中文。

## 功能

- 🗺️ 全屏互動地圖（桌面滑鼠 + 手機觸控，平滑縮放）
- 🌬️ Canvas 風場粒子動畫，與地圖 pan/zoom 同步
- 🎚️ 五種天氣圖層：**風 / 溫度 / 降雨 / 雲量 / 氣壓**
- 🔍 城市搜尋（即時下拉建議，選取後飛至該地）
- 📍 點擊地圖任一點查詢天氣（溫度、體感、濕度、風速風向、未來數小時）
- 📱 響應式介面（桌面浮動面板；手機 FAB + 底部抽屜）

## 技術棧

| 項目 | 技術 |
|---|---|
| 建置 | Vite |
| 框架 | React + TypeScript |
| 地圖 | MapLibre GL JS（OSM 免 key 底圖）|
| 狀態 | Zustand |
| 天氣資料 | Open-Meteo（免費、免 API key）|
| 風場動畫 | 自製 Canvas 粒子引擎 |

## 開發

```bash
npm install
npm run dev        # 開發伺服器 (http://localhost:5173)
npm run build      # 產出 dist/
npm run preview    # 預覽 build 結果
npm run typecheck  # 型別檢查
npm run lint       # ESLint
```

## 架構概覽

```
components/  UI 與地圖覆蓋層（呈現）
hooks/       資料/狀態邏輯（useMap, useGeocoding, useWeatherAt）
services/    對外 API（geocoding, weather, windField provider）
adapters/    API 原始格式 → 內部統一模型
engine/      與框架無關的粒子引擎
store/       Zustand 全域狀態
utils/       快取、色階、天氣代碼
config/      圖層 / 地圖 / 繁中字典
```

- **風場資料採策略模式**：`MockWindProvider`（數學合成）與 `OpenMeteoWindProvider`
  （真實格點 + 雙線性插值）介面相同。請求失敗時自動以 mock 後備，動畫不中斷。
- **純量圖層**（溫度/降雨/雲量/氣壓）以取樣格點 + 色階畫成 heatmap，真實資料失敗同樣以 mock 後備。
- 快取：風場 LRU（記憶體）+ 點查詢 sessionStorage（TTL 10 分鐘）；搜尋 debounce、請求 AbortController。

## 資料來源與網路注意事項

本專案使用以下免費、免 API key 的真實資料來源，請求皆由**使用者瀏覽器直接發出**：

- **Open-Meteo**（`api.open-meteo.com` / `geocoding-api.open-meteo.com`）：
  風 / 溫度 / 雲量 / 氣壓點取樣（風 12×12、純量 16×16 格點）、城市搜尋、點查詢天氣。
- **RainViewer**（`api.rainviewer.com` / `tilecache.rainviewer.com`）：
  降雨圖層使用全球真實雷達回波磚（最新觀測影格）。
- **NASA GIBS**（`gibs.earthdata.nasa.gov`）：
  雲量圖層使用 MODIS Terra 真實衛星影像（每日更新，非即時）。

- 部署到 Vercel / GitHub Pages 後，於一般網路環境即可正常取得真實資料。
- 若所在網路封鎖上述網域（例如某些沙箱或受限環境），搜尋與點查詢會顯示錯誤、
  風場與圖層會自動退回 **mock 後備資料**，介面仍可操作展示。

`VITE_OPENWEATHER_KEY`（`.env`）為未來備援圖層預留，MVP 不需填寫。

## 部署

### Vercel（建議）
匯入 repo 即可，已附 `vercel.json`（framework: vite）。Vercel 自動 `npm run build` 並服務 `dist/`。

### GitHub Pages
已附 `.github/workflows/deploy.yml`：推送到 `main` 時自動 build 並部署到 Pages
（需在 repo Settings → Pages 將來源設為 GitHub Actions）。
`vite base` 設為相對路徑 `./`，故在 `https://<user>.github.io/<repo>/` 子路徑下資源可正常載入。

## 第一版範圍（MVP）

**包含**：上述六項功能、五圖層、真實點查詢 + mock 後備。
**不包含**（留待後續）：時間軸動畫播放、帳號/收藏、警報通知、颶風/海浪/雷達等進階圖層、
氣壓等值線、後端服務、PWA 離線。
