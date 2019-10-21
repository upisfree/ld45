import CONFIG from '../../config';
import ASSETS from '../../assets';
import Vector2 from '../math/vector2';
import Angle from '../math/angle';
import Color from '../math/color';
import gl from './gl';
import Player from '../../game/player';
import NPC from '../../game/npc';
import { default as Level, WALL_TEXTURE } from '../level';
import Bitmap from './bitmap';
import Sprite from './sprite';
import { CARDINAL } from '../const';
import { canvas } from '../platform/canvas';
import { WALL_TYPE } from '../../game/walls-data';
import touch from '../platform/touch';

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
  minSpriteDistance: number = 0.01;

  zBuffer: Float32Array;

  rays: Ray[] = [];
  rayDistance: number = 15;
  rayStep: number = 0.01;
  raysCount: number = 128;

  rayWidth: number;
  ww: number; // window width
  wh: number; // window height

  gunOffset = 0;

  constructor(
    level: Level,
    fov: number = Math.PI / 2
  ) {
    this.level = level;
    this.fov = fov;

    this.resize();
  }

  public render(): void {
    this.castRays();
    this.zBuffer = new Float32Array(this.ww);

    this.renderGround();
    this.renderSkybox();
    this.renderWalls();
    // this.renderFloor();
    this.renderNPCs();
    this.renderGun();
    // this.renderZBuffer();

    this.postProcess();

    if ((<any>window).isMobile) {
      this.renderTouchControls();      
    }
  }

  private renderGun(): void {
    let bitmap = ASSETS.TEXTURES['gun'].bitmap;

    if ((<any>window).isMobile) {
      this.gunOffset -= 15;
    } else {
      this.gunOffset -= 20;      
    }


    if (this.gunOffset < 0) {
      this.gunOffset = 0;
    }

    let now = Date.now();

    let w = this.ww / 3.5;
    let h = w;
    let x = (this.ww + 50) - w + this.heightOffset / 2.5 - this.gunOffset + (Math.cos(now / 500) * 15);
    let y = (this.wh + 50) - h + this.heightOffset * 1 - this.gunOffset + (Math.cos(now / 500) * 20);

    if ((<any>window).isMobile) {
      h = this.wh / 4;
      w = h;
      x = (this.ww + 10) - w + this.heightOffset / 2.5 - this.gunOffset / 2 + (Math.cos(now / 500) * 15);
      y = (this.wh - 20) - h + this.heightOffset * 1 - this.gunOffset / 1.25 + (Math.cos(now / 500) * 20);      
    }

    gl.drawImage(
      bitmap,
      new Vector2(0, 0),
      new Vector2(bitmap.width, bitmap.height),
      new Vector2(x, y),
      new Vector2(w, h),
      Math.PI / (16 - Math.cos(now / 500) * 5)
    );
  }

  private postProcess(): void {
    let a = 255 - this.level.player.health / 100 * 255;

    gl.drawRect(
      new Vector2(0, 0),
      new Vector2(this.ww, this.wh),
      new Color(160 * Math.random(), 0, 0, a * 4)
    );
  }

  // private renderFloor(): void {
  //   // TODO: в один луп пробежку по лучам
  //   for (let i = 0; i < this.rays.length; i++) {
  //     this.renderFloorStripe(this.rays[i]);
  //   }
  // }

  // private renderFloorStripe(ray: Ray): void {
  //   let floorBitmap = ASSETS.TEXTURES['floor'].bitmap;
  //   let wallHeight = this.wh / ray.distance;
  //   let floorHeight;
  //   let drawX = this.rayWidth * ray.index;
  //   let drawY;
    
  //   if (ray.distance !== -1) {
  //     floorHeight = (this.wh - this.wh / ray.distance) / 2 - this.heightOffset;
  //     drawY = this.wh / 2 + wallHeight / 2 + this.heightOffset;
  //   } else {
  //     // если рисуем пол для пустоты
  //     floorHeight = this.wh / 2 - this.heightOffset;
  //     drawY = this.wh / 2 + this.heightOffset;
  //   }

  //   gl.drawImage(
  //     floorBitmap,
  //     new Vector2(0, 0),
  //     new Vector2(floorBitmap.width, floorBitmap.height),
  //     new Vector2(600, 500),
  //     new Vector2(50, 50),
  //     3
  //   );

  //   // gl.drawRect(
  //   //   new Vector2(drawX, drawY),
  //   //   new Vector2(this.rayWidth, floorHeight),
  //   //   new Color(255 * Math.random(), 255 * Math.random(), 255 * Math.random())
  //   // );
  // }

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

  private renderWalls(): void {
    for (let i = 0; i < this.rays.length; i++) {
      this.renderWallStripe(this.rays[i]);
    }
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
        // инвертируем текстуру
        fractional = 1 - fractionalX;

        break;

      case CARDINAL.EAST:
        fractional = 1 - fractionalY;

        break;
      
      case CARDINAL.SOUTH:
        fractional = fractionalX;

        break;

      case CARDINAL.WEST:
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

    let start = Math.floor(this.rayWidth * ray.index);
    let end = this.rayWidth * (ray.index + 1);
    let width = Math.floor(end - start);

    if (CONFIG.LIGHTING_FAKE_CONTRAST && (ray.side === CARDINAL.WEST || ray.side === CARDINAL.EAST)) {
      let color = new Color(0, 0, 0, 128);

      gl.drawRect(
        new Vector2(start, y),
        new Vector2(width, height),
        color
      );
    }

    if (CONFIG.FOG) {
      let color = CONFIG.FOG_COLOR;
      color.a = 255 * z * CONFIG.FOG_FACTOR;

      gl.drawRect(
        new Vector2(start, y),
        new Vector2(width, height),
        color
      );
    }
  }

  private renderNPC(sprite: NPC): void {
    let rotation = Angle.betweenTwoPoints(this.position, sprite.position);
    let distance = Vector2.distance(this.position, sprite.position);

    if (distance > this.rayDistance) {
      return;
    }

    // чтобы на ноль тут не делить
    if (distance < this.minSpriteDistance) {
      distance = this.minSpriteDistance;
    }

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

    // не рисуем спрайты, которые не в поле зрения камеры
    let fov2 = this.fov / 2;

    if (r <= -fov2 || r >= fov2) {
      return;
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

      let textureX = sprite.frame * sprite.frameWidth + Math.floor((j - startX) * sprite.frameWidth / width);

      gl.drawImage(
        sprite.bitmap,
        new Vector2(textureX, 0),
        new Vector2(1, sprite.bitmap.height),
        new Vector2(j, y),
        new Vector2(this.rayWidth, height)
      );

      // if (CONFIG.FOG) {
      //   let z = distance / this.rayDistance;

      //   let color = CONFIG.FOG_COLOR;
      //   color.a = 255 * z * CONFIG.FOG_FACTOR;

      //   gl.drawRect(
      //     new Vector2(j, y),
      //     new Vector2(this.rayWidth, height),
      //     color
      //   );
      // }
    }
  }

  private renderNPCs(): void {
    this.sortSprites();

    for (let i = 0; i < this.level.npcs.length; i++) {
      this.renderNPC(this.level.npcs[i]);
    }
  }

  // сортируем спрайты по дальности от игрока, чтобы правильно отрисовать
  private sortSprites(): void {
    this.level.sprites.sort((a, b) => {
      return Vector2.distance(this.position, b.position) - Vector2.distance(this.position, a.position);
    });
  }

  private renderGround(): void {
    gl.drawRect(
      new Vector2(0, 0),
      new Vector2(this.ww, this.wh),
      new Color(0, 0, 0)
    );

    // gl.drawGradient(
    //   new Vector2(0, 0),
    //   new Vector2(this.ww, this.wh),
    //   0,
    //   new Color(255, 255, 255),
    //   new Color(0, 0, 0)
    // );
  }

  private renderSkybox(): void {
    let skybox = this.level.skybox;
    let w = skybox.width * (this.wh / skybox.height) * 2;
    let h = this.wh / 2 + this.heightOffset;
    let x = (this.rotation / Math.PI / 2) * -w;
    let y = 0;

    gl.drawImage(
      skybox,
      new Vector2(0, 0),
      new Vector2(skybox.width, skybox.height),
      new Vector2(x, y),
      new Vector2(w, h)
    );

    // если нужно повторить скайбокс
    if (x < w - this.ww) {
      gl.drawImage(
        skybox,
        new Vector2(0, 0),
        new Vector2(skybox.width, skybox.height),
        new Vector2(x + w, y),
        new Vector2(w, h)
      );
    }

    gl.drawRect(
      new Vector2(0, 0),
      new Vector2(this.ww, h),
      new Color(0, 0, 0, Math.random() * 256)
    );
  }

  private renderTouchControls() {
    let d = touch.distance;

    if (d > 100) {
      d = 100;
    }

    gl.drawArc(touch.start, d, 10, new Color(255, 255, 255, 128));
  }

  private renderZBuffer(): void {
    let h = 15;

    for (let i = 0; i < this.zBuffer.length; i++) {
      if (this.zBuffer[i] === -1) {
        continue;
      }

      let v = this.zBuffer[i] / this.rayDistance;
      let c = v * 255;

      gl.drawLine(
        new Vector2(i, this.wh / 2 + this.heightOffset - h / v),
        new Vector2(i, this.wh / 2 + this.heightOffset + h / v),
        new Color(c, c, c),
      );
    }
  }
}

export default Camera;