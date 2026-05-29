// 繁體中文字典。MVP 只有單一語系，集中於此方便日後擴充 i18n。

export const zhHant = {
  appTitle: '互動天氣地圖',
  search: {
    placeholder: '搜尋地點…',
    noResults: '找不到符合的地點',
    loading: '搜尋中…',
  },
  layers: {
    wind: '風',
    temperature: '溫度',
    rain: '降雨',
    cloud: '雲量',
    pressure: '氣壓',
  },
  weather: {
    title: '天氣詳情',
    temperature: '溫度',
    apparentTemperature: '體感溫度',
    humidity: '濕度',
    windSpeed: '風速',
    windDirection: '風向',
  },
  state: {
    loading: '載入中…',
    error: '資料載入失敗，請稍後再試',
    retry: '重試',
  },
} as const;

export type I18nDict = typeof zhHant;
