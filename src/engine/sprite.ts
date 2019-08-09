import Vector2 from './math/vector2';
import Bitmap from './bitmap';
import Level from './level';

// спрайт — это плоская картинка, которая рисуется всегда лицом к игроку
class Sprite {
  bitmap: Bitmap;
  position: Vector2;
  level: Level;

  constructor(bitmap: Bitmap, position: Vector2, level: Level) {
    this.bitmap = bitmap;
    this.position = position;
    this.level = level;

    this.level.sprites.push(this);
  }
}

export default Sprite;