import { zhHant } from '@/config/i18n.zh-Hant';

// 右上角錯誤提示，可選擇性提供重試。
export function ErrorToast({
  message,
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  if (!message) return null;
  return (
    <div className="error-toast" role="alert">
      <span>{message || zhHant.state.error}</span>
      {onRetry && (
        <button className="error-toast__retry" onClick={onRetry}>
          {zhHant.state.retry}
        </button>
      )}
    </div>
  );
}
