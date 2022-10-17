class EndingScene extends Phaser.Scene {
    constructor(){
      super({ key: 'EndingScene' });
    }

    preload () {
        this.load.image('end', 'img/gameover.png')
    }
    create(){
        this.add.image(620, 450, 'end').setScale(1.2);

            this.input.on('pointerup', () => {
            this.scene.stop('EndingScene');
            gameState.score = 0;
            this.scene.start('StartScene');  
        });
    }
  }
