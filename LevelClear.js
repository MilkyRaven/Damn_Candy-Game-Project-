class LevelClear extends Phaser.Scene {
    constructor(){
      super({ key: 'LevelClear'});
    }

    preload () {
        this.load.image('clear', 'img/levelclear.png')
        this.load.audio('click','sounds/click.wav' );
        this.load.audio('portal','sounds/portal.wav' );
    }
    create(){
        let win = this.sound.add('portal');
        win.play()
        this.add.image(600, 430, 'clear').setScale(1.25);
        this.add.text(880, 520, `${gameState.score}`, {fill: '#FFFFFF', fontSize: '40px'})

            this.input.on('pointerup', () => {
            this.scene.stop('LevelClear');
            let click = this.sound.add('click');
            click.play();
            gameState.score = 0;
            gameState.hearts = 3;
            this.scene.start('StartScene');
            gameState.theme.stop();
        });
    }
  }