import { useEffect, useState } from 'react';
import { useMap } from '@/hooks/useMap';
import { fetchLatestRadar } from '@/services/rainviewerService';

const SOURCE_ID = 'rainviewer-radar';

function formatTime(ms: number): string {
  const d = new Date(ms);
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
}

// 降雨圖層：以 RainViewer 真實雷達磚疊在地圖上（MapLibre raster source）。
export function RainRadarLayer() {
  const map = useMap();
  const [time, setTime] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!map) return;
    let cancelled = false;

    const remove = () => {
      if (map.getLayer(SOURCE_ID)) map.removeLayer(SOURCE_ID);
      if (map.getSource(SOURCE_ID)) map.removeSource(SOURCE_ID);
    };

    fetchLatestRadar()
      .then((frame) => {
        if (cancelled) return;
        remove();
        map.addSource(SOURCE_ID, { type: 'raster', tiles: [frame.tileUrl], tileSize: 256 });
        map.addLayer({
          id: SOURCE_ID,
          type: 'raster',
          source: SOURCE_ID,
          paint: { 'raster-opacity': 0.75 },
        });
        setTime(frame.time);
        setFailed(false);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
      remove();
    };
  }, [map]);

  return (
    <div className="radar-badge">
      {failed ? '雷達載入失敗' : time ? `雷達回波・${formatTime(time)}` : '雷達載入中…'}
    </div>
  );
}
