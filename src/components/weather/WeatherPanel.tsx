import { useAppStore } from '@/store/appStore';
import { zhHant } from '@/config/i18n.zh-Hant';

// Phase 2：點擊地圖後顯示座標佔位面板。
// 真實天氣資料（溫度 / 風速 / 濕度等）於 Phase 4 接入。
export function WeatherPanel() {
  const selectedPoint = useAppStore((s) => s.selectedPoint);
  const setSelectedPoint = useAppStore((s) => s.setSelectedPoint);

  if (!selectedPoint) return null;

  return (
    <div className="weather-panel">
      <div className="weather-panel__header">
        <h2>{zhHant.weather.title}</h2>
        <button
          className="weather-panel__close"
          onClick={() => setSelectedPoint(null)}
          aria-label="關閉"
        >
          ✕
        </button>
      </div>
      <div className="weather-panel__body">
        <p className="weather-panel__coords">
          {selectedPoint.lat.toFixed(3)}, {selectedPoint.lng.toFixed(3)}
        </p>
        <p className="weather-panel__hint">天氣資料即將於 Phase 4 接入。</p>
      </div>
    </div>
  );
}
