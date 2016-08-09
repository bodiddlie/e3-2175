const dialogFont = {
    font: '15px Arial',
    fill: '#FFFFFF',
    align: 'left',
    wordWrap: true,
    wordWrapWidth: 770
};

export default class TalkingHeads {
    constructor(load, add) {
        this.load = load;
        this.add = add;
    }

    preload() {
        this.load.spritesheet('jeff', 'assets/staff-sprites/jeff.png', 160, 160, 2);
        this.load.spritesheet('vinny', 'assets/staff-sprites/vinny.png', 160, 160, 2);
        this.load.spritesheet('brad', 'assets/staff-sprites/brad.png', 160, 160, 2);
        this.load.spritesheet('dan', 'assets/staff-sprites/dan.png', 160, 160, 2);
        this.load.spritesheet('alex', 'assets/staff-sprites/alex.png', 160, 160, 2);
    }

    create() {
        let graphics = this.add.graphics(5, 500);
        graphics.lineStyle(5, 0xFFFFFF, 1);
        graphics.drawRoundedRect(0, 0, 790, 95, 5);
        graphics.fixedToCamera = true;

        let bg = this.add.graphics(0, 340);
        bg.beginFill(0x8800FF);
        bg.drawRect(0, 0, 800, 160);
        bg.fixedToCamera = true;

        this.textObject = this.add.text(15, 515, '', dialogFont);

        this.sprites = {};

        this.sprites.jeff = this.add.sprite(0, 340, 'jeff');
        this.jeffTalk = this.sprites.jeff.animations.add('talk');

        this.sprites.vinny = this.add.sprite(160, 340, 'vinny');
        this.vinnyTalk = this.sprites.vinny.animations.add('talk');

        this.sprites.brad = this.add.sprite(320, 340, 'brad');
        this.bradTalk = this.sprites.brad.animations.add('talk');

        this.sprites.alex = this.add.sprite(480, 340, 'alex');
        this.alexTalk = this.sprites.alex.animations.add('talk');

        this.sprites.dan = this.add.sprite(640, 340, 'dan');
        this.danTalk = this.sprites.dan.animations.add('talk');

        for (let name in this.sprites) {
          this.sprites[name].fixedToCamera = true;
        }
    }

    setVisible(whoAllIsVisible) {
        if (whoAllIsVisible) {
            for (let name in this.sprites) {
                this.sprites[name].visible = false;
            }
            whoAllIsVisible.forEach(name => this.sprites[name].visible = true);
        }
    }

    setSpeaking(speaker, text) {
        for (let name in this.sprites) {
            this.sprites[name].animations.stop(null, true);
        }
        this.sprites[speaker].animations.play('talk', 3, true);
        this.textObject.setText(speaker.toUpperCase() + ':\n' + text);
    }
}
