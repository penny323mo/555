import { useEffect, useRef, useState } from 'react';
import type { MapBounds } from '@/types';
import { useMap } from '@/hooks/useMap';
import { ParticleEngine } from '@/engine/particleEngine';
import { MockWindProvider } from '@/services/windField/MockWindProvider';
import { OpenMeteoWindProvider } from '@/services/windField/OpenMeteoWindProvider';
import { COLOR_SCALES, sampleColor } from '@/utils/colorScale';
import { OwmTileLayer } from '@/components/layers/OwmTileLayer';
import { OWM_AVAILABLE, OWM_LAYER } from '@/config/owm';

// 依裝置調整粒子數與解析度，兼顧手機效能。
// 參考 Windy：較疏、較幼、半透明、速度適中，避免重疊成團。
const PARTICLE_COUNT_DESKTOP = 1700;
const PARTICLE_COUNT_MOBILE = 750;
// 速度補償基準：在 REF_ZOOM 用 BASE_SPEED，其餘縮放等比調整，
// 使粒子的螢幕移動速度大致不受 zoom 影響。
const REF_ZOOM = 4;
const BASE_SPEED = 0.018;
// 弱風也能看出流動：給每個粒子一個最低視覺速度（m/s 當量）。
const MIN_VISUAL_SPEED = 1.5;
// 拖尾保留率（destination-in 每幀乘上的 alpha，越接近 1 拖尾越長）。
const FADE_ALPHA = 0.93;
const LINE_WIDTH = 1.1;
// 線條整體不透明度（略透明即可，保留顏色深度）。
const LINE_ALPHA = 0.85;

// Canvas 風場粒子層：疊在地圖上，粒子以經緯度錨定，每幀投影成螢幕座標繪製。
export function WindCanvasLayer() {
  const map = useMap();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // live = 真實 Open-Meteo；owm = OpenWeatherMap tile；mock = 示意資料。
  const [dataMode, setDataMode] = useState<'live' | 'owm' | 'mock'>('mock');
  // 由 OWM tile 失敗時呼叫，切換為 mock 粒子（在 effect 內賦值）。
  const fallbackToMockRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (!map || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.matchMedia('(max-width: 640px)').matches;
    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);
    const count = isMobile ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;

    // 真實風場（Open-Meteo）+ mock 後備：請求失敗或載入中皆以 mock 維持動畫不中斷。
    const provider = new OpenMeteoWindProvider();
    const fallback = new MockWindProvider();

    const toBounds = (): MapBounds => {
      const b = map.getBounds();
      return { west: b.getWest(), south: b.getSouth(), east: b.getEast(), north: b.getNorth() };
    };

    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    let raf = 0;
    let moving = false;
    let disposed = false;
    let reqToken = 0;
    // 一律先不畫粒子，等真實資料到才顯示，避免開頭閃 mock 再跳成真實。
    let suppress = true;

    const bounds0 = toBounds();
    const engine = new ParticleEngine(count, fallback.getField(bounds0), bounds0);
    resize();

    const loadField = (bounds: MapBounds) => {
      const token = ++reqToken;
      Promise.resolve(provider.getField(bounds))
        .then((field) => {
          if (disposed || token !== reqToken) return; // 忽略過期或已卸載的回應。
          engine.reset(field, bounds);
          suppress = false; // 真實資料到，顯示粒子。
          clearCanvas();
          setDataMode('live');
        })
        .catch(() => {
          if (disposed || token !== reqToken) return;
          if (OWM_AVAILABLE) {
            // 改由 OWM tile 顯示，暫停粒子；若 tile 也失敗會再退回 mock。
            suppress = true;
            clearCanvas();
            setDataMode('owm');
          } else {
            toMock(bounds);
          }
        });
    };

    // 退回 mock 粒子（明確示意資料）。
    const toMock = (bounds: MapBounds) => {
      engine.reset(fallback.getField(bounds), bounds);
      suppress = false;
      clearCanvas();
      setDataMode('mock');
    };
    // 供 OWM tile 載入失敗時呼叫。
    fallbackToMockRef.current = () => {
      if (!disposed) toMock(toBounds());
    };

    loadField(bounds0);

    const speedScale = () => BASE_SPEED * Math.pow(2, REF_ZOOM - map.getZoom());
    const clearCanvas = () => ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    const render = () => {
      if (suppress) {
        // 由 OWM tile 顯示，跳過粒子繪製（canvas 保持清空）。
        raf = requestAnimationFrame(render);
        return;
      }
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      // 以 destination-in 乘上 alpha 淡出舊拖尾，不會在地圖上疊加暗色。
      ctx.globalCompositeOperation = 'destination-in';
      ctx.fillStyle = `rgba(0,0,0,${FADE_ALPHA})`;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'source-over';

      engine.step(speedScale(), MIN_VISUAL_SPEED);
      ctx.lineWidth = LINE_WIDTH;
      ctx.lineCap = 'round';
      ctx.globalAlpha = LINE_ALPHA; // 半透明，較柔和不蓋地圖。
      for (const p of engine.getParticles()) {
        if (p.age === 0) continue; // 剛重生，跳過避免拉出長線。
        const a = map.project([p.prevLng, p.prevLat]);
        const b = map.project([p.lng, p.lat]);
        ctx.strokeStyle = sampleColor(COLOR_SCALES.wind, p.speed);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(render);
    };

    // 地圖移動 / 縮放期間暫停模擬並清空，避免拖尾錯位拖影。
    const onMoveStart = () => {
      moving = true;
      cancelAnimationFrame(raf);
      raf = 0;
      clearCanvas();
    };
    let loadTimer: ReturnType<typeof setTimeout> | undefined;
    const onMoveEnd = () => {
      moving = false;
      cancelAnimationFrame(raf); // moveend 與 zoomend 可能同時觸發，先取消避免重複迴圈。
      resize();
      const bounds = toBounds();
      // 不立即重置成 mock（避免閃假資料）；維持目前粒子直到真實資料到。
      clearCanvas();
      raf = requestAnimationFrame(render);
      // 真實資料請求 debounce：連續拖動只在停下後抓一次，節省 API 額度。
      clearTimeout(loadTimer);
      loadTimer = setTimeout(() => loadField(bounds), 500);
    };

    map.on('movestart', onMoveStart);
    map.on('zoomstart', onMoveStart);
    map.on('moveend', onMoveEnd);
    map.on('zoomend', onMoveEnd);

    const ro = new ResizeObserver(() => {
      if (moving) return;
      resize();
      clearCanvas();
    });
    ro.observe(canvas);

    raf = requestAnimationFrame(render);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      clearTimeout(loadTimer);
      map.off('movestart', onMoveStart);
      map.off('zoomstart', onMoveStart);
      map.off('moveend', onMoveEnd);
      map.off('zoomend', onMoveEnd);
      ro.disconnect();
    };
  }, [map]);

  return (
    <>
      {dataMode === 'owm' && (
        <OwmTileLayer owmLayer={OWM_LAYER.wind} onError={() => fallbackToMockRef.current()} />
      )}
      <canvas ref={canvasRef} className="wind-canvas" />
      <div className={`radar-badge ${dataMode === 'mock' ? 'is-warn' : ''}`}>
        {dataMode === 'live'
          ? '風・即時資料(Open-Meteo 地面 10m)'
          : dataMode === 'owm'
            ? '風・OpenWeatherMap 備援'
            : '風・示意資料(無法連線即時資料)'}
      </div>
    </>
  );
}
