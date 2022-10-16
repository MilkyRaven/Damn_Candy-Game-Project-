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
        this.startScreen = this.add.image(400, 250, 'start');
        //this.startScreen.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);
        this.input.on('pointerup', () => {
            gameState.pixel.stop();
            this.scene.stop('StartScene');
            this.scene.start('GameScene');
        });
    }
  }