import type { MapBounds, VectorField } from '@/types';

// 將格點取樣（風速 + 風向）轉成可雙線性插值的向量場。
// samples 順序須為：j（緯度，由南到北）為外層、i（經度，由西到東）為內層。
export function buildWindField(
  samples: { speed: number; dir: number }[],
  bounds: MapBounds,
  grid: number,
): VectorField {
  const { west, south, east, north } = bounds;
  const dLng = (east - west) / (grid - 1);
  const dLat = (north - south) / (grid - 1);

  // 風向為氣象慣例（風的來向），轉成 u（東為正）/ v（北為正）分量。
  const u = new Float32Array(grid * grid);
  const v = new Float32Array(grid * grid);
  for (let k = 0; k < samples.length; k++) {
    const rad = (samples[k].dir * Math.PI) / 180;
    u[k] = -samples[k].speed * Math.sin(rad);
    v[k] = -samples[k].speed * Math.cos(rad);
  }

  const idx = (i: number, j: number) => j * grid + i;
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  return {
    bounds,
    getVector(lng: number, lat: number) {
      const fi = Math.min(grid - 1, Math.max(0, (lng - west) / dLng));
      const fj = Math.min(grid - 1, Math.max(0, (lat - south) / dLat));
      const i0 = Math.floor(fi);
      const j0 = Math.floor(fj);
      const i1 = Math.min(grid - 1, i0 + 1);
      const j1 = Math.min(grid - 1, j0 + 1);
      const ti = fi - i0;
      const tj = fj - j0;

      const ub = lerp(
        lerp(u[idx(i0, j0)], u[idx(i1, j0)], ti),
        lerp(u[idx(i0, j1)], u[idx(i1, j1)], ti),
        tj,
      );
      const vb = lerp(
        lerp(v[idx(i0, j0)], v[idx(i1, j0)], ti),
        lerp(v[idx(i0, j1)], v[idx(i1, j1)], ti),
        tj,
      );
      return { u: ub, v: vb };
    },
  };
}
