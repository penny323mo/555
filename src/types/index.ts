// 內部統一資料模型。所有 API 回傳都會經 adapters 正規化成這些型別，
// UI 與引擎只依賴這裡的型別，不直接碰各家 API 的原始格式。

/** 經緯度座標（lng 在前，對齊 MapLibre 慣例）。 */
export interface LngLat {
  lng: number;
  lat: number;
}

/** 地圖可視範圍。 */
export interface MapBounds {
  west: number;
  south: number;
  east: number;
  north: number;
}

/** 五種天氣圖層的識別碼。 */
export type LayerId = 'wind' | 'temperature' | 'rain' | 'cloud' | 'pressure';

/** 單一圖層的設定（標籤、單位、色階等於 config 定義）。 */
export interface LayerConfig {
  id: LayerId;
  /** 繁體中文標籤。 */
  label: string;
  /** 圖例單位，例如 km/h、°C。 */
  unit: string;
}

/** 點查詢後的天氣模型（adapter 正規化結果）。 */
export interface WeatherModel {
  location: LngLat;
  /** 地點名稱（搜尋來源才有）。 */
  name?: string;
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  windSpeed: number;
  /** 風向（氣象慣例：風的來向，單位度）。 */
  windDirection: number;
  /** 天氣狀態代碼（WMO weather code）。 */
  weatherCode: number;
  time: string;
  /** 未來數小時簡易預報。 */
  hourly?: HourlyForecast[];
}

/** 單一小時的預報。 */
export interface HourlyForecast {
  time: string;
  temperature: number;
  weatherCode: number;
}

/** 地理編碼搜尋結果。 */
export interface GeoResult {
  name: string;
  country: string;
  admin1?: string;
  location: LngLat;
}

/**
 * 風場向量場：粒子引擎的資料介面。
 * u = 東西分量（東為正），v = 南北分量（北為正），單位 m/s。
 * 採策略模式，mock 與真實 provider 都實作 getVector。
 */
export interface VectorField {
  bounds: MapBounds;
  getVector(lng: number, lat: number): { u: number; v: number };
}
