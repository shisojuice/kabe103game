import { Scene } from 'phaser';

export class ClickerGame extends Scene {
    constructor() {
        super('ClickerGame');
    }

    create() {
        this.score = 0;
        this.kabes = [];
        this.tamascore = 0;
        this.tamas = [];
        const textStyle = { fontFamily: 'monospace', fontSize: 38, color: '#ffffff', stroke: '#000000', strokeThickness: 4 };
        this.add.image(512, 384, 'background');
        this.scoreText = this.add.text(32, 32, '0壁', textStyle).setDepth(1);
        this.timeText = this.add.text(1024 - 32, 32, 'Time: 30', textStyle).setOrigin(1, 0).setDepth(1);
        this.timer = this.time.addEvent({ delay: 30000, callback: () => this.gameOver() });
        this.physics.world.setBounds(0, -384, 1024, 768 + 384);
        for (let i = 0; i < 6; i++) {
            this.drop('kabe_rd');
        }
        for (let i = 0; i < 7; i++) {
            this.drop('kabe_ye');
        }
        for (let i = 0; i < 8; i++) {
            this.drop('kabe_bl');
        }
        for (let i = 0; i < 6; i++) {
            this.drop('tama_rd');
        }
        for (let i = 0; i < 7; i++) {
            this.drop('tama_ye');
        }
        for (let i = 0; i < 8; i++) {
            this.drop('tama_bl');
        }
        this.input.on('gameobjectdown', (pointer, gameObject) => this.click(gameObject));
    }

    drop(strOpt) {
        const x = Phaser.Math.Between(128, 896);
        const y = Phaser.Math.Between(0, -384);
        const sprite = this.physics.add.sprite(x, y, strOpt).setScale(0.5);
        sprite.setName(strOpt);
        sprite.setVelocityX(Phaser.Math.Between(-400, 400));
        sprite.setCollideWorldBounds(true);
        sprite.setBounce(0.96);
        sprite.setInteractive();
        if (strOpt.startsWith('kabe_')) {
            this.kabes.push(sprite);
        }
        if (strOpt.startsWith('tama_')) {
            this.tamas.push(sprite);
        }
    }

    click(obj) {
        obj.disableInteractive();
        obj.setVelocity(0, 0);
        obj.play(`${obj.name}_vanish`);
        obj.once(`animationcomplete-${obj.name}_vanish`, () => {
            setTimeout(() => {
                obj.destroy();
            }, 300);
        });
        if (obj.name == 'kabe_bl') {
            this.score = this.score + 1;
            this.scoreText.setText(this.score + '壁');
        }
        if (obj.name == 'kabe_rd') {
            this.score = this.score + 10;
            this.scoreText.setText(this.score + '壁');
        }
        if (obj.name == 'kabe_ye') {
            this.score = this.score + 5;
            this.scoreText.setText(this.score + '壁');
        }
        if (obj.name == 'tama_bl') {
            this.tamascore = this.tamascore + 1;
        }
        if (obj.name == 'tama_rd') {
            this.tamascore = this.tamascore + 10;
        }
        if (obj.name == 'tama_ye') {
            this.tamascore = this.tamascore + 5;
        }
    }

    update() {
        this.timeText.setText('Time: ' + Math.ceil(this.timer.getRemainingSeconds()));
    }

    gameOver() {
        this.kabes.forEach((kabe) => {
            if (kabe.active) {
                kabe.setVelocity(0, 0);
                kabe.play(`${kabe.name}_vanish`);
            }
        });
        this.tamas.forEach((tama) => {
            if (tama.active) {
                tama.setVelocity(0, 0);
                tama.play(`${tama.name}_vanish`);
            }
        });
        this.input.off('gameobjectdown');
        this.registry.set('highscore', this.score);
        this.registry.set('tamascore', this.tamascore);
        this.time.delayedCall(1000, () => this.scene.start('GameOver'));
    }
}
