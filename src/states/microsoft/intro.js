import Phaser from 'phaser';

import TalkingHeads from '../../talking-heads';
import InputManager from '../../input-manager';

const MUZZLE_X_RIGHT = 41;
const MUZZLE_X_LEFT = 8;
const MUZZLE_Y = 25;

let nextFire = 0;

export class Microsoft extends Phaser.State {
  init() {
    this.heads = new TalkingHeads(this.load, this.add);
    this.controls = new InputManager(this.input);
  }

  preload() {
    this.heads.preload();
    this.load.spritesheet('halo', 'assets/microsoft-sprites/halo.png', 50, 50, 24);
    this.load.image('stage', 'assets/microsoft-sprites/stage.png');
    this.load.image('bullet', 'assets/microsoft-sprites/bullet.png');
  }

  create() {
    this.game.world.setBounds(0, 0, 1600, 340);
    this.heads.create();
    //this.stage = this.add.sprite(0, 0, 'stage');

    this.test = this.add.sprite(200, 290, 'halo');
    this.test.animations.add('idle-right', [0], 3, true);
    this.test.animations.add('idle-left', [1], 3, true);
    this.test.animations.add('left', [8,9,10,11,12,13,14,15], 10, true);
    this.test.animations.add('right', [16,17,18,19,20,21,22,23], 10, true);
    this.test.animations.add('crouch-right', [2], 3, true);
    this.test.animations.add('crouch-left', [3], 3, true);
    this.test.animations.add('jump-right', [4], 3, true);
    this.test.animations.add('jump-left', [5], 3, true);
    this.test.animations.add('hit-right', [6], 3, true);
    this.test.animations.add('hit-left', [7], 3, true);
    this.test.direction = 'right';

    this.bullets = this.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(10, 'bullet', 0, false);
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 0.5);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('checkWorldBounds', true);

    this.game.camera.follow(this.test);
    //this.stage.bringToTop();
  }

  update() {
    if (this.controls.right()) {
      this.test.direction = 'right';
      this.test.animations.play('right');
      this.test.x += 4;
    } else if (this.controls.left()) {
      this.test.direction = 'left';
      this.test.animations.play('left');
      this.test.x -= 4;
    } else if (this.controls.up()) {
      this.test.animations.play('jump-' + this.test.direction);
    } else if (this.controls.down()) {
      this.test.animations.play('crouch-' + this.test.direction);
    } else {
      this.test.animations.play('idle-' + this.test.direction);
    }

    if (this.test.x < 0) {
      this.test.x = 0;
    } else if (this.test.x > this.game.world.width - this.test.width) {
      this.test.x = this.game.world.width - this.test.width;
    }

    if (this.controls.fire() && this.game.time.now > nextFire && this.bullets.countDead() > 0) {
      nextFire = this.game.time.now + 500;
      let bullet = this.bullets.getFirstExists(false);
      if (this.test.direction === 'right') {
        bullet.reset(this.test.x + MUZZLE_X_RIGHT, this.test.y + MUZZLE_Y);
        bullet.body.velocity.x = 1000;
      } else {
        bullet.reset(this.test.x + MUZZLE_X_LEFT, this.test.y + MUZZLE_Y);
        bullet.body.velocity.x = -1000;
      }
    }
  }
}
