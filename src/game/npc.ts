import Angle from '../engine/math/angle';
import Vector2 from '../engine/math/vector2';
import Bitmap from '../engine/render/bitmap';
import Sprite from '../engine/render/sprite';
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
    let collisionVector = new Vector2(
      this.position.x + (this.moveSpeed + 0.75) * Math.cos(this.rotation),
      this.position.y + (this.moveSpeed + 0.75) * Math.sin(this.rotation)
    );

    let v = new Vector2(
      this.position.x + this.moveSpeed * Math.cos(this.rotation),
      this.position.y + this.moveSpeed * Math.sin(this.rotation)
    );

    let t = this.level.getWallType(collisionVector);

    if (this.collisionWith || !Level.isWallTypeVoidOrAir(t)) {
      this.rotation += Math.random() * Math.PI * 2;
      this.rotation = Angle.normalize(this.rotation);
    }

    this.position = v;
  }
}

export default NPC;