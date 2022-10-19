//creating GameStart Class
class madeBy extends Phaser.Scene {
    constructor(){
      super({ key: 'madeBy' });
    }

    preload () {
        this.load.audio('theme', 'sounds/gameTheme.mp3');
        this.load.image('made', 'img/made.png');
        this.load.audio('click','sounds/click.wav' );
    }
    create(){
        //Music
        // gameState.theme = this.sound.add('theme');
        // gameState.theme.loop = true;
        // gameState.theme.play()
        this.madeBy = this.add.image(600, 450, 'made').setScale(1.05);
    
        this.input.on('pointerup', () => {
            this.scene.stop('madeBy');
            let click = this.sound.add('click');
            click.play();
            this.scene.start('StartScene');
        });
    }
  }