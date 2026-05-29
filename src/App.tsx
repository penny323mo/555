import { zhHant } from '@/config/i18n.zh-Hant';

// Phase 1：僅渲染專案骨架佔位畫面。
// 地圖、風場、圖層與搜尋等功能將於後續 Phase 接入。
export default function App() {
  return (
    <div className="app-shell">
      <div className="placeholder">
        <h1>{zhHant.appTitle}</h1>
        <p>專案基礎已就緒（Phase 1）。地圖與互動功能即將於後續階段加入。</p>
      </div>
    </div>
  );
}
