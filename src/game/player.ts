import { DIRECTION, KEY_CODE } from '../engine/const';
import Vector2 from '../engine/math/vector2';
import Angle from '../engine/math/angle';
import Camera from '../engine/camera';
import keyboard from '../engine/platform/keyboard';
import mouse from '../engine/platform/mouse';

class Player {
  camera: Camera;
  position: Vector2;
  rotation: number = 0; // в радианах

  moveSpeed: number = 0.05;
  rotateSpeed: number = Math.PI / 128;

  constructor(
    camera: Camera,
    position: Vector2 = new Vector2(0, 0),
    rotation: number = 0
  ) {
    this.camera = camera;
    this.position = position;
    this.rotation = rotation;
  }

  move(direction: DIRECTION): void {
    let v;
    let isCollision = false; // TODO: пока нет проверки на столкновение

    switch (direction) {
      case DIRECTION.UP:
        v = new Vector2(
          this.position.x + this.moveSpeed * Math.cos(this.rotation), // +
          this.position.y + this.moveSpeed * Math.sin(this.rotation)  // -
        );

        if (!isCollision) {
          this.position = v;
        }

        break;

      case DIRECTION.LEFT:
        this.rotation -= this.rotateSpeed;

        break;

      case DIRECTION.DOWN:
        v = new Vector2(
          this.position.x - this.moveSpeed * Math.cos(this.rotation), // -
          this.position.y - this.moveSpeed * Math.sin(this.rotation)  // +
        );

        if (!isCollision) {
          this.position = v;
        }

        break;

      case DIRECTION.RIGHT:
        this.rotation += this.rotateSpeed;

        break;
    }

    this.camera.position = this.position;
    this.camera.rotation = Angle.normalize(this.rotation);
  }

  onKeyboardTick(): void {
    // TODO: check indexOf vs. includes perfomance?
    // как тут покрасивше организвовать код?
    if (keyboard.keyCodes.includes(KEY_CODE.ARROW_UP) || keyboard.keyCodes.includes(KEY_CODE.W)) {
      this.move(DIRECTION.UP);
    }

    if (keyboard.keyCodes.includes(KEY_CODE.ARROW_LEFT) || keyboard.keyCodes.includes(KEY_CODE.A)) {
      this.move(DIRECTION.LEFT);
    }

    if (keyboard.keyCodes.includes(KEY_CODE.ARROW_DOWN) || keyboard.keyCodes.includes(KEY_CODE.S)) {
      this.move(DIRECTION.DOWN);
    }

    if (keyboard.keyCodes.includes(KEY_CODE.ARROW_RIGHT) || keyboard.keyCodes.includes(KEY_CODE.D)) {
      this.move(DIRECTION.RIGHT);
    }
  }

  onMouseTick(): void {
    if (mouse.movementX > 0) {
      this.move(DIRECTION.RIGHT);
    } else if (mouse.movementX < 0) {
      this.move(DIRECTION.LEFT);
    }
  }
}

export default Player;