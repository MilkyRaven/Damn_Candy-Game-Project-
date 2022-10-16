class Intro extends Phaser.Scene {
    constructor(){
      super({ key: 'Intro' });
    }

    preload () {
        //this.load.image('start', 'img/start-screen.png')
        this.load.video('intro', 'vid/intro.mp4', 'loadeddata', false, true);
    }
    create(){
        //this.startScreen = this.add.image(400, 250, 'start');
        this.introVid = this.add.video(400, 300, 'intro');
        this.introVid.play();
        this.input.on('pointerup', () => {
            this.scene.stop('Intro');
            this.scene.start('StartScene');
        });
    }
  }