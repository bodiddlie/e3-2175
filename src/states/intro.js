import Phaser from 'phaser';

import TalkingHeads from '../talking-heads';

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
  },
  {
    speaking: 'jeff',
    visible: ['jeff'],
    text: 'A ray of sunshine, absolutely uplifting.'
  },
  {
    speaking: 'jeff',
    visible: ['jeff', 'vinny', 'brad', 'dan', 'alex'],
    text: 'We\'re all here today to talk over the various press conferences as they happen.'
  },
  {
    speaking: 'jeff',
    visible: ['jeff', 'vinny', 'brad', 'dan', 'alex'],
    text: 'First up today is Microsoft. What are we expecting to see from them? Any surprises expected?'
  },
  {
    speaking: 'brad',
    visible: ['jeff', 'vinny', 'brad', 'dan', 'alex'],
    text: 'NEW HALO ANNOUNCED. MASTER CHIEF IS A FRAUD. I AM THE TRUE MERGING OF HUMAN AND TECHNOLOGY.'
  },
  {
    speaking: 'dan',
    visible: ['jeff', 'vinny', 'brad', 'dan', 'alex'],
    text: 'Gralskdjasf....Viva Pinata....falskjdflasf.....'
  },
  {
    speaking: 'vinny',
    visible: ['jeff', 'vinny', 'brad', 'dan', 'alex'],
    text: 'I just hope they finally have some kind of Kinect based woodworking simulator.'
  },
  {
    speaking: 'alex',
    visible: ['jeff', 'vinny', 'brad', 'dan', 'alex'],
    text: 'Phil Spencer will open the hellmaw and swallow us all whole. Or maybe a new Gears of War. I dunno.'
  },
  {
    speaking: 'jeff',
    visible: ['jeff', 'vinny', 'brad', 'dan', 'alex'],
    text: 'Well the house lights are down and it looks like the conference is starting. Let\'s see what\'s up with Microsoft!'
  }
];

export class Intro extends Phaser.State {
  init() {
    this.heads = new TalkingHeads(this.load, this.add);
  }

  preload() {
    this.heads.preload();
  }

  create() {
    this.heads.create();
    this.input.onDown.add(this.cycleText, this);

    this.textIndex = 0;
    this.heads.setVisible(scene[this.textIndex].visible);
    this.heads.setSpeaking(scene[this.textIndex].speaking, scene[this.textIndex].text);
  }

  cycleText() {
    if (this.textIndex < scene.length - 1) {
      this.textIndex++;
      const sceneInfo = scene[this.textIndex];
      this.heads.setVisible(sceneInfo.visible);
      this.heads.setSpeaking(sceneInfo.speaking, sceneInfo.text);
    } else {
      this.game.state.start('Microsoft');
    }
  }
}
