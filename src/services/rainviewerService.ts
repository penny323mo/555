// RainViewer 公開 API（免 key、支援 CORS）：提供全球真實降雨雷達磚。
// 先取得影格清單，再組出最新一張的 tile 樣板供 MapLibre raster source 使用。
const API = 'https://api.rainviewer.com/public/weather-maps.json';

// tile 參數：256 大小、色階 2（Universal Blue，與圖例藍→紫一致）、平滑 + 顯示雪。
const TILE_SIZE = 256;
const COLOR_SCHEME = 2;
const TILE_OPTIONS = '1_1';

interface RVFrame {
  time: number;
  path: string;
}
interface RVResponse {
  host: string;
  radar: { past: RVFrame[]; nowcast: RVFrame[] };
}

export interface RadarFrame {
  /** MapLibre raster tiles 樣板（含 {z}/{x}/{y}）。 */
  tileUrl: string;
  /** 此影格的觀測時間（毫秒）。 */
  time: number;
}

export async function fetchLatestRadar(signal?: AbortSignal): Promise<RadarFrame> {
  const res = await fetch(API, { signal });
  if (!res.ok) throw new Error(`RainViewer 失敗：${res.status}`);
  const data = (await res.json()) as RVResponse;

  const frames = data.radar?.past ?? [];
  const frame = frames[frames.length - 1];
  if (!frame) throw new Error('RainViewer 無可用影格');

  return {
    tileUrl: `${data.host}${frame.path}/${TILE_SIZE}/{z}/{x}/{y}/${COLOR_SCHEME}/${TILE_OPTIONS}.png`,
    time: frame.time * 1000,
  };
}
