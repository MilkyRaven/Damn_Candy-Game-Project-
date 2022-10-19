class LevelClear extends Phaser.Scene {
    constructor(){
      super({ key: 'LevelClear'});
    }

    preload () {
        this.load.image('clear', 'img/levelclear.png')
        this.load.audio('click','sounds/click.wav' );
        this.load.audio('portal','sounds/portal.wav' );
    }
    create(){
        let win = this.sound.add('portal');
        win.play()
        this.add.image(600, 430, 'clear').setScale(1.25);
        this.add.text(880, 520, `${gameState.score}`, {fill: '#FFFFFF', fontSize: '40px'})
        
        //RATINGS
        if (gameState.score <= 400){
        let rate = this.add.text(690, 0, "B", {fill: '#F8DA49', fontSize: '100px'})
        this.tweens.add({
            angle: 360,
            targets: rate,
            duration: 2000,
            y: 500,
            ease: 'Bounce',
        });
        } else if (gameState.score >= 700){
            let rate = this.add.text(690, 0, "A", {fill: '#F8DA49', fontSize: '100px'})
            this.tweens.add({
            angle: 360,
            targets: rate,
            duration: 2000,
            y: 500,
            ease: 'Bounce',
            });
            } else if (gameState.score >= 900){
                let rate = this.add.text(690, 0, "S", {fill: '#F8DA49', fontSize: '100px'})
                this.tweens.add({
                    angle: 360,
                    targets: rate,
                    duration: 2000,
                    y: 500,
                    ease: 'Bounce',
                });
                } else if (gameState.score >= 1000){
                    let rate = this.add.text(690, 0, "SS", {fill: '#F8DA49', fontSize: '100px'})
                    this.tweens.add({
                        angle: 360,
                        targets: rate,
                        duration: 2000,
                        y: 500,
                        ease: 'Bounce',
                    });
                    }
        
        let creditsText = this.add.text(200, 210, 'Thanks for playing! ૮ • ﻌ - ა˚ʚ♡ɞ˚ Main theme: "Adhesive Wombat" by Night Shade || Sound Effects: 8 bit + 16 bit - by ivy ˚ʚ♡ɞ˚', {fill: '#FFFFFF', fontSize: '30px'})
        let creditsCont = this.add.container(400, 480);
        creditsCont.add([creditsText]);
        this.tweens.add({
         targets: creditsCont,
         duration: 17000,
         x: -3800
     });

            this.input.on('pointerup', () => {
            this.scene.stop('LevelClear');
            let click = this.sound.add('click');
            click.play();
            gameState.score = 0;
            gameState.hearts = 3;
            this.scene.start('StartScene');
            gameState.theme.stop();
        });
    }
  }