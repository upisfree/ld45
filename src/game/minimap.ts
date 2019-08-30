import Vector2 from '../engine/math/vector2';
import Color from '../engine/math/color';
import gl from '../engine/gl';
import { default as Level, WALL_TEXTURE } from '../engine/level';
import { WALL_TYPE } from './walls-data';
import Camera from '../engine/camera';

export default class Minimap {
  level: Level;
  camera: Camera;
  scale: Vector2;

  rayColor: Color = new Color(0, 255, 0);
  minimapPosition: Vector2 = new Vector2(10, 10);

  constructor(
    level: Level,
    camera: Camera,
    scale: Vector2 = new Vector2(1, 1)
  ) {
    this.level = level;
    this.camera = camera;
    this.scale = scale;
  }

  public render(): void {
    this.drawWalls();
    this.drawCamera();
    this.drawSprites();
  }

  private drawWalls(): void {
    for (let y = 0; y < this.level.size; y++) {
      for (let x = 0; x < this.level.size; x++) {
        let position = new Vector2(x, y);
        let type = this.level.getWallType(position);

        if (!Level.isWallTypeVoidOrAir(type)) {
          let bitmap = WALL_TEXTURE[type].bitmap;

          gl.drawImage(
            bitmap,
            new Vector2(0, 0),
            new Vector2(bitmap.width, bitmap.height),
            this.getEnityPosition(position, this.scale),
            this.scale
          );
        }
      }
    }
  }

  private drawSprites(): void {
    for (let i = 0; i < this.level.sprites.length; i++) {
      let sprite = this.level.sprites[i];
      let position = new Vector2(sprite.position.x, sprite.position.y);

      gl.drawImage(
        sprite.bitmap,
        new Vector2(0, 0),
        new Vector2(sprite.bitmap.width, sprite.bitmap.height),
        this.getEnityPosition(position, this.scale),
        this.scale
      );
    }
  }

  private drawCamera(): void {
    let rays = this.camera.rays;

    for (let i = 0; i < rays.length; i++) {
      let p1 = this.getEnityPosition(rays[i].a);
      let p2 = this.getEnityPosition(rays[i].b);

      gl.drawLine(p1, p2, this.rayColor);
    }    
  }

  private getEnityPosition(position: Vector2, size: Vector2 = null): Vector2 {
    let p = new Vector2(this.minimapPosition.x + position.x * this.scale.x,
                        this.minimapPosition.y + position.y * this.scale.y);

    if (size) {
      p = p.sub(new Vector2(size.width / 2, size.height / 2));
    }

    return p;
  }
}