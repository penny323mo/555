import type { LngLat, WeatherModel } from '@/types';

// 記憶體 LRU 快取：供風場等以 key 量化的資料重用，避免重複請求。
export class LruCache<V> {
  private map = new Map<string, V>();
  constructor(private max = 24) {}

  get(key: string): V | undefined {
    const v = this.map.get(key);
    if (v !== undefined) {
      // 命中後移到最後，維持 LRU 順序。
      this.map.delete(key);
      this.map.set(key, v);
    }
    return v;
  }

  set(key: string, value: V): void {
    if (this.map.has(key)) this.map.delete(key);
    this.map.set(key, value);
    if (this.map.size > this.max) {
      const oldest = this.map.keys().next().value;
      if (oldest !== undefined) this.map.delete(oldest);
    }
  }
}

/** 將範圍量化成快取 key（小數一位），讓微小位移命中同一筆。 */
export function boundsKey(b: { west: number; south: number; east: number; north: number }): string {
  const r = (n: number) => n.toFixed(1);
  return `${r(b.west)},${r(b.south)},${r(b.east)},${r(b.north)}`;
}

// 點查詢天氣的 sessionStorage 快取，TTL 10 分鐘。
const WEATHER_TTL = 10 * 60 * 1000;

function weatherKey(p: LngLat): string {
  return `wx:${p.lat.toFixed(2)},${p.lng.toFixed(2)}`;
}

export function readWeatherCache(p: LngLat): WeatherModel | null {
  try {
    const raw = sessionStorage.getItem(weatherKey(p));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { t: number; v: WeatherModel };
    if (Date.now() - parsed.t > WEATHER_TTL) return null;
    return parsed.v;
  } catch {
    return null;
  }
}

export function writeWeatherCache(p: LngLat, v: WeatherModel): void {
  try {
    sessionStorage.setItem(weatherKey(p), JSON.stringify({ t: Date.now(), v }));
  } catch {
    // 容量已滿或無權限時略過快取。
  }
}
