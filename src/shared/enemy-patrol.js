import Phaser from 'phaser';

export class EnemyPatrol extends Phaser.Sprite{
  constructor(game, x, y) {
    super(game, x, y, 'enemy');
    game.physics.enable(this, Phaser.Physics.ARCADE);
    //this.physicsBodyType = Phaser.Physics.ARCADE;
    this.body.collideWorldBounds = true;
    this.enableBody = true;
    this.animations.add('right', [0,1,2,3,4,5,6,7], 8, true);
    this.animations.add('left', [9,10,11,12,13,14,15,16], 8, true);
    this.animations.add('idle-right', [18], 8, true);
    this.animations.add('idle-left', [21], 8, true);
  }

  update() {
  }
}
