import ASSETS from '../assets';
import Vector2 from './math/vector2';
import Sprite from './sprite';
import Bitmap from './bitmap';
import NPC from '../game/npc';

// TODO: это нужно перенести в другой файл, чтобы отделить данные от движка
const enum WALL_TYPE {
  VOID = -1,
  AIR = 0,
  LEAVES = 1,
  MIO = 2,
};

const WALL_TEXTURE = { };

Object.values(ASSETS.TEXTURES).forEach(t => {
  if (t.wallType) {
    WALL_TEXTURE[t.wallType] = t;
  }
});

class Level {
  size: number;
  walls: Uint8Array;
  sprites: Sprite[];
  npcs: NPC[];
  skybox: Bitmap;

  public static isWallTypeNotVoidOrAir(type: WALL_TYPE): boolean {
    return type !== WALL_TYPE.VOID && type !== WALL_TYPE.AIR;
  }

  constructor(
    size,
    walls = new Uint8Array(size * size),
    npcs = [],
    skybox,
    randomize: boolean = false // TODO: drop?
  ) {
    this.size = size;
    this.walls = walls;
    this.sprites = [];
    this.npcs = npcs;
    this.skybox = skybox;

    if (randomize) {
      this.randomize();
    }
  }

  // возвращает стену
  public getWallType(p: Vector2): WALL_TYPE {
    let x = Math.round(p.x);
    let y = Math.round(p.y);

    if (x < 0 || x > this.size - 1 || y < 0 || y > this.size - 1) {
      return -1;
    };

    let t = this.walls[y * this.size + x];

    if (t === undefined || t === null) {
      return -1;
    } else {
      return t;
    }
  }

  public randomize = function() {
    for (let i = 0; i < this.size * this.size; i++) {
      this.walls[i] = Math.random() < 0.25 ? 1 : 0;
    }
  }
}

export {
  Level as default,
  WALL_TYPE,
  WALL_TEXTURE
};