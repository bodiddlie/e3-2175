import 'pixi';
import 'p2';
import Phaser from 'phaser';

import {Intro} from './states/intro';
import {Microsoft, HaloIntro, HaloPlay} from './states/microsoft';

export class Game extends Phaser.Game {
    constructor() {
        super(800, 600, Phaser.AUTO, 'phaser-canvas', { create: () => {
            this.state.add('Intro', Intro);
            this.state.add('Microsoft', Microsoft);
            this.state.add('HaloIntro', HaloIntro);
            this.state.add('HaloPlay', HaloPlay);
            this.state.start('HaloPlay');
        }});
    }
}
