import Phaser from 'phaser';

import TalkingHeads from '../../talking-heads';
import InputManager from '../../input-manager';

export class Microsoft extends Phaser.State {
  init() {
    this.heads = new TalkingHeads(this.load, this.add);
    this.controls = new InputManager(this.input);
  }

  preload() {
    this.heads.preload();
  }

  create() {
    this.heads.create();
    this.controls.space.onUp.add(() => this.cycleText(), this);

    this.textIndex = 0;
    this.heads.setSpeaking(scene[this.textIndex].speaking, scene[this.textIndex].text);
  }

  cycleText() {
    if (this.textIndex < scene.length - 1) {
      this.textIndex++;
      const sceneInfo = scene[this.textIndex];
      this.heads.setSpeaking(sceneInfo.speaking, sceneInfo.text);
    } else {
      this.game.state.start('HaloIntro');
    }
  }
}

const scene = [
  {
    speaking: 'jeff',
    text: 'Test stuff'
  }
];
