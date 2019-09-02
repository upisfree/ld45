import Angle from '../engine/math/angle';
import Vector2 from '../engine/math/vector2';
import Bitmap from '../engine/bitmap';
import Sprite from '../engine/sprite';
import Level from '../engine/level';

class NPC extends Sprite {
  rotation: number;
  moveSpeed: number;

  constructor(bitmap: Bitmap, position: Vector2, level: Level) {
    super(bitmap, position, level);

    this.rotation = Math.random() * Math.PI * 2;
    this.moveSpeed = Math.random() / 15;

    this.level.npcs.push(this);
  }

  update() {
    let v = new Vector2(
      this.position.x + this.moveSpeed * Math.cos(this.rotation),
      this.position.y + this.moveSpeed * Math.sin(this.rotation)
    );

    let t = this.level.getWallType(v);

    if (this.collisionWith || !Level.isWallTypeVoidOrAir(t)) {
      this.rotation += Math.random() * Math.PI * 2;
      this.rotation = Angle.normalize(this.rotation);
    }

    this.position = v;
  }
}

export default NPC;