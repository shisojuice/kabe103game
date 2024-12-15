import { Scene } from 'phaser';

export class GameOver extends Scene {
    constructor() {
        super('GameOver');
    }

    create() {
        const score = this.registry.get('highscore');
        const tamascore = this.registry.get('tamascore');
        const textStyle = { fontFamily: 'monospace', fontSize: 192, fontStyle: 'bold', color: '#ffffff', stroke: '#000000', strokeThickness: 4 };
        this.add.image(512, 384, 'background');
        this.add.text(512, 384, `結果発表\r\n${score}壁${tamascore}璧`, textStyle).setAlign('center').setOrigin(0.5);
        this.input.once('pointerdown', () => {
            this.scene.start('MainMenu');
        });
    }
}
