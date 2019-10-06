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
    let p = this.position.copy();
    let factor = new Vector2(0.005, 0.005);
    let diff = p.sub(this.level.player.position).mult(factor);

    let collisionVector = new Vector2(
      this.position.x - diff.x,
      this.position.y - diff.y
    );

    let t = this.level.getWallType(collisionVector);

    if (this.collisionWith || !Level.isWallTypeVoidOrAir(t)) {
      this.position.add(diff);
    } else {
      this.position.sub(diff);
    }
  }
}

export default NPC;