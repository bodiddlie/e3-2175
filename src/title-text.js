export default class TitleText {
  constructor(add) {
    this.add = add;
    this.font = {
      font: '32px Arial',
      fill: '#FFFFFF',
      align: 'center'
    };
  }

  create() {
    this.titleText = this.add.text(0, 0, '', this.font);
    this.titleText.alpha = 0;
    this.titleText.setTextBounds(0, 0, 800, 340);
    this.titleText.boundsAlignH = 'center';
    this.titleText.boundsAlignV = 'middle';
  }

  startTitleFade(text) {
    let first = null;
    let last = null;
    for (let i = 0; i < text.length; i++) {
      let fadeIn = this.add.tween(this.titleText).to({alpha: 1}, 2000);
      fadeIn.onStart.add(() => this.titleText.setText(text[i]), this);
      let fadeOut = this.add.tween(this.titleText).to({alpha: 0}, 2000, null, false, 1000);
      fadeIn.chain(fadeOut);

      if (!first) first = fadeIn;
      if (last) last.chain(fadeIn);
      last = fadeOut;
    }
    return {first, last};
  }
}
