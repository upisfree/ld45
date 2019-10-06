import Color from '../engine/math/color';

const enum WALL_TYPE {
  VOID = -1,
  AIR = 0,
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
  SIX = 6,
};

const WALLS_DATA = [
  {
    name: 'air',
    code: WALL_TYPE.AIR,
    color: new Color(0, 0, 0, 0)
  },
  {
    name: 'wall-1',
    code: WALL_TYPE.ONE,
    color: new Color(0, 0, 0, 255)
  },
  {
    name: 'wall-2',
    code: WALL_TYPE.TWO,
    color: new Color(255, 0, 0, 255)
  },
  {
    name: 'wall-3',
    code: WALL_TYPE.THREE,
    color: new Color(255, 0, 0, 255)
  },
  {
    name: 'wall-4',
    code: WALL_TYPE.FOUR,
    color: new Color(255, 0, 0, 255)
  },
  {
    name: 'wall-5',
    code: WALL_TYPE.FIVE,
    color: new Color(255, 0, 0, 255)
  },
  {
    name: 'wall-6',
    code: WALL_TYPE.SIX,
    color: new Color(255, 0, 0, 255)
  }
];

export {
  WALL_TYPE,
  WALLS_DATA
};