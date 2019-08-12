import CONFIG from '../config';
import ASSETS from '../assets';
import Vector2 from './math/vector2';
import Angle from './math/angle';
import Color from './math/color';
import gl from './gl';
import Player from '../game/player';
import { default as Level, WALL_TYPE, WALL_TEXTURE } from './level';
import Bitmap from './bitmap';
import { WALL_SIDE } from './const';
import { canvas } from './platform/canvas';

export interface Ray {
  a: Vector2;
  b: Vector2;
  distance: number;
  rotation: number;
  side: WALL_SIDE;
  type: WALL_TYPE;
}

class Camera {
  position: Vector2 = new Vector2(0, 0);
  rotation: number = 0;
  level: Level;
  fov: number;

  zBuffer: Float32Array;

  rays: Ray[] = [];
  rayDistance: number = 15;
  rayStep: number = 0.01;
  raysCount: number = 256;

  rayWidth: number;
  ww: number;
  wh: number;

  nBitmap: Bitmap;
  eBitmap: Bitmap;
  sBitmap: Bitmap;
  wBitmap: Bitmap;

  constructor(
    level: Level,
    fov: number = Math.PI / 4
  ) {
    this.level = level;
    this.fov = fov;

    this.resize();

    if (CONFIG.RENDER_WALL_SIDES_TEXTURES) {
      this.nBitmap = ASSETS.TEXTURES['n'].bitmap;
      this.eBitmap = ASSETS.TEXTURES['e'].bitmap;
      this.sBitmap = ASSETS.TEXTURES['s'].bitmap;
      this.wBitmap = ASSETS.TEXTURES['w'].bitmap;
    }
  }

  public render(): void {
    this.rays = this.getRays();
    this.zBuffer = new Float32Array(this.ww);

    this.drawGround();
    this.drawWalls();
    this.drawSprites();
    this.drawZBuffer();
  }

  public resize(): void {
    this.ww = canvas.width;
    this.wh = canvas.height;
    this.rayWidth = this.ww / this.rays.length;

    this.zBuffer = new Float32Array(this.ww);
  }

  private getRays(): Ray[] {
    let rays: Ray[] = [];

    for (let i = 0; i < this.raysCount; i++) {
      let d: number = -1;
      let s: WALL_SIDE;
      let t: WALL_TYPE = WALL_TYPE.VOID;

      let r: number = Angle.normalize(this.rotation - this.fov / 2 + this.fov * i / this.raysCount);

      let a: Vector2 = new Vector2(
        this.position.x,
        this.position.y
      );

      let b: Vector2 = new Vector2(
        a.x,
        a.y
      );

      // части луча
      for (let j = 0; j < this.rayDistance; j += this.rayStep) {
        // сначала идём вперёд по X и смотрим, есть ли соприкосновение
        b.x = a.x + j * Math.cos(r);
        t = this.level.getWallType(b);

        // запад или восток
        if (Level.isWallTypeNotVoidOrAir(t)) {
          d = j;
          s = (a.x < b.x) ? WALL_SIDE.WEST : WALL_SIDE.EAST; // <= || >= ?

          break;
        };

        // нет соприкосновения? погнали по Y
        b.y = a.y + j * Math.sin(r);
        t = this.level.getWallType(b);

        // север или юг
        if (Level.isWallTypeNotVoidOrAir(t)) {
          d = j;
          s = (a.y < b.y) ? WALL_SIDE.NORTH : WALL_SIDE.SOUTH; // <= || >= ?

          break;
        };
      };

      if (d !== -1) {
        d *= Math.cos(r - this.rotation);
      };

      rays.push({
        a: a,
        b: b,
        distance: d,
        rotation: r,
        side: s,
        type: t
      });
    }

    return rays;
  }

  private drawWalls(): void {
    for (let i = 0; i < this.rays.length; i++) {
      let ray = this.rays[i];

      // заполняем zbuffer — т.к. мы рендерим по одной полоске, его надо вручную продлять
      for (let j = Math.ceil(this.rayWidth * i); j < this.rayWidth * (i + 1); j++) {
        this.zBuffer[j] = ray.distance;
      };

      // если пустота, то не рисуем
      if (ray.distance === -1) {
        continue;
      };

      let bitmap = WALL_TEXTURE[ray.type].bitmap;

      let rotation = ray.rotation;
      let z = ray.distance / this.rayDistance;
      let height = this.wh / ray.distance;

      let fractional;
      let fractionalX = ray.b.x % 1;
      let fractionalY = ray.b.y % 1;

      // понимаем какая стена и в зависимости от этого пользуемся данными от округления
      // позиции падения взгляда, чтобы определить насколько нам нужно сдвинуться в текстуре
      // чтобы получить позицию текстуры полоски
      switch (ray.side) {
        case WALL_SIDE.NORTH:
          if (CONFIG.RENDER_WALL_SIDES_TEXTURES) {
            bitmap = this.nBitmap;
          };

          // инвертируем текстуру
          fractional = 1 - fractionalX;

          break;

        case WALL_SIDE.EAST:
          if (CONFIG.RENDER_WALL_SIDES_TEXTURES) {
            bitmap = this.eBitmap;
          };

          fractional = 1 - fractionalY;

          break;
        
        case WALL_SIDE.SOUTH:
          if (CONFIG.RENDER_WALL_SIDES_TEXTURES) {
            bitmap = this.sBitmap;
          };

          fractional = fractionalX;

          break;

        case WALL_SIDE.WEST:
          if (CONFIG.RENDER_WALL_SIDES_TEXTURES) {
            bitmap = this.wBitmap;
          };

          fractional = fractionalY;

          break;
      };

      // сдвигаем текстуру на половинку
      fractional = (fractional >= 0.5) ? fractional - 0.5 : fractional + 0.5;

      // округляем, чтобы закрыть белые дырки
      let textureX = Math.floor(bitmap.width * fractional);

      gl.drawImage(
        bitmap,
        new Vector2(textureX, 0),
        new Vector2(1, bitmap.height),
        new Vector2(this.rayWidth * i, this.wh / 2 - height / 2),
        new Vector2(this.rayWidth, height),
        0
      );
    }
  }

  private drawSprites(): void {
    // сортируем спрайты по дальности от игрока, чтобы правильно отрисовать
    this.level.sprites.sort((a, b) => {
      return Vector2.distance(this.position, b.position) - Vector2.distance(this.position, a.position);
    });

    for (let i = 0; i < this.level.sprites.length; i++) {
      let sprite = this.level.sprites[i];
      
      let rotation = Math.atan2(sprite.position.y - this.position.y, sprite.position.x - this.position.x);
      let distance = Vector2.distance(this.position, sprite.position);

      if (distance > this.rayDistance) {
        continue;
      };

      // пока исключительно квадратные текстуры
      let width = this.wh / distance;
      let height = this.wh / distance;

      let startX = (rotation - this.rotation) * (this.ww) / (this.fov) + (this.ww) / 2 - width / 2;
      let endX = startX + width;

      let y = this.wh / 2 - height / 2;

      for (let j = startX; j < endX; j += this.rayWidth) {
        let wallStripe = this.zBuffer[Math.ceil(j)];

        // -1 не учитывается
        if (wallStripe !== undefined &&
            wallStripe !== null &&
            wallStripe < distance &&
            wallStripe !== -1
        ) {
          continue;
        };

        let textureX = Math.floor((j - startX) * sprite.bitmap.width / width);

        gl.drawImage(
          sprite.bitmap,
          new Vector2(textureX, 0),
          new Vector2(this.rayWidth, sprite.bitmap.height),
          new Vector2(j, y),
          new Vector2(this.rayWidth, height),
          0
        );
      }
    }
  }

  private drawGround(): void {
    gl.drawGradient(
      new Vector2(0, 0),
      new Vector2(this.ww, this.wh),
      0,
      new Color(1, 1, 1),
      new Color(0, 0, 0)
    );
  }

  private drawZBuffer(): void {
    let h = 15;

    for (let i = 0; i < this.zBuffer.length; i++) {
      let v = this.zBuffer[i] / this.rayDistance;

      gl.drawLine(
        new Vector2(i, this.wh / 2 - h / v),
        new Vector2(i, this.wh / 2 + h / v),
        new Color(v, v, v),
      );
    }
  }
}

export default Camera;