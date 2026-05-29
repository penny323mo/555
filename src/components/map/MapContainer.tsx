import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useSetMap } from '@/hooks/useMap';
import { useAppStore } from '@/store/appStore';
import { MAP_INITIAL_VIEW, RASTER_STYLE } from '@/config/map.config';

// 掛載 MapLibre 地圖，並把實例交給 context。
export function MapContainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const setMap = useSetMap();
  const selectLocation = useAppStore((s) => s.selectLocation);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: RASTER_STYLE,
      center: MAP_INITIAL_VIEW.center,
      zoom: MAP_INITIAL_VIEW.zoom,
      minZoom: MAP_INITIAL_VIEW.minZoom,
      maxZoom: MAP_INITIAL_VIEW.maxZoom,
      attributionControl: { compact: true },
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right');

    // 點擊地圖選定座標，觸發天氣查詢。
    map.on('click', (e) => {
      selectLocation({ lng: e.lngLat.lng, lat: e.lngLat.lat });
    });

    map.on('load', () => setMap(map));

    return () => {
      setMap(null);
      map.remove();
    };
    // 僅在掛載時建立一次地圖。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={containerRef} className="map-container" />;
}
