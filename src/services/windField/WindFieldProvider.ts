import type { MapBounds, VectorField } from '@/types';

// 風場資料來源的統一介面（策略模式）。
// MockWindProvider 同步回傳；真實 provider（Phase 4）可回傳 Promise。
export interface WindFieldProvider {
  getField(bounds: MapBounds): VectorField | Promise<VectorField>;
}
