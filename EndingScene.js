class EndingScene extends Phaser.Scene {
    constructor(){
      super({ key: 'EndingScene' });
    }

    preload () {
        //this.load.image('end', '')
    }
    create(){
        //this.add.image(400, 250, 'start');
        this.input.on('pointerup', () => {
            this.scene.stop('GameScene');
            this.scene.start('StartScene');  
        });
    }
  }