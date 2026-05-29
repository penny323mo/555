import { useEffect } from 'react';
import { useMap } from '@/hooks/useMap';
import { owmTileUrl } from '@/config/owm';

// OpenWeatherMap 真實天氣 tile 圖層（raster，做 Open-Meteo 的備援）。
// tile 為固定成本（非按點計費），被限流時的可靠後備。
// onError：tile 載入失敗（例如 key 未生效回 401）時通知呼叫端，可再退回 mock。
export function OwmTileLayer({
  owmLayer,
  opacity = 0.7,
  onError,
}: {
  owmLayer: string;
  opacity?: number;
  onError?: () => void;
}) {
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

    // 監聽此 source 的 tile 載入錯誤（401 / 網路失敗等）。
    const onMapError = (e: { sourceId?: string }) => {
      if (e.sourceId === id) onError?.();
    };
    map.on('error', onMapError);

    return () => {
      map.off('error', onMapError);
      remove();
    };
  }, [map, owmLayer, opacity, onError]);

  return null;
}
