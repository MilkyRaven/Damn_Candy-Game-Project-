class LevelClear extends Phaser.Scene {
    constructor(){
      super({ key: 'LevelClear'});
    }

    preload () {
        this.load.image('clear', 'img/levelclear.png')
    }
    create(){
        this.add.image(300, 250, 'clear').setScale(0.7);
        this.add.text(400, 290, `${gameState.score}`, {fill: '#FFFFFF', fontSize: '40px'})

            this.input.on('pointerup', () => {
            this.scene.stop('LevelClear');
            gameState.score = 0;
            gameState.hearts = 3;
            this.scene.start('StartScene');
            gameState.theme.stop();
        });
    }
  }