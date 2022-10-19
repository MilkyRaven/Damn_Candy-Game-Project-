//creating GameStart Class
class StartScene extends Phaser.Scene {
    constructor(){
      super({ key: 'StartScene' });
    }

    preload () {
        this.load.image('start', 'img/start-screen.png')
        this.load.audio('click','sounds/click.wav' );
    }
    create(){
        this.startScreen = this.add.image(600, 450, 'start').setScale(0.8);
    
        this.input.on('pointerup', () => {
            this.scene.stop('StartScene');
            let click = this.sound.add('click');
            click.play();
            this.scene.start('Story');
        });
    }
  }
