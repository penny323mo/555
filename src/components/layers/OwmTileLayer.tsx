import { useEffect } from 'react';
import { useMap } from '@/hooks/useMap';
import { owmTileUrl } from '@/config/owm';

// OpenWeatherMap 真實天氣 tile 圖層（raster，做 Open-Meteo 的備援）。
// tile 為固定成本（非按點計費），被限流時的可靠後備。
export function OwmTileLayer({ owmLayer, opacity = 0.65 }: { owmLayer: string; opacity?: number }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    const id = `owm-${owmLayer}`;
    const remove = () => {
      if (map.getLayer(id)) map.removeLayer(id);
      if (map.getSource(id)) map.removeSource(id);
    };
    remove();
    map.addSource(id, { type: 'raster', tiles: [owmTileUrl(owmLayer)], tileSize: 256 });
    map.addLayer({ id, type: 'raster', source: id, paint: { 'raster-opacity': opacity } });
    return remove;
  }, [map, owmLayer, opacity]);

  return null;
}
