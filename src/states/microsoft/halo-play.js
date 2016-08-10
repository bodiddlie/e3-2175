import Phaser from 'phaser';

import TalkingHeads from '../../talking-heads';
import InputManager from '../../input-manager';

const MUZZLE_X_RIGHT = 41;
const MUZZLE_X_LEFT = 8;
const MUZZLE_Y = 25;

let nextFire = 0;

export class HaloPlay extends Phaser.State {
  init() {
    this.heads = new TalkingHeads(this.load, this.add);
    this.controls = new InputManager(this.input);
  }

  preload() {
    this.heads.preload();
    this.load.spritesheet('halo', 'assets/microsoft-sprites/halo.png', 50, 50, 24);
    this.load.image('bullet', 'assets/microsoft-sprites/bullet.png');
    this.load.image('starfield', 'assets/microsoft-sprites/starfield.png');
  }

  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.world.setBounds(0, 0, 1600, 340);

    this.bg = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'starfield');
    this.bg.alpha = 0;

    this.heads.create();

    this.player = this.add.sprite(200, 290, 'halo');
    this.player.animations.add('idle-right', [0], 3, true);
    this.player.animations.add('idle-left', [1], 3, true);
    this.player.animations.add('left', [8,9,10,11,12,13,14,15], 10, true);
    this.player.animations.add('right', [16,17,18,19,20,21,22,23], 10, true);
    this.player.animations.add('crouch-right', [2], 3, true);
    this.player.animations.add('crouch-left', [3], 3, true);
    this.player.animations.add('jump-right', [4], 3, true);
    this.player.animations.add('jump-left', [5], 3, true);
    this.player.animations.add('hit-right', [6], 3, true);
    this.player.animations.add('hit-left', [7], 3, true);
    this.player.direction = 'right';
    this.player.alpha = 0;
    this.physics.enable(this.player);
    this.player.body.collideWorldBounds = true;

    this.bullets = this.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(10, 'bullet', 0, false);
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 0.5);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('checkWorldBounds', true);
    this.bullets.setAll('body.allowGravity', false);

    this.game.camera.follow(this.player);

    this.game.add.tween(this.bg).to({alpha: 1}, 2000, null, true);
    this.game.add.tween(this.player).to({alpha: 1}, 2000, null, true);

    this.physics.arcade.gravity.y = 200;

    this.player.jumping = false;

    this.controls.addUpEvent(() => this.player.body.velocity.y = -150);
  }

  update() {
    this.controlPlayer();
    this.playerShoot();
    this.animatePlayer();
  }

  controlPlayer() {
    if (this.controls.right()) {
      this.player.direction = 'right';
      this.player.x += 4;
    } else if (this.controls.left()) {
      this.player.direction = 'left';
      this.player.x -= 4;
    }
  }

  playerShoot() {
    if (this.controls.fire() && this.game.time.now > nextFire && this.bullets.countDead() > 0) {
      nextFire = this.game.time.now + 500;
      let bullet = this.bullets.getFirstExists(false);
      if (this.player.direction === 'right') {
        bullet.reset(this.player.x + MUZZLE_X_RIGHT, this.player.y + MUZZLE_Y);
        bullet.body.velocity.x = 1000;
      } else {
        bullet.reset(this.player.x + MUZZLE_X_LEFT, this.player.y + MUZZLE_Y);
        bullet.body.velocity.x = -1000;
      }
    }
  }

  animatePlayer() {
    let jumping = Math.abs(this.player.body.velocity.y) > 0;

    if (!jumping) {
      if (this.controls.right() || this.controls.left()) {
        this.player.animations.play(this.player.direction);
      } else {
        this.player.animations.play('idle-' + this.player.direction);
      }
    } else {
      this.player.animations.play('jump-' + this.player.direction);
    }
  }
}
