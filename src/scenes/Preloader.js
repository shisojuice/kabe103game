import { Scene } from 'phaser';

export class Preloader extends Scene {
    constructor() {
        super('Preloader');
    }

    preload() {
        this.load.setPath('assets');
        this.load.image('background', 'background.png');
        this.load.image('logo', 'title.png');
        this.load.atlas('kabe_bl', 'kabe_bl.png', 'kabe_bl.json');
        this.load.atlas('kabe_rd', 'kabe_rd.png', 'kabe_rd.json');
        this.load.atlas('kabe_ye', 'kabe_ye.png', 'kabe_ye.json');
        this.load.atlas('tama_bl', 'tama_bl.png', 'tama_bl.json');
        this.load.atlas('tama_rd', 'tama_rd.png', 'tama_rd.json');
        this.load.atlas('tama_ye', 'tama_ye.png', 'tama_ye.json');
    }

    create() {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        this.anims.create({ key: 'kabe_bl_vanish', frames: [{ key: 'kabe_bl', frame: 'kabe_wh.png' }], frameRate: 10 });
        this.anims.create({ key: 'kabe_rd_vanish', frames: [{ key: 'kabe_rd', frame: 'kabe_wh.png' }], frameRate: 10 });
        this.anims.create({ key: 'kabe_ye_vanish', frames: [{ key: 'kabe_ye', frame: 'kabe_wh.png' }], frameRate: 10 });
        this.anims.create({ key: 'tama_bl_vanish', frames: [{ key: 'tama_bl', frame: 'tama_wh.png' }], frameRate: 10 });
        this.anims.create({ key: 'tama_rd_vanish', frames: [{ key: 'tama_rd', frame: 'tama_wh.png' }], frameRate: 10 });
        this.anims.create({ key: 'tama_ye_vanish', frames: [{ key: 'tama_ye', frame: 'tama_wh.png' }], frameRate: 10 });
        //  When all the assets are loaded go to the next scene.
        //  We can go there immediately via: this.scene.start('MainMenu');
        //  Or we could use a Scene transition to fade between the two scenes:
        this.scene.transition({
            target: 'MainMenu',
            duration: 500,
            moveBelow: true,
            onUpdate: (progress) => {
                this.cameras.main.setAlpha(1 - progress);
            }
        });
        //  When the transition completes, it will move automatically to the MainMenu scene
    }
}
