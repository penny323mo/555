import { useCallback, useEffect, useState } from 'react';
import type { LngLat, WeatherModel } from '@/types';
import { fetchWeather } from '@/services/weatherApiService';
import { adaptWeather } from '@/adapters/weatherAdapter';
import { readWeatherCache, writeWeatherCache } from '@/utils/cache';
import { zhHant } from '@/config/i18n.zh-Hant';

// 點查詢天氣：sessionStorage 快取 + AbortController + 重試。
export function useWeatherAt(point: LngLat | null, name?: string) {
  const [weather, setWeather] = useState<WeatherModel | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!point) {
      setWeather(null);
      setError(null);
      setLoading(false);
      return;
    }

    const cached = readWeatherCache(point);
    if (cached && reloadKey === 0) {
      setWeather({ ...cached, name: name ?? cached.name });
      setError(null);
      setLoading(false);
      return;
    }

    const ctrl = new AbortController();
    setLoading(true);
    setError(null);
    fetchWeather(point.lat, point.lng, ctrl.signal)
      .then((raw) => {
        const model = adaptWeather(raw, point, name);
        setWeather(model);
        writeWeatherCache(point, model);
      })
      .catch((e: unknown) => {
        if (e instanceof DOMException && e.name === 'AbortError') return;
        setError(zhHant.state.error);
      })
      .finally(() => setLoading(false));

    return () => ctrl.abort();
  }, [point, name, reloadKey]);

  const retry = useCallback(() => setReloadKey((k) => k + 1), []);
  return { weather, loading, error, retry };
}
