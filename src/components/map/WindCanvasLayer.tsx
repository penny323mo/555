import { useEffect, useRef } from 'react';
import type { MapBounds } from '@/types';
import { useMap } from '@/hooks/useMap';
import { ParticleEngine } from '@/engine/particleEngine';
import { MockWindProvider } from '@/services/windField/MockWindProvider';
import { COLOR_SCALES, sampleColor } from '@/utils/colorScale';

// 依裝置調整粒子數與解析度，兼顧手機效能。
const PARTICLE_COUNT_DESKTOP = 3000;
const PARTICLE_COUNT_MOBILE = 1000;
// 速度補償基準：在 REF_ZOOM 用 BASE_SPEED，其餘縮放等比調整，
// 使粒子的螢幕移動速度大致不受 zoom 影響。
const REF_ZOOM = 4;
const BASE_SPEED = 0.015;
// 拖尾保留率（destination-in 每幀乘上的 alpha，越接近 1 拖尾越長）。
const FADE_ALPHA = 0.94;
const LINE_WIDTH = 1.3;

// Canvas 風場粒子層：疊在地圖上，粒子以經緯度錨定，每幀投影成螢幕座標繪製。
export function WindCanvasLayer() {
  const map = useMap();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!map || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.matchMedia('(max-width: 640px)').matches;
    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);
    const count = isMobile ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;

    // ── 風場來源：唯一的 Phase 4 替換點（換成真實 provider 即可，引擎不動）。
    const provider = new MockWindProvider();

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

    const bounds0 = toBounds();
    const engine = new ParticleEngine(count, provider.getField(bounds0), bounds0);
    resize();

    let raf = 0;
    let moving = false;

    const speedScale = () => BASE_SPEED * Math.pow(2, REF_ZOOM - map.getZoom());
    const clearCanvas = () => ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    const render = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      // 以 destination-in 乘上 alpha 淡出舊拖尾，不會在地圖上疊加暗色。
      ctx.globalCompositeOperation = 'destination-in';
      ctx.fillStyle = `rgba(0,0,0,${FADE_ALPHA})`;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'source-over';

      engine.step(speedScale());
      ctx.lineWidth = LINE_WIDTH;
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
      raf = requestAnimationFrame(render);
    };

    // 地圖移動 / 縮放期間暫停模擬並清空，避免拖尾錯位拖影。
    const onMoveStart = () => {
      moving = true;
      cancelAnimationFrame(raf);
      raf = 0;
      clearCanvas();
    };
    const onMoveEnd = () => {
      moving = false;
      cancelAnimationFrame(raf); // moveend 與 zoomend 可能同時觸發，先取消避免重複迴圈。
      resize();
      const bounds = toBounds();
      engine.reset(provider.getField(bounds), bounds);
      clearCanvas();
      raf = requestAnimationFrame(render);
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
      cancelAnimationFrame(raf);
      map.off('movestart', onMoveStart);
      map.off('zoomstart', onMoveStart);
      map.off('moveend', onMoveEnd);
      map.off('zoomend', onMoveEnd);
      ro.disconnect();
    };
  }, [map]);

  return <canvas ref={canvasRef} className="wind-canvas" />;
}
