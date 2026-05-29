import { useEffect, useState } from 'react';
import { useMap } from '@/hooks/useMap';

// NASA GIBS 衛星影像（WMTS REST、免 key、支援 CORS、Web Mercator）。
// MODIS Terra 真實色：雲呈白色，每日更新（非即時）。
const SOURCE_ID = 'nasa-gibs-cloud';
const LAYER = 'MODIS_Terra_CorrectedReflectance_TrueColor';

// 影像有處理延遲，取前一日（UTC）以確保整片覆蓋皆可用。
function recentUtcDate(): string {
  return new Date(Date.now() - 24 * 3600 * 1000).toISOString().slice(0, 10);
}

// 雲量圖層：以 NASA GIBS 真實衛星影像疊在地圖上。
export function CloudSatelliteLayer() {
  const map = useMap();
  const [date] = useState(recentUtcDate);

  useEffect(() => {
    if (!map) return;

    const remove = () => {
      if (map.getLayer(SOURCE_ID)) map.removeLayer(SOURCE_ID);
      if (map.getSource(SOURCE_ID)) map.removeSource(SOURCE_ID);
    };

    const url = `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/${LAYER}/default/${date}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg`;
    remove();
    // GIBS 此圖層最高 zoom 9，超過則由 MapLibre 放大顯示。
    map.addSource(SOURCE_ID, { type: 'raster', tiles: [url], tileSize: 256, maxzoom: 9 });
    map.addLayer({
      id: SOURCE_ID,
      type: 'raster',
      source: SOURCE_ID,
      paint: { 'raster-opacity': 0.8 },
    });

    return remove;
  }, [map, date]);

  return <div className="radar-badge">衛星雲圖・{date}</div>;
}
