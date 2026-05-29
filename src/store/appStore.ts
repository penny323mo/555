import { create } from 'zustand';
import type { LayerId, LngLat } from '@/types';
import { DEFAULT_LAYER } from '@/config/layers.config';

// 全域狀態只放跨元件共享的少量資料，其餘留在區域 hook / component。
interface AppState {
  activeLayer: LayerId;
  setActiveLayer: (layer: LayerId) => void;

  /** 使用者點擊或搜尋選定的座標（null 表示未選取）。 */
  selectedPoint: LngLat | null;
  /** 選定地點名稱（搜尋來源才有；地圖點擊為 null）。 */
  selectedName: string | null;
  /** 選定地點；point 為 null 表示清除。 */
  selectLocation: (point: LngLat | null, name?: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeLayer: DEFAULT_LAYER,
  setActiveLayer: (layer) => set({ activeLayer: layer }),

  selectedPoint: null,
  selectedName: null,
  selectLocation: (point, name) =>
    set({ selectedPoint: point, selectedName: point ? (name ?? null) : null }),
}));
