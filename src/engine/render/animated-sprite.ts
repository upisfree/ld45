import Sprite from './sprite';
import Vector2 from '../math/vector2';
import Bitmap from './bitmap';
import Level from '../level';
import Player from '../../game/player';

class AnimatedSprite extends Sprite {
  bitmap: Bitmap;

  width: Bitmap;
  height: Bitmap;

  constructor(bitmap: Bitmap, width: number, height: number, position: Vector2, level: Level) {
    super(bitmap, position, level);

    this.width = width;
    this.height = height;
  }
}

export default AnimatedSprite;