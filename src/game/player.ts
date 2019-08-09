import { DIRECTION, KEY_CODE } from '../engine/const';
import Vector2 from '../engine/math/vector2';
import Angle from '../engine/math/angle';
import Camera from '../engine/camera';

class Player {
  camera: Camera;
  position: Vector2;
  rotation: number = 0; // в радианах

  moveSpeed: number = 0.5;
  rotateSpeed: number = Math.PI / 24;

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

  moveWithKeyboard(event: KeyboardEvent): void {
    let direction;

    switch (event.keyCode) {
      case KEY_CODE.ARROW_UP:
      case KEY_CODE.W:
        direction = DIRECTION.UP;

        break;

      case KEY_CODE.ARROW_LEFT:
      case KEY_CODE.A:
        direction = DIRECTION.LEFT;

        break;

      case KEY_CODE.ARROW_DOWN:
      case KEY_CODE.S:
        direction = DIRECTION.DOWN;

        break;

      case KEY_CODE.ARROW_RIGHT:
      case KEY_CODE.D:
        direction = DIRECTION.RIGHT;

        break;
    }

    if (direction !== undefined) {
      this.move(direction);
    }
  }
}

export default Player;