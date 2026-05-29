import type { GeoResult } from '@/types';

// Open-Meteo 地理編碼（免 API key、支援 CORS）。
const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';

interface OMGeoItem {
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
}
interface OMGeoResponse {
  results?: OMGeoItem[];
}

export async function searchPlaces(query: string, signal?: AbortSignal): Promise<GeoResult[]> {
  if (!query.trim()) return [];
  const url = `${GEO_URL}?name=${encodeURIComponent(query)}&count=6&language=zh&format=json`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`地理編碼失敗：${res.status}`);
  const data = (await res.json()) as OMGeoResponse;
  return (data.results ?? []).map((r) => ({
    name: r.name,
    country: r.country ?? '',
    admin1: r.admin1,
    location: { lng: r.longitude, lat: r.latitude },
  }));
}
