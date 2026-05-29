import type { LayerId, MapBounds } from '@/types';

// 四種純量圖層（風以外）。
export type ScalarLayerId = Exclude<LayerId, 'wind'>;

// 純量場：grid×grid 數值，row-major、由北到南（與螢幕 y 一致）。
export interface ScalarField {
  grid: number;
  values: Float32Array;
  bounds: MapBounds;
}

// 各圖層對應的 Open-Meteo current 變數名。
const VAR: Record<ScalarLayerId, string> = {
  temperature: 'temperature_2m',
  rain: 'precipitation',
  cloud: 'cloud_cover',
  pressure: 'pressure_msl',
};

const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';
const REAL_GRID = 12;

interface OMScalarItem {
  current: Record<string, number>;
}

// 真實取樣：grid×grid 點一次請求。失敗時由呼叫端以 mock 後備。
export async function getScalarField(
  layer: ScalarLayerId,
  bounds: MapBounds,
  signal?: AbortSignal,
): Promise<ScalarField> {
  const grid = REAL_GRID;
  const lats: number[] = [];
  const lons: number[] = [];
  const dLng = (bounds.east - bounds.west) / (grid - 1);
  const dLat = (bounds.north - bounds.south) / (grid - 1);
  // 由北到南建點，與 ScalarField row-major（北優先）一致。
  for (let r = 0; r < grid; r++) {
    const lat = bounds.north - r * dLat;
    for (let c = 0; c < grid; c++) {
      lats.push(lat);
      lons.push(bounds.west + c * dLng);
    }
  }

  const params = new URLSearchParams({
    latitude: lats.join(','),
    longitude: lons.join(','),
    current: VAR[layer],
    timezone: 'UTC',
  });
  const res = await fetch(`${FORECAST_URL}?${params.toString()}`, { signal });
  if (!res.ok) throw new Error(`圖層資料失敗：${res.status}`);
  const data = (await res.json()) as OMScalarItem | OMScalarItem[];
  const arr = Array.isArray(data) ? data : [data];

  const values = new Float32Array(grid * grid);
  for (let i = 0; i < values.length; i++) {
    values[i] = arr[i]?.current[VAR[layer]] ?? 0;
  }
  return { grid, values, bounds };
}

// Mock 後備：以解析函數產生合理範圍的場，視覺到位即可。
export function mockScalarField(
  layer: ScalarLayerId,
  bounds: MapBounds,
  grid: number,
): ScalarField {
  const values = new Float32Array(grid * grid);
  const dLng = (bounds.east - bounds.west) / (grid - 1);
  const dLat = (bounds.north - bounds.south) / (grid - 1);
  for (let r = 0; r < grid; r++) {
    const lat = bounds.north - r * dLat;
    for (let c = 0; c < grid; c++) {
      const lng = bounds.west + c * dLng;
      values[r * grid + c] = mockValue(layer, lng, lat);
    }
  }
  return { grid, values, bounds };
}

function mockValue(layer: ScalarLayerId, lng: number, lat: number): number {
  switch (layer) {
    case 'temperature':
      return 28 - Math.abs(lat) * 0.5 + Math.sin(lng * 0.1) * 4 + Math.sin(lat * 0.3) * 3;
    case 'rain':
      return Math.max(0, Math.sin(lng * 0.2) * Math.cos(lat * 0.2) * 14 + Math.sin((lng + lat) * 0.1) * 6);
    case 'cloud':
      return Math.min(100, Math.max(0, 50 + Math.sin(lng * 0.15) * 30 + Math.cos(lat * 0.15) * 20));
    case 'pressure':
      return 1013 + Math.sin(lat * 0.1) * 20 + Math.cos(lng * 0.12) * 15;
  }
}
