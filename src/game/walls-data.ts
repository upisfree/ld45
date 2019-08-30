import Color from '../engine/math/color';

const enum WALL_TYPE {
  VOID = -1,
  AIR = 0,
  LEAVES = 1,
  MIO = 2,
};

const WALLS_DATA = [
  // {
  //   name: 'void',
  //   code: WALL_TYPE.VOID,
  //   color: new Color(0, 0, 0, 0)
  // },
  {
    name: 'air',
    code: WALL_TYPE.AIR,
    color: new Color(0, 0, 0, 0)
  },
  {
    name: 'leaves',
    code: WALL_TYPE.LEAVES,
    color: new Color(0, 0, 0, 255)
  },
  {
    name: 'mio',
    code: WALL_TYPE.MIO,
    color: new Color(255, 0, 0, 255)
  },
];

export {
  WALL_TYPE,
  WALLS_DATA
};