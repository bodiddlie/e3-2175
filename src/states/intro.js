import Phaser from 'phaser';

const startFont = {
  font: '15px Arial',
  fill: '#FFFFFF',
  align: 'center'
};

export class Intro extends Phaser.State {
  create() {
      let graphics = this.add.graphics(5, this.world.height - 100);
      graphics.lineStyle(5, 0xFFFFFF, 1);
      graphics.drawRoundedRect(0, 0, this.world.width - 10, 95, 5);

      let start = 'Hello, and welcome to Giant Bomb\'s E3 2175 coverage.';
      let startText = this.add.text(15, this.world.height - 85, start, startFont);
      //startText.anchor.set(0.5, 0.5);

      //this.input.onDown.addOnce(this.startGame, this);
  }

  startGame() {
      //this.game.state.start('TestTile');
  }
}
