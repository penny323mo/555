import { useAppStore } from '@/store/appStore';
import { LAYERS } from '@/config/layers.config';
import { COLOR_SCALES, toGradient } from '@/utils/colorScale';

// 底部色階圖例，依目前圖層顯示對應漸層與刻度。
export function Legend() {
  const activeLayer = useAppStore((s) => s.activeLayer);
  const scale = COLOR_SCALES[activeLayer];
  const config = LAYERS.find((l) => l.id === activeLayer);

  return (
    <div className="legend">
      <span className="legend__unit">{config?.unit}</span>
      <div className="legend__bar" style={{ background: toGradient(scale) }} />
      <div className="legend__ticks">
        {scale.ticks.map((t) => (
          <span key={t} className="legend__tick">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
