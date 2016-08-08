import Phaser from 'phaser';

const startFont = {
  font: '15px Arial',
  fill: '#FFFFFF',
  align: 'center'
};

let text = [
    'Hello, and welcome to Giant Bomb\'s E3 2175 coverage.',
    'I\'m Jeff Gerstmann and I\'m joined today by Vinny Caravela,',
    'Hello.....',
    'Transhuman AI Brad Shoemaker,',
    'I AM NOW PRESENT....',
    'Genetically engineered Chalupa Dan Rykert',
    'Grrrbtlalrkkbhtrkrkalrkfkrkjrrkf......',
    'And the disembodied head of Alex Navaro,',
    'It has been 150 years and still I know nothing but pain...'
];

export class Intro extends Phaser.State {
  create() {
      let graphics = this.add.graphics(5, this.world.height - 100);
      graphics.lineStyle(5, 0xFFFFFF, 1);
      graphics.drawRoundedRect(0, 0, this.world.width - 10, 95, 5);

      this.textIndex = 0;
      this.textObject = this.add.text(15, this.world.height - 85, text[this.textIndex], startFont);

      this.input.onDown.add(this.cycleText, this);
  }

  cycleText() {
      if (this.textIndex < text.length - 1) {
          this.textIndex++;
          this.textObject.setText(text[this.textIndex]);
      }
  }
}
