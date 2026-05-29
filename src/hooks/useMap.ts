import { createContext, useContext } from 'react';
import type { Map as MapLibreMap } from 'maplibre-gl';

// 透過 context 共享單一 MapLibre 地圖實例，讓覆蓋層 / UI 都能取用。
interface MapContextValue {
  map: MapLibreMap | null;
  setMap: (map: MapLibreMap | null) => void;
}

export const MapContext = createContext<MapContextValue>({
  map: null,
  setMap: () => {},
});

/** 取得目前的地圖實例（未就緒時為 null）。 */
export function useMap(): MapLibreMap | null {
  return useContext(MapContext).map;
}

/** 供 MapContainer 設定地圖實例使用。 */
export function useSetMap(): (map: MapLibreMap | null) => void {
  return useContext(MapContext).setMap;
}
