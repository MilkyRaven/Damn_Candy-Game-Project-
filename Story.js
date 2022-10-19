class Story extends Phaser.Scene {
    constructor(){
      super({ key: 'Story' });
    }

    preload () {
        this.load.audio('theme', 'sounds/gameTheme.mp3');
        this.load.image('story', 'img/story.png')
        this.load.audio('click','sounds/click.wav' );
    }
    create(){
        //Music
        gameState.theme = this.sound.add('theme');
        gameState.theme.loop = true;
        gameState.theme.play()
        this.story = this.add.image(600, 450, 'story').setScale(1.5);
    
        this.input.on('pointerup', () => {
            this.scene.stop('Story');
            let click = this.sound.add('click');
            click.play();
            this.scene.start('GameScene');
        });
    }
  }
