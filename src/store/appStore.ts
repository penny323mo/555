import { create } from 'zustand';
import type { LayerId, LngLat } from '@/types';
import { DEFAULT_LAYER } from '@/config/layers.config';

// 全域狀態只放跨元件共享的少量資料，其餘留在區域 hook / component。
interface AppState {
  activeLayer: LayerId;
  setActiveLayer: (layer: LayerId) => void;

  /** 使用者點擊或搜尋選定的座標（null 表示未選取）。 */
  selectedPoint: LngLat | null;
  setSelectedPoint: (point: LngLat | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeLayer: DEFAULT_LAYER,
  setActiveLayer: (layer) => set({ activeLayer: layer }),

  selectedPoint: null,
  setSelectedPoint: (point) => set({ selectedPoint: point }),
}));
