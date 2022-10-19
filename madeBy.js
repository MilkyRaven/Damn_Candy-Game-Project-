//creating GameStart Class
class madeBy extends Phaser.Scene {
    constructor(){
      super({ key: 'madeBy' });
    }

    preload () {
        this.load.audio('miau', 'sounds/miau.mp3');
        this.load.image('made', 'img/made.png');
        this.load.audio('click','sounds/click.wav' );
    }
    create(){
        this.madeBy = this.add.image(600, 450, 'made').setScale(1.05);
        let miau = this.sound.add('miau');
    
        this.input.on('pointerup', () => {
            miau.play()
            this.scene.stop('story');
            this.scene.start('StartScene');
        });
    }
  }