//creating GameStart Class
class StartScene extends Phaser.Scene {
    constructor(){
      super({ key: 'StartScene' });
    }

    preload () {
        this.load.audio('theme', 'sounds/gameTheme.wav');
        this.load.image('start', 'img/start-screen.png')
    }
    create(){
        //Music
        gameState.theme = this.sound.add('theme');
        gameState.theme.loop = true;
        gameState.theme.play()
        this.startScreen = this.add.image(600, 350, 'start').setScale(1.05);
        //this.startScreen.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);
        this.input.on('pointerup', () => {
            this.scene.stop('StartScene');
            this.scene.start('GameScene');
        });
    }
  }