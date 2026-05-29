import { useState } from 'react';
import { LAYERS } from '@/config/layers.config';
import { useAppStore } from '@/store/appStore';

// 圖層切換：桌面為右側卡片，手機為右下 FAB 開啟的底部抽屜。
// 兩種型態共用同一份清單，靠 CSS 切換呈現。
export function LayerSwitcher() {
  const activeLayer = useAppStore((s) => s.activeLayer);
  const setActiveLayer = useAppStore((s) => s.setActiveLayer);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* 手機浮動按鈕 */}
      <button
        className="layer-fab"
        onClick={() => setMobileOpen((v) => !v)}
        aria-label="圖層選單"
      >
        ☰
      </button>

      <div className={`layer-switcher ${mobileOpen ? 'is-open' : ''}`}>
        <div className="layer-switcher__list">
          {LAYERS.map((layer) => (
            <button
              key={layer.id}
              className={`layer-card ${activeLayer === layer.id ? 'is-active' : ''}`}
              onClick={() => {
                setActiveLayer(layer.id);
                setMobileOpen(false);
              }}
            >
              <span className="layer-card__label">{layer.label}</span>
              <span className="layer-card__unit">{layer.unit}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
