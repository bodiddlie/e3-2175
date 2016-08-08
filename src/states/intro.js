import Phaser from 'phaser';

const startFont = {
  font: '15px Arial',
  fill: '#FFFFFF',
  align: 'center'
};

let scene = [
    {
        speaking: 'jeff',
        visible: ['jeff'],
        text: 'Hello, and welcome to Giant Bomb\'s E3 2175 coverage.'
    },
    {
        speaking: 'jeff',
        visible: ['jeff'],
        text: 'I\'m Jeff Gerstmann and I\'m joined today by Mr. Vinny Caravela...'
    },
    {
        speaking: 'vinny',
        visible: ['vinny'],
        text: 'I think I went into the wrong building...'
    },
    {
        speaking: 'jeff',
        visible: ['jeff'],
        text: 'Always a pleasure, Vinny.'
    },
    {
        speaking: 'jeff',
        visible: ['jeff'],
        text: 'Also with us is Transhuman AI Brad Shoemaker...'
    },
    {
        speaking: 'brad',
        visible: ['brad'],
        text: 'I AM NOW PRESENT....'
    },
    {
        speaking: 'jeff',
        visible: ['jeff'],
        text: 'Ominous as ever Brad.'
    },
    {
        speaking: 'jeff',
        visible: ['jeff'],
        text: 'Next is Genetically Augmented Chalupa Dan Ryckert...'
    },
    {
        speaking: 'dan',
        visible: ['dan'],
        text: 'Grrdalkrlakfalkrjalrlakdfjlakrlakrjflsslslrjs....'
    },
    {
        speaking: 'jeff',
        visible: ['jeff'],
        text: 'I think we might need more Taco Bell wrappers under Dan to keep it clean in here.'
    },
    {
        speaking: 'jeff',
        visible: ['jeff'],
        text: 'And at the end of the row is the disembodied cybernetic head of Alex Navaro....'
    },
    {
        speaking: 'alex',
        visible: ['alex'],
        text: 'It has been 150 years and still I know nothing but pain....'
    }
];

export class Intro extends Phaser.State {
    preload() {
        this.load.spritesheet('jeff', 'assets/staff-sprites/jeff.png', 160, 160, 2);
        this.load.spritesheet('vinny', 'assets/staff-sprites/vinny.png', 160, 160, 2);
        this.load.spritesheet('brad', 'assets/staff-sprites/brad.png', 160, 160, 2);
        this.load.spritesheet('dan', 'assets/staff-sprites/dan.png', 160, 160, 2);
        this.load.spritesheet('alex', 'assets/staff-sprites/alex.png', 160, 160, 2);
    }

    create() {
      let graphics = this.add.graphics(5, this.world.height - 100);
      graphics.lineStyle(5, 0xFFFFFF, 1);
      graphics.drawRoundedRect(0, 0, this.world.width - 10, 95, 5);

      this.textIndex = 0;
      this.textObject = this.add.text(15, this.world.height - 85, scene[this.textIndex].text, startFont);

      this.input.onDown.add(this.cycleText, this);

      this.sprites = {};

      this.sprites.jeff = this.add.sprite(0, 340, 'jeff');
      this.jeffTalk = this.sprites.jeff.animations.add('talk');
      this.sprites.jeff.animations.play('talk', 3, true);

      this.sprites.vinny = this.add.sprite(160, 340, 'vinny');
      this.vinnyTalk = this.sprites.vinny.animations.add('talk');
      this.sprites.vinny.visible = false;
      //this.vinny.animations.play('talk', 3, true);

      this.sprites.brad = this.add.sprite(320, 340, 'brad');
      this.bradTalk = this.sprites.brad.animations.add('talk');
      this.sprites.brad.visible = false;
      //this.brad.animations.play('talk', 3, true);

      this.sprites.dan = this.add.sprite(480, 340, 'dan');
      this.danTalk = this.sprites.dan.animations.add('talk');
      this.sprites.dan.visible = false;
      //this.dan.animations.play('talk', 3, true);

      this.sprites.alex = this.add.sprite(640, 340, 'alex');
      this.alexTalk = this.sprites.alex.animations.add('talk');
      this.sprites.alex.visible = false;
      //this.alex.animations.play('talk', 3, true);
    }

    cycleText() {
      if (this.textIndex < scene.length - 1) {
          this.textIndex++;
          const sceneInfo = scene[this.textIndex];
          this.textObject.setText(sceneInfo.text);

          for (let name in this.sprites) {
              this.sprites[name].visible = false;
              this.sprites[name].animations.stop();
          }
          sceneInfo.visible.forEach(name => this.sprites[name].visible = true);
          this.sprites[sceneInfo.speaking].animations.play('talk', 3, true);
      }
    }
}
