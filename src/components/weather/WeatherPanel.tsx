import { useAppStore } from '@/store/appStore';
import { zhHant } from '@/config/i18n.zh-Hant';
import { useWeatherAt } from '@/hooks/useWeatherAt';
import { weatherCodeIcon, weatherCodeText } from '@/utils/weatherCode';

function formatHour(iso: string): string {
  const d = new Date(iso);
  return `${d.getHours().toString().padStart(2, '0')}:00`;
}

export function WeatherPanel() {
  const selectedPoint = useAppStore((s) => s.selectedPoint);
  const selectedName = useAppStore((s) => s.selectedName);
  const selectLocation = useAppStore((s) => s.selectLocation);
  const { weather, loading, error, retry } = useWeatherAt(selectedPoint, selectedName ?? undefined);

  if (!selectedPoint) return null;

  const title =
    selectedName ?? `${selectedPoint.lat.toFixed(2)}, ${selectedPoint.lng.toFixed(2)}`;

  return (
    <div className="weather-panel">
      <div className="weather-panel__header">
        <h2>{title}</h2>
        <button
          className="weather-panel__close"
          onClick={() => selectLocation(null)}
          aria-label="關閉"
        >
          ✕
        </button>
      </div>

      <div className="weather-panel__body">
        {loading && (
          <div className="weather-panel__state">
            <span className="loading-overlay__spinner" />
            <span>{zhHant.state.loading}</span>
          </div>
        )}

        {!loading && error && (
          <div className="weather-panel__state">
            <span>{error}</span>
            <button className="error-toast__retry" onClick={retry}>
              {zhHant.state.retry}
            </button>
          </div>
        )}

        {!loading && !error && weather && (
          <>
            <div className="weather-panel__current">
              <span className="weather-panel__icon">{weatherCodeIcon(weather.weatherCode)}</span>
              <div>
                <div className="weather-panel__temp">{Math.round(weather.temperature)}°</div>
                <div className="weather-panel__desc">{weatherCodeText(weather.weatherCode)}</div>
              </div>
            </div>

            <dl className="weather-panel__grid">
              <div>
                <dt>{zhHant.weather.apparentTemperature}</dt>
                <dd>{Math.round(weather.apparentTemperature)}°</dd>
              </div>
              <div>
                <dt>{zhHant.weather.humidity}</dt>
                <dd>{Math.round(weather.humidity)}%</dd>
              </div>
              <div>
                <dt>{zhHant.weather.windSpeed}</dt>
                <dd>{Math.round(weather.windSpeed)} km/h</dd>
              </div>
              <div>
                <dt>{zhHant.weather.windDirection}</dt>
                <dd>
                  <span
                    className="weather-panel__arrow"
                    style={{ transform: `rotate(${weather.windDirection}deg)` }}
                    aria-hidden
                  >
                    ↓
                  </span>
                  {Math.round(weather.windDirection)}°
                </dd>
              </div>
            </dl>

            {weather.hourly && weather.hourly.length > 0 && (
              <div className="weather-panel__hourly">
                {weather.hourly.map((h) => (
                  <div key={h.time} className="weather-panel__hour">
                    <span className="weather-panel__hour-time">{formatHour(h.time)}</span>
                    <span>{weatherCodeIcon(h.weatherCode)}</span>
                    <span className="weather-panel__hour-temp">{Math.round(h.temperature)}°</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
