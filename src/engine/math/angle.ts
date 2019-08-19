import Vector2 from './vector2';

namespace Angle {
  export const PI_2 = Math.PI * 2;

  export function rad2deg(r: number): number {
    return r * (180 / Math.PI);
  }

  export function deg2rad(d: number): number {
    return d * (Math.PI / 180);
  }

  // возвращает нормализованный угол в радианах между (0 — PI × 2)
  export function normalize(r: number): number {
    return r - Angle.PI_2 * Math.floor(r / Angle.PI_2);
  }

  export function betweenTwoPoints(a: Vector2, b: Vector2): number {
    return Angle.normalize(
      Math.atan2(b.y - a.y, b.x - a.x)
    );
  }
}

export default Angle;