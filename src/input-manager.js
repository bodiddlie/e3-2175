import Phaser from 'phaser';

export default class InputManager {
  constructor(input) {
    this.input = input;
    this.cursors = input.keyboard.createCursorKeys();
    this.W = input.keyboard.addKey(Phaser.Keyboard.W);
    this.A = input.keyboard.addKey(Phaser.Keyboard.A);
    this.S = input.keyboard.addKey(Phaser.Keyboard.S);
    this.D = input.keyboard.addKey(Phaser.Keyboard.D);
    this.space = input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  }

  up() {
    return (this.cursors.up.isDown || this.W.isDown);
  }

  down() {
    return (this.cursors.down.isDown || this.S.isDown);
  }

  left() {
    return (this.cursors.left.isDown || this.A.isDown);
  }

  right() {
    return (this.cursors.right.isDown || this.D.isDown);
  }

  fire() {
    return (this.space.isDown);
  }
}
