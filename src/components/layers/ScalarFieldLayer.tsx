import { useEffect, useRef, useState } from 'react';
import type { MapBounds } from '@/types';
import { useMap } from '@/hooks/useMap';
import {
  getScalarField,
  mockScalarField,
  type ScalarField,
  type ScalarLayerId,
} from '@/services/layerDataService';
import { COLOR_SCALES, hexToRgb, sampleColor } from '@/utils/colorScale';
import { LoadingOverlay } from '@/components/ui/LoadingOverlay';

const MOCK_GRID = 16;

// 各圖層的不透明度策略：降雨 / 雲量依量值淡入，溫度 / 氣壓固定半透明。
function alphaFor(layer: ScalarLayerId, v: number): number {
  switch (layer) {
    case 'rain':
      return Math.min(1, Math.max(0, v / 8)) * 0.75;
    case 'cloud':
      return (Math.min(100, Math.max(0, v)) / 100) * 0.6;
    case 'temperature':
      return 0.55;
    case 'pressure':
      return 0.5;
  }
}

// 純量圖層：以取樣格點 + 色階畫成 heatmap，drawImage 放大時的平滑插值即為視覺漸層。
// 真實資料失敗時自動以 mock 後備。
export function ScalarFieldLayer({ layer }: { layer: ScalarLayerId }) {
  const map = useMap();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(false);
  const [dataMode, setDataMode] = useState<'live' | 'mock'>('mock');

  useEffect(() => {
    if (!map || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let disposed = false;
    let token = 0;

    const toBounds = (): MapBounds => {
      const b = map.getBounds();
      return { west: b.getWest(), south: b.getSouth(), east: b.getEast(), north: b.getNorth() };
    };
    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    const clear = () => ctx.clearRect(0, 0, canvas.width, canvas.height);

    const draw = (field: ScalarField) => {
      const { grid, values } = field;
      const off = document.createElement('canvas');
      off.width = grid;
      off.height = grid;
      const octx = off.getContext('2d');
      if (!octx) return;
      const img = octx.createImageData(grid, grid);
      const scale = COLOR_SCALES[layer];
      for (let i = 0; i < grid * grid; i++) {
        const [r, g, b] = hexToRgb(sampleColor(scale, values[i]));
        const p = i * 4;
        img.data[p] = r;
        img.data[p + 1] = g;
        img.data[p + 2] = b;
        img.data[p + 3] = Math.round(alphaFor(layer, values[i]) * 255);
      }
      octx.putImageData(img, 0, 0);

      clear();
      ctx.imageSmoothingEnabled = true; // 放大時雙線性插值 → 平滑漸層。
      ctx.drawImage(off, 0, 0, grid, grid, 0, 0, canvas.width, canvas.height);
    };

    const load = () => {
      const bounds = toBounds();
      const t = ++token;
      setLoading(true);
      // 先以 mock 立即顯示，再以真實資料升級（失敗則維持 mock）。
      draw(mockScalarField(layer, bounds, MOCK_GRID));
      getScalarField(layer, bounds)
        .then((f) => {
          if (disposed || t !== token) return;
          draw(f);
          setDataMode('live');
        })
        .catch(() => {
          if (!disposed && t === token) setDataMode('mock');
        })
        .finally(() => {
          if (!disposed && t === token) setLoading(false);
        });
    };

    resize();
    load();

    const onMoveStart = () => clear();
    const onMoveEnd = () => {
      resize();
      load();
    };
    map.on('movestart', onMoveStart);
    map.on('zoomstart', onMoveStart);
    map.on('moveend', onMoveEnd);
    map.on('zoomend', onMoveEnd);

    return () => {
      disposed = true;
      map.off('movestart', onMoveStart);
      map.off('zoomstart', onMoveStart);
      map.off('moveend', onMoveEnd);
      map.off('zoomend', onMoveEnd);
    };
  }, [map, layer]);

  return (
    <>
      <canvas ref={canvasRef} className="scalar-canvas" />
      <div className={`radar-badge ${dataMode === 'mock' ? 'is-warn' : ''}`}>
        {dataMode === 'live' ? '即時資料' : '示意資料(無法連線即時資料)'}
      </div>
      <LoadingOverlay visible={loading} />
    </>
  );
}
