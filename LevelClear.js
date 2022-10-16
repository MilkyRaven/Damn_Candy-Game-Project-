class LevelClear extends Phaser.Scene {
    constructor(){
      super({ key: 'LevelClear'});
    }

    preload () {
        this.load.image('clear', 'img/levelclear.png')
    }
    create(){
        this.add.image(395, 180, 'clear').setScale(0.6);

            this.input.on('pointerup', () => {
            this.scene.stop('LevelClear');
            this.scene.start('StartScene');  
        });
    }
  }