class EndingScene extends Phaser.Scene {
    constructor(){
      super({ key: 'EndingScene' });
    }

    preload () {
        this.load.image('end', 'img/gameover.png');
        this.load.audio('over','sounds/over.wav' );
        this.load.audio('click','sounds/click.wav' );
    }
    create(){
        this.add.image(620, 450, 'end').setScale(1.2);
        let over = this.sound.add('over');
        over.play();

            this.input.on('pointerup', () => {
            this.scene.stop('EndingScene');
            let click = this.sound.add('click');
            click.play();
            gameState.score = 0;
            this.scene.start('StartScene');  
        });
    }
  }
