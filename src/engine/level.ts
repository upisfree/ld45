import ASSETS from '../assets';
import Vector2 from './math/vector2';
import Color from './math/color';
import Sprite from './render/sprite';
import Bitmap from './render/bitmap';
import NPC from '../game/npc';
import Player from '../game/player';
import { WALL_TYPE, WALLS_DATA } from '../game/walls-data';

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
  player: Player;
  skybox: Bitmap;

  public static isWallTypeVoidOrAir(type: WALL_TYPE): boolean {
    return type === WALL_TYPE.VOID || type === WALL_TYPE.AIR;
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

  public update(): void {
    // обновляем физику спрайтов
    this.sprites.forEach(sprite => {
      sprite.collisionWith = null;
      sprite.detectCollisions();
    });

    this.npcs.forEach(npc => npc.update());
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

  public isCollision(p: Vector2): boolean {
    return !Level.isWallTypeVoidOrAir(this.getWallType(p));
  }

  public isNotCollision(p: Vector2): boolean {
    return Level.isWallTypeVoidOrAir(this.getWallType(p));
  }

  public randomize(): void {
    let wallsCount = 6;
    for (let i = 0; i < this.size * this.size; i++) {
      let r = Math.floor(Math.random() * (wallsCount - 0 + 1) + 0);
      let s2 = this.size / 2;

      if (Math.random() > 0.1 || i === s2 * this.size + s2) {
        r = 0;
      }

      this.walls[i] = r;
    }
  }

  public parseFromBitmap(bitmap: Bitmap): void {
    let data = [];

    for (let y = 0; y < bitmap.height; y++) {
      for (let x = 0; x < bitmap.width; x++) {
        let offset = (y * (bitmap.width * 4)) + (x * 4);
        
        let r = bitmap.imageData[offset];
        let g = bitmap.imageData[offset + 1];
        let b = bitmap.imageData[offset + 2];
        let a = bitmap.imageData[offset + 3];
        
        let color = new Color(r, g, b, a);

        WALLS_DATA.forEach(wallData => {
          if (wallData.color.equals(color)) {
            data.push(wallData.code);
          }
        });
      }
    }

    this.size = bitmap.width;
    this.walls = new Uint8Array(data);
  }
}

export {
  Level as default,
  WALL_TEXTURE
};