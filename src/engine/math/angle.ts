// спасибо, @davidfig!
// https://github.com/davidfig/angle

import Vector2 from './vector2';

namespace Angle {
  export const PI_2 = Math.PI * 2;

  export const UP = Math.PI / 2;
  export const DOWN = 3 * Math.PI / 2;
  export const LEFT = Math.PI;
  export const RIGHT = 0;

  export const NORTH = UP;
  export const SOUTH = DOWN;
  export const WEST = LEFT;
  export const EAST = RIGHT;

  export function rad2deg(r: number): number {
    return r * (180 / Math.PI);
  }

  export function deg2rad(d: number): number {
    return d * (Math.PI / 180);
  }

  // возвращает нормализованный угол в радианах между (0 — PI × 2)
  export function normalize(a: number): number {
    return a - Angle.PI_2 * Math.floor(a / Angle.PI_2);
  }

  // возвращает нормализованную разницу между двумя углами в радианах
  export function difference(a: number, b: number): number {
    let c = Math.abs(a - b) % Angle.PI_2;

    return c > Math.PI ? (Angle.PI_2 - c) : c;
  }

  // возвращает ближайшую сторону света в радианах
  export function closestCardinal(a: number): number {
    let left = Angle.difference(a, Angle.LEFT);
    let right = Angle.difference(a, Angle.RIGHT);
    let up = Angle.difference(a, Angle.UP);
    let down = Angle.difference(a, Angle.DOWN);
    
    if (left <= right && left <= up && left <= down) {
      return Angle.LEFT;
    } else if (right <= up && right <= down) {
      return Angle.RIGHT;
    } else if (up <= down) {
      return Angle.UP;
    } else {
      return Angle.DOWN;
    }
  }

  // возвращает ближайшую горизонтальную (запад или восток )сторону света в радианах
  export function closestHorizontalCardinal(a: number): number {
    let left = Angle.difference(a, Angle.LEFT);
    let right = Angle.difference(a, Angle.RIGHT);
    
    return (left < right) ? Angle.LEFT : Angle.RIGHT;
  }

  // возвращает ближайшую горизонтальную (запад или восток )сторону света в радианах
  export function closestVerticalCardinal(a: number): number {
    let up = Angle.difference(a, Angle.UP);
    let down = Angle.difference(a, Angle.DOWN);
    
    return (up < down) ? Angle.UP : Angle.DOWN;
  }

  export function betweenTwoPoints(a: Vector2, b: Vector2): number {
    return Angle.normalize(
      Math.atan2(b.y - a.y, b.x - a.x)
    );
  }
}

export default Angle;