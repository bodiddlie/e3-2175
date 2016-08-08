import Phaser from 'phaser';

import TalkingHeads from '../talking-heads';

export class Microsoft extends Phaser.State {
  init() {
    this.heads = new TalkingHeads(this.load, this.add);
  }

  preload() {
    this.heads.preload();
  }

  create() {
    this.heads.create();
  }

  update() {
  }
}
