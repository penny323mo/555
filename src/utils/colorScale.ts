import type { LayerId } from '@/types';

// 每種圖層的色階定義：用於 Legend 漸層條與（Phase 5）圖層上色。
// stops 由低到高，搭配 domain 顯示刻度數值。
export interface ColorScale {
  /** CSS linear-gradient 用的色點。 */
  colors: string[];
  /** 對應的刻度值（與視覺漸層對齊）。 */
  ticks: number[];
}

export const COLOR_SCALES: Record<LayerId, ColorScale> = {
  wind: {
    colors: ['#3a4cc0', '#4aa3df', '#3fbf7f', '#f4e04d', '#ef8a3c', '#d6443c'],
    ticks: [0, 10, 20, 35, 55, 100],
  },
  temperature: {
    colors: ['#3b4cc0', '#7aa8e6', '#c9e3a3', '#f7e08a', '#ef8a3c', '#b2182b'],
    ticks: [-20, -5, 5, 15, 25, 40],
  },
  rain: {
    colors: ['#e8f4f8', '#9ed1e6', '#4aa3df', '#2a6fb5', '#1d3f8f', '#5e2b8f'],
    ticks: [0, 1, 3, 7, 15, 30],
  },
  cloud: {
    colors: ['#1a1c22', '#3a3f4a', '#6b727f', '#9aa3ad', '#cdd3da', '#ffffff'],
    ticks: [0, 20, 40, 60, 80, 100],
  },
  pressure: {
    colors: ['#5e2b8f', '#4aa3df', '#3fbf7f', '#f4e04d', '#ef8a3c', '#d6443c'],
    ticks: [960, 985, 1000, 1013, 1030, 1050],
  },
};

/** 產生 CSS linear-gradient 字串（水平）。 */
export function toGradient(scale: ColorScale): string {
  return `linear-gradient(90deg, ${scale.colors.join(', ')})`;
}
