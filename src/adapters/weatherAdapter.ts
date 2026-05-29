import type { HourlyForecast, LngLat, WeatherModel } from '@/types';
import type { OMForecastResponse } from '@/services/weatherApiService';

// 將 Open-Meteo 原始回傳正規化為內部 WeatherModel。
export function adaptWeather(
  raw: OMForecastResponse,
  point: LngLat,
  name?: string,
): WeatherModel {
  const c = raw.current;
  const hourly: HourlyForecast[] = [];
  if (raw.hourly?.time) {
    const now = Date.now();
    for (let i = 0; i < raw.hourly.time.length && hourly.length < 6; i++) {
      // 只取現在之後的時段。
      if (new Date(raw.hourly.time[i]).getTime() < now - 3600 * 1000) continue;
      hourly.push({
        time: raw.hourly.time[i],
        temperature: raw.hourly.temperature_2m[i],
        weatherCode: raw.hourly.weather_code[i],
      });
    }
  }
  return {
    location: point,
    name,
    temperature: c.temperature_2m,
    apparentTemperature: c.apparent_temperature,
    humidity: c.relative_humidity_2m,
    windSpeed: c.wind_speed_10m,
    windDirection: c.wind_direction_10m,
    weatherCode: c.weather_code,
    time: c.time,
    hourly,
  };
}
