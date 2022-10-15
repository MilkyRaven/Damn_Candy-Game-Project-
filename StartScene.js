//creating GameStart Class
class StartScene extends Phaser.Scene {
    constructor(){
      super({ key: 'StartScene' });
    }

    preload () {
        this.load.audio('pixel', 'sounds/pixel.wav');
        this.load.image('start', 'img/start-screen.png')
    }
    create(){
        //Music
        gameState.pixel = this.sound.add('pixel');
        gameState.pixel.loop = true;
        gameState.pixel.play()
        this.add.image(400, 250, 'start');
        this.input.on('pointerup', () => {
            this.scene.stop('StartScene');
            gameState.pixel.stop();
            this.scene.start('GameScene');
        });
    }
  }