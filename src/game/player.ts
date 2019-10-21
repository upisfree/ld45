import { DIRECTION, KEY_CODE } from '../engine/const';
import Vector2 from '../engine/math/vector2';
import Angle from '../engine/math/angle';
import Camera from '../engine/render/camera';
import NPC from './npc';
import ASSETS from '../assets';
import Level from '../engine/level';
import keyboard from '../engine/platform/keyboard';
import mouse from '../engine/platform/mouse';
import touch from '../engine/platform/touch';

class Player {
  camera: Camera;
  level: Level;
  position: Vector2;
  rotation: number = 0;
  health: number = 100;

  moveSpeed: number = 0.1;
  rotateSpeed: number = Math.PI / 64;
  noddlingStabilizationSpeed: number = 20;
  noddlingFrequency: number = 120;
  noddlingForce: number = 3;

  isMoving: boolean = false;

  constructor(
    camera: Camera,
    level: Level,
    position: Vector2 = new Vector2(0, 0),
    rotation: number = 0
  ) {
    this.camera = camera;
    this.level = level;
    this.position = position;
    this.rotation = rotation;
  }

  update(): void {
    this.nullifyHeightOffset();

    this.isMoving = false;
    this.health += 1;
    
    this.updateTouchControls();

    if (this.health > 100) {
      this.health = 100;
    }

    if (this.health < 0) {
      // (<any>window).restart(); ////////////////
    }
  }

  move(direction: DIRECTION, moveSpeed = this.moveSpeed, rotateSpeed = this.rotateSpeed): void {
    let p = this.position;
    let distanceX;
    let distanceY;
    let collisionX;
    let collisionY;

    let time = performance.now();

    this.isMoving = true;

    switch (direction) {
      case DIRECTION.UP:
        distanceX = moveSpeed * Math.cos(this.rotation);
        distanceY = moveSpeed * Math.sin(this.rotation);
        collisionX = this.level.isNotCollision(new Vector2(p.x + distanceX, p.y));
        collisionY = this.level.isNotCollision(new Vector2(p.x, p.y + distanceY));

        if (collisionX) {
          this.position.x += distanceX;
        }

        if (collisionY) {
          this.position.y += distanceY;
        }

        if (collisionX && collisionY) {
          this.camera.heightOffset -= Math.cos(time / this.noddlingFrequency) * this.noddlingForce;
        }

        break;

      case DIRECTION.LEFT:
        this.rotation -= rotateSpeed;

        break;

      case DIRECTION.DOWN:
        distanceX = moveSpeed * Math.cos(this.rotation);
        distanceY = moveSpeed * Math.sin(this.rotation);
        collisionX = this.level.isNotCollision(new Vector2(p.x - distanceX, p.y));
        collisionY = this.level.isNotCollision(new Vector2(p.x, p.y - distanceY));

        if (collisionX) {
          this.position.x -= distanceX;
        }

        if (collisionY) {
          this.position.y -= distanceY;
        }

        if (collisionX && collisionY) {
          this.camera.heightOffset += Math.cos(time / this.noddlingFrequency) * this.noddlingForce;
        }

        break;

      case DIRECTION.RIGHT:
        this.rotation += rotateSpeed;

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

  attack(): void {
    if ((<any>window).isMobile) {
      this.camera.gunOffset = 150; // mobile
    } else {
      this.camera.gunOffset = 200; // desktop
    }

    for (let i = 0; i < this.level.npcs.length; i++) {
      let n = this.level.npcs[i];
      let d = Vector2.distance(this.position, n.position);

      if (d < 1 && !n.corpse && !n.destroyed) {
        n.destroy();

        break;
      }
    }
  }

  updateTouchControls() {
    if (!(<any>window).isMobile || !touch.active) {
      return;
    }

    let maxDistance = 100;
    let distanceFactor = (touch.distance / maxDistance);

    if (distanceFactor > 1) {
      distanceFactor = 1;
    }



    let r = touch.rotation;

    let nw = r >= Math.PI && r <= Math.PI * 3 / 2;
    let ne = r >= Math.PI * 3 / 2 && r <= Math.PI * 2;
    let sw = r >= Math.PI / 2 && r <= Math.PI;
    let se = r >= 0 && r <= Math.PI / 2;

    if (nw || ne) {
      this.move(DIRECTION.UP, this.moveSpeed * distanceFactor, this.rotateSpeed * distanceFactor);
    } else if (sw || se) {
      this.move(DIRECTION.DOWN, this.moveSpeed * distanceFactor, this.rotateSpeed * distanceFactor);
    }

    if (nw || sw) {
      this.move(DIRECTION.LEFT, this.moveSpeed * distanceFactor, this.rotateSpeed * distanceFactor);
    } else if (ne || se) {
      this.move(DIRECTION.RIGHT, this.moveSpeed * distanceFactor, this.rotateSpeed * distanceFactor);
    }
  }

  // возвращаем камеру после ходьбы в нормальное положение
  private nullifyHeightOffset(): void {
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