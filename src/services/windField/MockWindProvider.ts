import type { MapBounds, VectorField } from '@/types';
import type { WindFieldProvider } from './WindFieldProvider';

// 以數學函數合成的風場：多組正弦疊加產生流動 / 漩渦感。
// 視覺用途，數值大致落在 ±12 m/s，與真實風場介面相同，方便 Phase 4 直接替換。
export class MockWindProvider implements WindFieldProvider {
  getField(bounds: MapBounds): VectorField {
    return {
      bounds,
      getVector(lng: number, lat: number) {
        const u =
          Math.sin(lat * 0.22) * 7 +
          Math.cos(lng * 0.16) * 4 +
          Math.sin((lng + lat) * 0.08) * 3;
        const v =
          Math.cos(lng * 0.2) * 7 +
          Math.sin(lat * 0.18) * 4 +
          Math.cos((lng - lat) * 0.09) * 3;
        return { u, v };
      },
    };
  }
}
