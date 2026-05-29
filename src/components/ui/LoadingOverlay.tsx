import { zhHant } from '@/config/i18n.zh-Hant';

// 不阻擋互動的載入提示（pointer-events 由 CSS 設為 none）。
export function LoadingOverlay({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <div className="loading-overlay">
      <span className="loading-overlay__spinner" />
      <span>{zhHant.state.loading}</span>
    </div>
  );
}
