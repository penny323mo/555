import type { MapBounds, VectorField } from '@/types';

// 純邏輯粒子引擎，不依賴 React 或地圖。
// 粒子以經緯度儲存（保持地理錨定），繪製時由 WindCanvasLayer 投影成螢幕座標。

export interface Particle {
  lng: number;
  lat: number;
  /** 上一幀位置，供繪製拖尾線段使用。 */
  prevLng: number;
  prevLat: number;
  age: number;
  maxAge: number;
  /** 當前風速大小，供上色用。 */
  speed: number;
}

// Web Mercator 可視緯度上限，避免極區投影爆炸。
const MAX_LAT = 85;

function randomInRange(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

export class ParticleEngine {
  private particles: Particle[] = [];
  private field: VectorField;
  private bounds: MapBounds;
  private readonly count: number;

  constructor(count: number, field: VectorField, bounds: MapBounds) {
    this.count = count;
    this.field = field;
    this.bounds = bounds;
    this.reset(field, bounds);
  }

  /** 取得粒子陣列供繪製（唯讀使用）。 */
  getParticles(): readonly Particle[] {
    return this.particles;
  }

  /** 更換風場與範圍，並重新散佈所有粒子。 */
  reset(field: VectorField, bounds: MapBounds): void {
    this.field = field;
    this.bounds = bounds;
    this.particles = Array.from({ length: this.count }, () => this.spawn(true));
  }

  /** 只更新可視範圍（pan/zoom 後），重新散佈粒子。 */
  setBounds(bounds: MapBounds): void {
    this.bounds = bounds;
    for (const p of this.particles) this.respawn(p);
  }

  /**
   * 推進一幀。speedScale 由呼叫端依縮放等級給定，
   * 使粒子在不同 zoom 下的螢幕移動速度大致一致。
   */
  step(speedScale: number): void {
    for (const p of this.particles) {
      p.prevLng = p.lng;
      p.prevLat = p.lat;

      const { u, v } = this.field.getVector(p.lng, p.lat);
      p.speed = Math.hypot(u, v);

      const latRad = (p.lat * Math.PI) / 180;
      const cosLat = Math.max(0.1, Math.cos(latRad));
      p.lng += (u * speedScale) / cosLat;
      p.lat += v * speedScale;
      p.age += 1;

      if (p.age >= p.maxAge || !this.inBounds(p.lng, p.lat)) {
        this.respawn(p);
      }
    }
  }

  private inBounds(lng: number, lat: number): boolean {
    const b = this.bounds;
    return lng >= b.west && lng <= b.east && lat >= b.south && lat <= b.north;
  }

  private spawn(randomAge: boolean): Particle {
    const b = this.bounds;
    const lng = randomInRange(b.west, b.east);
    const lat = randomInRange(
      Math.max(b.south, -MAX_LAT),
      Math.min(b.north, MAX_LAT),
    );
    const maxAge = Math.round(randomInRange(60, 160));
    return {
      lng,
      lat,
      prevLng: lng,
      prevLat: lat,
      // 初始化時隨機分散壽命，避免粒子同時重生造成閃爍。
      age: randomAge ? Math.round(Math.random() * maxAge) : 0,
      maxAge,
      speed: 0,
    };
  }

  /** 將既有粒子重置到範圍內的新位置（prev 設為同點，避免拉出長線）。 */
  private respawn(p: Particle): void {
    const fresh = this.spawn(false);
    p.lng = fresh.lng;
    p.lat = fresh.lat;
    p.prevLng = fresh.lng;
    p.prevLat = fresh.lat;
    p.age = 0;
    p.maxAge = fresh.maxAge;
  }
}
