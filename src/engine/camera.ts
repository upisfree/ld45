import CONFIG from '../config';
import ASSETS from '../assets';
import Vector2 from './math/vector2';
import Angle from './math/angle';
import Color from './math/color';
import gl from './gl';
import Player from '../game/player';
import { default as Level, WALL_TEXTURE } from './level';
import Bitmap from './bitmap';
import Sprite from './sprite';
import { CARDINAL } from './const';
import { canvas } from './platform/canvas';
import WALL_TYPE from '../game/wall-types';


export interface Ray {
  a: Vector2;
  b: Vector2;
  distance: number;
  rotation: number;
  side: CARDINAL;
  type: WALL_TYPE;
  index: number;
}

class Camera {
  position: Vector2 = new Vector2(0, 0);
  heightOffset: number = 0;
  rotation: number = 0;
  level: Level;
  fov: number;

  zBuffer: Float32Array;

  rays: Ray[] = [];
  rayDistance: number = 15;
  rayStep: number = 0.01;
  raysCount: number = 128;

  rayWidth: number;
  ww: number; // window width
  wh: number; // window height

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
    this.castRays();
    this.zBuffer = new Float32Array(this.ww);

    // this.renderGround();
    // this.renderSkybox();
    this.renderWallsStripes();
    this.renderSprites();
    // this.renderZBuffer();
  }

  public resize(): void {
    this.ww = canvas.width;
    this.wh = canvas.height;
    this.rayWidth = this.ww / this.rays.length;

    this.zBuffer = new Float32Array(this.ww);
  }

  private castRays(): void {
    this.rays = [];

    for (let i = 0; i < this.raysCount; i++) {
      let d: number = -1;
      let s: CARDINAL;
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
        if (!Level.isWallTypeVoidOrAir(t)) {
          d = j;
          s = (a.x < b.x) ? CARDINAL.WEST : CARDINAL.EAST; // <= || >= ?

          break;
        };

        // нет соприкосновения? погнали по Y
        b.y = a.y + j * Math.sin(r);
        t = this.level.getWallType(b);

        // север или юг
        if (!Level.isWallTypeVoidOrAir(t)) {
          d = j;
          s = (a.y < b.y) ? CARDINAL.NORTH : CARDINAL.SOUTH; // <= || >= ?

          break;
        };
      };

      if (d !== -1) {
        d *= Math.cos(r - this.rotation);
      };

      this.rays.push({
        a: a,
        b: b,
        distance: d,
        rotation: r,
        side: s,
        type: t,
        index: i
      });
    }
  }

  // заполняем zbuffer — т.к. мы рендерим по одной полоске, его надо вручную продлять
  private fillWallStripeZBuffer(ray: Ray): void {
    let start = Math.ceil(this.rayWidth * ray.index);
    let end = this.rayWidth * (ray.index + 1);

    for (let j = start; j < end; j++) {
      this.zBuffer[j] = ray.distance;
    };
  }

  private renderWallStripe(ray: Ray): void {
    this.fillWallStripeZBuffer(ray);

    // если пустота, то не рисуем
    if (ray.distance === -1) {
      return;
    };

    let bitmap = WALL_TEXTURE[ray.type].bitmap;

    let rotation = ray.rotation;
    let height = this.wh / ray.distance;
    let z = ray.distance / this.rayDistance;
    let y = this.wh / 2 - height / 2 + this.heightOffset;

    let fractional;
    let fractionalX = ray.b.x % 1;
    let fractionalY = ray.b.y % 1;

    // понимаем какая стена и в зависимости от этого пользуемся данными от округления
    // позиции падения взгляда, чтобы определить насколько нам нужно сдвинуться в текстуре
    // чтобы получить позицию текстуры полоски
    switch (ray.side) {
      case CARDINAL.NORTH:
        if (CONFIG.RENDER_WALL_SIDES_TEXTURES) {
          bitmap = this.nBitmap;
        };

        // инвертируем текстуру
        fractional = 1 - fractionalX;

        break;

      case CARDINAL.EAST:
        if (CONFIG.RENDER_WALL_SIDES_TEXTURES) {
          bitmap = this.eBitmap;
        };

        fractional = 1 - fractionalY;

        break;
      
      case CARDINAL.SOUTH:
        if (CONFIG.RENDER_WALL_SIDES_TEXTURES) {
          bitmap = this.sBitmap;
        };

        fractional = fractionalX;

        break;

      case CARDINAL.WEST:
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
      new Vector2(this.rayWidth * ray.index, y),
      new Vector2(this.rayWidth, height)
    );

    // if (fog) {
    // gl.drawRect(
    //   new Vector2(this.rayWidth * i, this.wh / 2 - height / 2),
    //   new Vector2(this.rayWidth + 10, height),
    //   0,
    //   new Color(1, 1, 1, z + 0.35)
    // );
  }

  private renderWallsStripes(): void {
    for (let i = 0; i < this.rays.length; i++) {
      this.renderWallStripe(this.rays[i]);
    }
  }

  private renderSprite(sprite: Sprite): void {
    let rotation = Angle.betweenTwoPoints(this.position, sprite.position);
    let distance = Vector2.distance(this.position, sprite.position);

    if (distance > this.rayDistance) {
      return;
    };

    // пока исключительно квадратные текстуры
    let width = this.wh / distance;
    let height = this.wh / distance;

    let r = rotation - this.rotation;

    // обычно, разница между поворотом спрайта и камеры лежит между -1 и 1.
    // но если смотреть на спрайт с западной стороны, мы попадаем на тот момент,
    // когда поворот камеры превышает PI_2 и становится 0 (т.к. мы его нормализуем между 0 и PI_2)
    // и разница между поворотом спрайта и камеры зашкаливает, и вычисляются неправильные экранные координаты.
    // исправляем это, нивелируя нормализацию поворота камеры.
    // конечно, можно с этим не париться, используя матрицу преобразования (и там фишай вроде бы чинится), но это на будущее
    // https://lodev.org/cgtutor/raycasting3.html
    if (r > 1) {
      r -= Angle.PI_2;
    } else if (r < -1) {
      r += Angle.PI_2;
    }

    let startX = (r) * (this.ww) / (this.fov) + (this.ww) / 2 - width / 2;
    let endX = startX + width;

    let y = this.wh / 2 - height / 2 + this.heightOffset;

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
        new Vector2(1, sprite.bitmap.height),
        new Vector2(j, y),
        new Vector2(this.rayWidth, height)
      );
    }
  }

  private renderSprites(): void {
    this.sortSprites();

    for (let i = 0; i < this.level.sprites.length; i++) {
      this.renderSprite(this.level.sprites[i]);
    }
  }

  // сортируем спрайты по дальности от игрока, чтобы правильно отрисовать
  private sortSprites(): void {
    this.level.sprites.sort((a, b) => {
      return Vector2.distance(this.position, b.position) - Vector2.distance(this.position, a.position);
    });
  }

  private renderGround(): void {
    gl.drawGradient(
      new Vector2(0, 0),
      new Vector2(this.ww, this.wh),
      0,
      new Color(1, 1, 1),
      new Color(0, 0, 0)
    );
  }

  private renderSkybox(): void {
    let scaleFactor = 4;
    let skybox = this.level.skybox;

    // let x = this.ww * this.rotation;
    let x = Math.abs(this.rotation / Math.PI * 2) * -skybox.width;
    let w = skybox.width * (this.wh / skybox.height) * 2;

    if (x > w - this.ww) {
      x += w;
    }

    // console.log(x, skybox.width);

    gl.drawImage(
      skybox,
      new Vector2(x, 0),
      new Vector2(skybox.width, skybox.height),
      new Vector2(0, 0),
      new Vector2(this.ww, this.wh / 2)
    );
  }

  private renderZBuffer(): void {
    let h = 15;

    for (let i = 0; i < this.zBuffer.length; i++) {
      if (this.zBuffer[i] === -1) {
        continue;
      }

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