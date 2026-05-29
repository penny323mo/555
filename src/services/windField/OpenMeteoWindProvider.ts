import type { MapBounds, VectorField } from '@/types';
import type { WindFieldProvider } from './WindFieldProvider';
import { fetchWindGrid } from '@/services/weatherApiService';
import { buildWindField } from '@/adapters/windFieldAdapter';
import { LruCache, boundsKey } from '@/utils/cache';

// 真實風場：在可視範圍取 GRID×GRID 格點，一次請求 Open-Meteo，
// 轉成 u/v 後交給雙線性插值。引擎介面與 MockWindProvider 完全相同。
// 注意：Open-Meteo 多點請求按「點數」計入每小時額度，GRID 直接放大 API 用量。
const GRID = 6;

// 模組層級共用快取：跨圖層切換 / 重新掛載都保留，避免重複請求燒額度。
const fieldCache = new LruCache<VectorField>(48);

export class OpenMeteoWindProvider implements WindFieldProvider {
  private cache = fieldCache;

  async getField(bounds: MapBounds, signal?: AbortSignal): Promise<VectorField> {
    const key = boundsKey(bounds);
    const hit = this.cache.get(key);
    if (hit) return hit;

    const lats: number[] = [];
    const lons: number[] = [];
    const dLng = (bounds.east - bounds.west) / (GRID - 1);
    const dLat = (bounds.north - bounds.south) / (GRID - 1);
    // j（緯度，南→北）外層、i（經度，西→東）內層，與 adapter 約定一致。
    for (let j = 0; j < GRID; j++) {
      const lat = bounds.south + j * dLat;
      for (let i = 0; i < GRID; i++) {
        lats.push(lat);
        lons.push(bounds.west + i * dLng);
      }
    }

    const samples = await fetchWindGrid(lats, lons, signal);
    const field = buildWindField(samples, bounds, GRID);
    this.cache.set(key, field);
    return field;
  }
}
