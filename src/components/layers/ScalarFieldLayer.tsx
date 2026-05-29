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
import { OwmTileLayer } from '@/components/layers/OwmTileLayer';
import { OWM_AVAILABLE, OWM_LAYER } from '@/config/owm';

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
  const [dataMode, setDataMode] = useState<'live' | 'owm' | 'mock'>('mock');
  // 由 OWM tile 失敗時呼叫，改畫 mock heatmap。
  const fallbackToMockRef = useRef<() => void>(() => {});

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

    const toMock = (bounds: MapBounds) => {
      draw(mockScalarField(layer, bounds, MOCK_GRID));
      setDataMode('mock');
    };
    fallbackToMockRef.current = () => {
      if (!disposed) toMock(toBounds());
    };

    let loadTimer: ReturnType<typeof setTimeout> | undefined;
    const load = () => {
      const bounds = toBounds();
      const t = ++token;
      setLoading(true);
      // 有 OWM 備援時先清空（等 tile）；否則先以 mock 立即顯示。
      if (OWM_AVAILABLE) clear();
      else draw(mockScalarField(layer, bounds, MOCK_GRID));
      clearTimeout(loadTimer);
      loadTimer = setTimeout(() => {
        getScalarField(layer, bounds)
          .then((f) => {
            if (disposed || t !== token) return;
            draw(f);
            setDataMode('live');
          })
          .catch(() => {
            if (disposed || t !== token) return;
            // 有 OWM 備援則改顯示 OWM tile（失敗會再退回 mock）；否則直接 mock。
            if (OWM_AVAILABLE) {
              clear();
              setDataMode('owm');
            } else {
              toMock(bounds);
            }
          })
          .finally(() => {
            if (!disposed && t === token) setLoading(false);
          });
      }, 500);
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
      clearTimeout(loadTimer);
      map.off('movestart', onMoveStart);
      map.off('zoomstart', onMoveStart);
      map.off('moveend', onMoveEnd);
      map.off('zoomend', onMoveEnd);
    };
  }, [map, layer]);

  return (
    <>
      {dataMode === 'owm' && (
        <OwmTileLayer owmLayer={OWM_LAYER[layer]} onError={() => fallbackToMockRef.current()} />
      )}
      <canvas ref={canvasRef} className="scalar-canvas" />
      <div className={`radar-badge ${dataMode === 'mock' ? 'is-warn' : ''}`}>
        {dataMode === 'live'
          ? '即時資料(Open-Meteo)'
          : dataMode === 'owm'
            ? 'OpenWeatherMap 備援'
            : '示意資料(無法連線即時資料)'}
      </div>
      <LoadingOverlay visible={loading} />
    </>
  );
}
