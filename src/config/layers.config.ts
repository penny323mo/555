import type { LayerConfig, LayerId } from '@/types';
import { zhHant } from './i18n.zh-Hant';

// 五種圖層的定義。順序即為 LayerSwitcher 的顯示順序。
export const LAYERS: LayerConfig[] = [
  { id: 'wind', label: zhHant.layers.wind, unit: 'km/h' },
  { id: 'temperature', label: zhHant.layers.temperature, unit: '°C' },
  { id: 'rain', label: zhHant.layers.rain, unit: 'mm' },
  { id: 'cloud', label: zhHant.layers.cloud, unit: '%' },
  { id: 'pressure', label: zhHant.layers.pressure, unit: 'hPa' },
];

export const DEFAULT_LAYER: LayerId = 'wind';
