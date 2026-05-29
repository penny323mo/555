import { useState, type ReactNode } from 'react';
import type { Map as MapLibreMap } from 'maplibre-gl';
import { MapContext } from '@/hooks/useMap';

// 持有地圖實例並透過 context 向下提供。
export function MapProvider({ children }: { children: ReactNode }) {
  const [map, setMap] = useState<MapLibreMap | null>(null);
  return <MapContext.Provider value={{ map, setMap }}>{children}</MapContext.Provider>;
}
