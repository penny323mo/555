// WMO 天氣代碼 → 繁體中文描述與表情符號。
const TABLE: Record<number, { text: string; icon: string }> = {
  0: { text: '晴', icon: '☀️' },
  1: { text: '大致晴朗', icon: '🌤️' },
  2: { text: '局部多雲', icon: '⛅' },
  3: { text: '陰', icon: '☁️' },
  45: { text: '霧', icon: '🌫️' },
  48: { text: '霧凇', icon: '🌫️' },
  51: { text: '毛毛雨', icon: '🌦️' },
  53: { text: '毛毛雨', icon: '🌦️' },
  55: { text: '強毛毛雨', icon: '🌦️' },
  56: { text: '凍毛毛雨', icon: '🌧️' },
  57: { text: '凍毛毛雨', icon: '🌧️' },
  61: { text: '小雨', icon: '🌧️' },
  63: { text: '中雨', icon: '🌧️' },
  65: { text: '大雨', icon: '🌧️' },
  66: { text: '凍雨', icon: '🌧️' },
  67: { text: '凍雨', icon: '🌧️' },
  71: { text: '小雪', icon: '🌨️' },
  73: { text: '中雪', icon: '🌨️' },
  75: { text: '大雪', icon: '❄️' },
  77: { text: '雪粒', icon: '🌨️' },
  80: { text: '陣雨', icon: '🌦️' },
  81: { text: '陣雨', icon: '🌧️' },
  82: { text: '強陣雨', icon: '⛈️' },
  85: { text: '陣雪', icon: '🌨️' },
  86: { text: '強陣雪', icon: '❄️' },
  95: { text: '雷雨', icon: '⛈️' },
  96: { text: '雷雨伴冰雹', icon: '⛈️' },
  99: { text: '雷雨伴冰雹', icon: '⛈️' },
};

export function weatherCodeText(code: number): string {
  return TABLE[code]?.text ?? '未知';
}

export function weatherCodeIcon(code: number): string {
  return TABLE[code]?.icon ?? '❓';
}
