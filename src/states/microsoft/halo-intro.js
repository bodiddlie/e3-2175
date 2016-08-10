import Phaser from 'phaser';

import TalkingHeads from '../../talking-heads';
import TitleText from '../../title-text';

const titles = ['Coming Fall 2175', 'It\'s time to finish finishing the fight.'];

export class HaloIntro extends Phaser.State {
  init() {
    this.titleText = new TitleText(this.add);
    this.heads = new TalkingHeads(this.load, this.add);
  }

  preload() {
    this.heads.preload();
  }

  create() {
    this.heads.create();
    this.titleText.create();

    let tweens = this.titleText.startTitleFade(titles);
    tweens.first.start();
    tweens.last.onComplete.add(() => this.game.state.start('HaloPlay'));
  }
}
