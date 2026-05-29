import { useEffect, useState } from 'react';
import type { GeoResult } from '@/types';
import { searchPlaces } from '@/services/geocodingService';
import { zhHant } from '@/config/i18n.zh-Hant';

// 城市搜尋：debounce 400ms + AbortController 取消過期請求。
export function useGeocoding(query: string) {
  const [results, setResults] = useState<GeoResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setError(null);
      setLoading(false);
      return;
    }
    const ctrl = new AbortController();
    setLoading(true);
    const timer = setTimeout(() => {
      searchPlaces(query, ctrl.signal)
        .then((r) => {
          setResults(r);
          setError(null);
        })
        .catch((e: unknown) => {
          if (e instanceof DOMException && e.name === 'AbortError') return;
          setError(zhHant.state.error);
          setResults([]);
        })
        .finally(() => setLoading(false));
    }, 400);

    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, [query]);

  return { results, loading, error };
}
