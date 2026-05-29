// OpenWeatherMap 設定。key 由建置時的環境變數注入（VITE_OPENWEATHER_KEY），
// 不寫死於原始碼。未設定時 OWM 備援自動停用，退回 mock。
// 注意：client-side 的 key 仍會出現在打包檔，請於 OWM 後台設用量上限。
export const OWM_KEY = import.meta.env.VITE_OPENWEATHER_KEY ?? '';
export const OWM_AVAILABLE = OWM_KEY.length > 0;

const OWM_TILE_BASE = 'https://tile.openweathermap.org/map';

/** 產生 OWM 天氣圖層 tile 樣板（含 {z}/{x}/{y}）。 */
export function owmTileUrl(owmLayer: string): string {
  return `${OWM_TILE_BASE}/${owmLayer}/{z}/{x}/{y}.png?appid=${OWM_KEY}`;
}

// 內部圖層 → OWM tile 圖層 id。
export const OWM_LAYER: Record<'wind' | 'temperature' | 'pressure' | 'cloud' | 'rain', string> = {
  wind: 'wind_new',
  temperature: 'temp_new',
  pressure: 'pressure_new',
  cloud: 'clouds_new',
  rain: 'precipitation_new',
};
