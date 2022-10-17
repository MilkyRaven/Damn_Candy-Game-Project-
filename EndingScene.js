class EndingScene extends Phaser.Scene {
    constructor(){
      super({ key: 'EndingScene' });
    }

    preload () {
        this.load.image('end', 'img/gameover.png')
    }
    create(){
        this.add.image(300, 250, 'end').setScale(0.5);

            this.input.on('pointerup', () => {
            this.scene.stop('EndingScene');
            gameState.score = 0;
            this.scene.start('StartScene');  
        });
    }
  }
