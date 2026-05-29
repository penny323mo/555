import type { MapBounds, VectorField } from '@/types';
import type { WindFieldProvider } from './WindFieldProvider';
import { fetchWindGrid } from '@/services/weatherApiService';
import { buildWindField } from '@/adapters/windFieldAdapter';
import { LruCache, boundsKey } from '@/utils/cache';

// 真實風場：在可視範圍取 GRID×GRID 格點，一次請求 Open-Meteo，
// 轉成 u/v 後交給雙線性插值。引擎介面與 MockWindProvider 完全相同。
// 一次請求的點數需在 Open-Meteo 多點查詢上限內，否則整批失敗會退回 mock。
const GRID = 8;

export class OpenMeteoWindProvider implements WindFieldProvider {
  private cache = new LruCache<VectorField>(16);

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
