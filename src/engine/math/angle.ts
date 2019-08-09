namespace Angle {
  export function rad2deg(r: number) {
    return r * (180 / Math.PI);
  }

  export function deg2rad(d: number) {
    return d * (Math.PI / 180);
  }

  export function normalize(r: number) {
    return Math.atan2(Math.sin(r), Math.cos(r));
  }
}

export default Angle;