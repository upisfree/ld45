import { DIRECTION, KEY_CODE } from '../engine/const';
import Vector2 from '../engine/math/vector2';
import Angle from '../engine/math/angle';
import Camera from '../engine/camera';
import keyboard from '../engine/platform/keyboard';
import mouse from '../engine/platform/mouse';

class Player {
  camera: Camera;
  position: Vector2;
  rotation: number = 0;

  moveSpeed: number = 0.05;
  rotateSpeed: number = Math.PI / 128;
  noddlingStabilizationSpeed: number = 20;
  noddlingFrequency: number = 100;
  noddlingForce: number = 0;

  // moveSpeed: number = 0.1;
  // rotateSpeed: number = Math.PI / 64;
  // noddlingStabilizationSpeed: number = 20;
  // noddlingFrequency: number = 100;
  // noddlingForce: number = 6;

  isMoving: boolean = false;

  constructor(
    camera: Camera,
    position: Vector2 = new Vector2(0, 0),
    rotation: number = 0
  ) {
    this.camera = camera;
    this.position = position;
    this.rotation = rotation;
  }

  update(): void {
    this.updateHeightOffset();

    this.isMoving = false;
  }

  move(direction: DIRECTION): void {
    let v;
    let isCollision = false; // TODO: пока нет проверки на столкновение
    let time = performance.now();

    this.isMoving = true;

    switch (direction) {
      case DIRECTION.UP:
        v = new Vector2(
          this.position.x + this.moveSpeed * Math.cos(this.rotation), // +
          this.position.y + this.moveSpeed * Math.sin(this.rotation)  // -
        );

        if (!isCollision) {
          this.position = v;
        }

        this.camera.heightOffset -= Math.cos(time / this.noddlingFrequency) * this.noddlingForce;

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

        this.camera.heightOffset -= Math.cos(time / this.noddlingFrequency) * this.noddlingForce;

        break;

      case DIRECTION.RIGHT:
        this.rotation += this.rotateSpeed;

        break;
    }

    this.rotation = Angle.normalize(this.rotation);

    this.camera.position = this.position;
    this.camera.rotation = this.rotation;
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

  // возвращаем камеру после ходьбы в нормальное положение
  private updateHeightOffset(): void {
    if (this.isMoving) {
      return;
    }

    this.camera.heightOffset = Math.trunc(this.camera.heightOffset);

    if (this.camera.heightOffset > this.noddlingStabilizationSpeed) {
      this.camera.heightOffset -= this.noddlingStabilizationSpeed;
    } else if (this.camera.heightOffset < -this.noddlingStabilizationSpeed) {
      this.camera.heightOffset += this.noddlingStabilizationSpeed;
    }
  }
}

export default Player;