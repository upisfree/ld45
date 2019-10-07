import ASSETS from '../assets';
import Angle from '../engine/math/angle';
import Vector2 from '../engine/math/vector2';
import Bitmap from '../engine/render/bitmap';
import Sprite from '../engine/render/sprite';
import Level from '../engine/level';
import Player from './player';

(<any>window).kills = 0;

class NPC extends Sprite {
  // TODO: move to AnimatedSprite
  frame: number = 0;
  framesCount: number = 0;
  frameWidth: number = 0;

  moveSpeed: number;
  destroyed: boolean = false;
  corpse: boolean = false;

  constructor(bitmap: Bitmap, position: Vector2, level: Level, framesCount?: number, frameWidth?: number) {
    super(bitmap, position, level);

    this.moveSpeed = 0.0085;
    this.framesCount = framesCount;
    this.frameWidth = frameWidth;

    this.level.npcs.push(this);
  }

  update() {
    let p = this.position.copy();
    let factor = new Vector2(this.moveSpeed, this.moveSpeed);
    let diff = p.sub(this.level.player.position).mult(factor);

    let collisionVector = new Vector2(
      this.position.x - diff.x,
      this.position.y - diff.y
    );

    let t = this.level.getWallType(collisionVector);

    if (!this.corpse) {
      if (!Level.isWallTypeVoidOrAir(t)) {
        this.position.add(diff);
      } else {
        this.position.sub(diff);
      }
    }

    if (Math.random() > 0.65) {
      this.frame++;
    }

    if (this.frame >= this.framesCount) {
      if (!this.destroyed) {
        this.frame = 0;
      } else {
        // this.level.npcs = this.level.npcs.filter(n => n !== this);
        // this.level.sprites = this.level.sprites.filter(s => s !== this);

        this.bitmap = ASSETS.TEXTURES['corpse'].bitmap;
        this.frame = 0;
        this.framesCount = 8;
        this.frameWidth = 51;

        this.corpse = true;
      }
    }
  }

  destroy(onRestart = false) {
    this.destroyed = true;
    this.bitmap = ASSETS.TEXTURES['explosion'].bitmap;
    this.frame = 0;
    this.framesCount = 6;
    this.frameWidth = 32;

    let r = Math.floor(Math.random() * (7 - 1 + 1) + 1);

    if (!onRestart || (onRestart && Math.random() < 0.05)) {
      let s = (<any>window).sound.play('scream' + r);
      (<any>window).sound.volume(0.5, s);
      (<any>window).sound.fade(0.85, 1, (<any>window).sound.duration(s) * 0.15, s);
    }

    if (!onRestart) {
      (<any>window).kills++;
      document.querySelector('#count').textContent = (<any>window).kills;
    }
  }

  onCollision(trigger: Sprite | Player): void {
    this.collisionWith = trigger;

    if (!this.corpse && !this.destroyed) {
      this.level.player.health -= 2;      
    }
  }
}

export default NPC;