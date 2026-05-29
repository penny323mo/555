// Open-Meteo 預報 API（免 API key、支援 CORS）。
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';

export interface OMCurrent {
  time: string;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  weather_code: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
}
export interface OMForecastResponse {
  current: OMCurrent;
  hourly?: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
  };
}

// 點查詢天氣：風速用預設 km/h（與圖例一致）。
export async function fetchWeather(
  lat: number,
  lon: number,
  signal?: AbortSignal,
): Promise<OMForecastResponse> {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    current:
      'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m',
    hourly: 'temperature_2m,weather_code',
    timezone: 'auto',
    forecast_days: '1',
  });
  const res = await fetch(`${FORECAST_URL}?${params.toString()}`, { signal });
  if (!res.ok) throw new Error(`天氣查詢失敗：${res.status}`);
  return (await res.json()) as OMForecastResponse;
}

interface OMWindResponse {
  current: { wind_speed_10m: number; wind_direction_10m: number };
}

// 風場格點取樣：一次請求多座標，風速用 m/s 供粒子運算。
export async function fetchWindGrid(
  lats: number[],
  lons: number[],
  signal?: AbortSignal,
): Promise<{ speed: number; dir: number }[]> {
  const params = new URLSearchParams({
    latitude: lats.join(','),
    longitude: lons.join(','),
    current: 'wind_speed_10m,wind_direction_10m',
    wind_speed_unit: 'ms',
    timezone: 'UTC',
  });
  const res = await fetch(`${FORECAST_URL}?${params.toString()}`, { signal });
  if (!res.ok) throw new Error(`風場查詢失敗：${res.status}`);
  const data = (await res.json()) as OMWindResponse | OMWindResponse[];
  const arr = Array.isArray(data) ? data : [data];
  return arr.map((d) => ({ speed: d.current.wind_speed_10m, dir: d.current.wind_direction_10m }));
}
