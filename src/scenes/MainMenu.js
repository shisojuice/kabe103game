import { Scene } from 'phaser';

export class MainMenu extends Scene {
    constructor() {
        super('MainMenu');
    }

    create() {
        const textStyle = { fontFamily: 'monospace', fontSize: 38, color: '#ffffff', stroke: '#000000', strokeThickness: 4 };
        this.add.image(512, 384, 'background');
        const logo = this.add.image(512, 270, 'logo');
        this.tweens.add({ targets: logo, scale: 2, duration: 1000, ease: 'Back', repeat: -1, yoyo: true, });
        const instructions = [
            '30秒間、壁をクリックしよう!',
            '赤:10点,黄:5点,黒:1点,',
            '- Start -'
        ]
        this.add.text(512, 550, instructions, textStyle).setAlign('center').setOrigin(0.5);
        this.input.once('pointerdown', () => {
            this.scene.start('ClickerGame');
        });
    }
}
