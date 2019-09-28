import Vector2 from '../math/vector2';
import Bitmap from './bitmap';
import Level from '../level';
import Player from '../../game/player';

// спрайт — это плоская картинка, которая рисуется всегда лицом к игроку
class Sprite {
  bitmap: Bitmap;
  position: Vector2;
  level: Level;

  collisionWith: Sprite | Player;
  collisionTriggerDistance: number = 0.5;

  constructor(bitmap: Bitmap, position: Vector2, level: Level) {
    this.bitmap = bitmap;
    this.position = position;
    this.level = level;

    this.level.sprites.push(this);
  }

  // public render(): void {

  // }

  public detectCollisions(): void {
    for (let i = 0; i < this.level.sprites.length; i++) {
      let sprite = this.level.sprites[i];

      if (this === sprite) {
        continue;
      }

      let distance = Vector2.distance(this.position, sprite.position);

      if (distance <= this.collisionTriggerDistance) {
        this.onCollision(sprite);
      }
    }

    // let distance = Vector2.distance(this.position, player);

    // if (distance <= this.collisionTriggerDistance) {
    //   this.onCollision(player);
    // }
  }

  public onCollision(sprite: Sprite): void {
    this.collisionWith = sprite;
  }
}

export default Sprite;