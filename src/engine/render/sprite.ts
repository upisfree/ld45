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
  collisionTriggerDistance: number = 1;

  constructor(bitmap: Bitmap, position: Vector2, level: Level) {
    this.bitmap = bitmap;
    this.position = position;
    this.level = level;

    this.level.sprites.push(this);
  }

  // пока только игрок
  public detectCollisions(): void {
    let distance = Vector2.distance(this.position, this.level.player.position);

    if (distance <= this.collisionTriggerDistance) {
      this.onCollision(this.level.player);
    }
  }

  public onCollision(trigger: Sprite | Player): void {
    this.collisionWith = trigger;
  }
}

export default Sprite;