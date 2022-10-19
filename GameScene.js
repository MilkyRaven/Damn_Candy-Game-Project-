// HERE IS WHERE THE MAIN GAME GOES (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧
// let's create a GameScene class
class GameScene extends Phaser.Scene {
    constructor(){
      super({key: 'GameScene'})
    }


    // LOADING THE MATERIAL WE NEED ---------------------------------------------------------------------------------
preload () {	
    this.load.image('bg', 'img/bg.png')
    this.load.spritesheet('run', 'img/sprites/run.png', {frameWidth: 1000, frameHeight: 1000});
    this.load.spritesheet('player', 'img/sprites/playerSprites.png', {frameWidth: 1000, frameHeight: 1000})
	this.load.image('plataforma', 'img/plataforma.png');
    this.load.image('enemy', 'img/enemy.png');
    this.load.image('boss', 'img/boss.png');
    this.load.image('hud', 'img/hub.png');
    this.load.image('portal', 'img/portal.png');
    this.load.image('star', 'img/star.png')
    this.load.image('magic', 'img/magic.png')
    this.load.audio('theme', 'sounds/gameTheme.mp3');
    this.load.audio('collect','sounds/collect.wav' );
    this.load.audio('hit','sounds/playerHit.wav' );
    this.load.audio('pop','sounds/pop.wav' );
    this.load.audio('attack','sounds/magic.wav' );
}

    // "DRAWING" THE SCENE -------------------------------------------------------------------------------------------

    create () {
    
    //SOUND EFFECTS ------
    let collect = this.sound.add('collect');
    let hit = this.sound.add('hit');
    let pop = this.sound.add('pop');

    //BACKGROUND -----------------------------------------------------------------------------------------------------
       this.add.image(600, 400, 'bg');
       this.add.image(1800, 400, 'bg');
       this.add.image(3000, 400, 'bg');
       this.add.image(4200, 400, 'bg');
       this.add.image(5400, 400, 'bg');

   //PORTAL ---------------------------------------------------------------------------------------------------------
   let endLevel = this.physics.add.sprite(4950, 200, 'portal').setScale(1.5);
   endLevel.setCollideWorldBounds(true);

    //PLAYER ----------------------------------------------------------------------------------------------------------
	    let player = this.player = this.physics.add.sprite(250, 250, 'player').setScale(0.11);
        

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('player', { start: 2, end: 11}),
            frameRate: 20,
            repeat: -1 // -1 to repeat
          });
          this.anims.create({
            key: 'jump',
            frames: [ { key: 'player', frame: 12 } ],
            frameRate: 1,
            repeat: -1 // -1 to repeat
          });
          this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 1}),
            frameRate: 4,
            repeat: -1 // -1 to repeat
          });
        
        player.setBounce(0.3); //little bounce as you fall
            //> let the camera follow the player
            this.cameras.main.setBounds(0, 0, gameState.width, gameState.height);
            this.physics.world.setBounds(0, 0, gameState.width, gameState.height);
            this.cameras.main.startFollow(this.player);
    

    //PLATFORMS ---------------------------------------------------------------------------------------------------------
    const platforms = this.physics.add.staticGroup();
    platforms.create(175, 800, 'plataforma').setScale(0.5, 0.5).refreshBody();
    platforms.create(800, 800, 'plataforma').setScale(0.5, 0.5).refreshBody();
    platforms.create(1500, 700, 'plataforma').setScale(0.5, 0.5).refreshBody();
    platforms.create(2200, 800, 'plataforma').setScale(0.5, 0.5).refreshBody();
    platforms.create(2800, 700, 'plataforma').setScale(0.5, 0.5).refreshBody();
    platforms.create(3500, 650, 'plataforma').setScale(0.5, 0.5).refreshBody();
    platforms.create(4200, 700, 'plataforma').setScale(0.5, 0.5).refreshBody();
    platforms.create(4800, 800, 'plataforma').setScale(0.5, 0.5).refreshBody();


    //HUD CONTAINER ----------------------------------------------------------------------------------------------------
    let scoreText = this.add.text(160, 60, `${gameState.score}`, {fill: '#FFFFFF', fontSize: '30px'})
    let heartText = this.add.text(310, 60, `${gameState.hearts}`, {fill: '#FFFFFF', fontSize: '30px'}, )
    let hud = this.add.image(190, 70, 'hud').setScale(0.9);
    let contenedor = this.add.container(50, 250);
     contenedor.add([hud, scoreText, heartText]);
     this.tweens.add({
         targets: contenedor,
         duration: 500,
         y: 0
     });
     contenedor.setScrollFactor(0);

     //CANDY STARDUST! 
    let stars = this.physics.add.group({
        key: 'star',
        repeat: 150,
        setXY: { x: 120, y: 0, stepX: 35 }
    });
    
    stars.children.iterate(function (child) {
    
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    
    });

    //COLLISIONS  ----------------------------------------------------------------------------------------------------------
     
     this.player.setCollideWorldBounds(true); // so the player doesn't fall from the world limits
    this.physics.add.collider(this.player, platforms); // collision between player and platforms
    this.physics.add.collider(endLevel, platforms); //collision between portal and platforms
    this.physics.add.collider(stars, platforms);
    this.physics.add.overlap(player, stars, collectStar, null, this); //star candy collision
    //> star collecting
        function collectStar (player, star) {
        star.disableBody(true, true);
        collect.play();
        gameState.score += 10;
        //console.log(gameState.score);
        scoreText.setText(`${gameState.score}`);
        }
    
    
    //ATTACK
    this.magic = this.physics.add.group();

    
    //ENEMIES  --------------------------------------------------------------------------------------------------------------
    
    //> Falling Enemies! BAD CANDY
    const badCandy = this.physics.add.group();
    function generateBadCandy () {
    const xCoordinate = Math.random() * 5000;
    badCandy.create(xCoordinate, 50, 'enemy').setScale(0.15);  
    }

        //>Bad Candy Loop
        let badCandyLoop = this.time.addEvent({
            delay: 100,
            callback: generateBadCandy,
            callbackScope: this,
            loop: true 
        })
    
    //Candy Collisions
    
    //> When hitted by the candy
    this.physics.add.overlap (this.player, badCandy, hitByBadCandy, null, this);

    function hitByBadCandy(player, candy) {
        if (candy.body.touching) {
            candy.disableBody(true, true)
            hit.play();
            let hitTween = this.tweens.add({
                targets: player,
                angle: 360,
                x: player.x - 50,
                y: player.y - 20,
                ease: 'Quadratic',
                duration: 600,
                onComplete: function() {
                gameState.hearts -=1;
                heartText.setText(`${gameState.hearts}`);
                console.log(gameState.hearts);
                 },
                 onCompleteScope: this
            });
        } 
    }

    //>CLEAR CANDY ------------------------------------------------------------------------------------------------------
    this.physics.add.overlap (this.magic, badCandy, clearCandy, null, this);

    function clearCandy(magic, candy) {
        if (candy.body.touching) {
            candy.disableBody(true, true);
            pop.play();
            //gameState.score +=20;
            //scoreText.setText(`${gameState.score}`);
            // this.tweens.add({
            //     targets: candy,
            //     angle: 360,
            //     x: candy.x - 50,
            //     y: candy.y - 20,
            //     ease: 'Quadratic',
            //     duration: 600,
            //  });
        } 
    }

    //level clear
    this.physics.add.overlap(this.player, endLevel, function() {
        this.cameras.main.fade(800, 0, 0, 0, false, function(camera, progress) {
          if (progress > .9) {
            gameState.theme.stop();
            this.scene.stop('GameScene');
            this.scene.start('LevelClear');
          }
        });
      }, null, this);


    //   //BOSS test ----------------------------------------------------------------------------------------------------------
	//     let boss = this.boss = this.physics.add.sprite(400, 40, 'boss').setScale(1);
    //     player.setBounce(0.3); //little bounce as you fall
    //     boss.setCollideWorldBounds(true);
    //     //this.bossAttack.create(boss.x, boss.y, 'magic').setVelocityX(-300).setScale(0.05);
}

// UPDATE ---------------------------------------------------------------------------------------------------------------------------------
update () {
    // > updating player input 
    const cursors = this.input.keyboard.createCursorKeys();

	if(cursors.left.isDown){
		this.player.setVelocityX(-500)
        this.player.anims.play('run', true);
        this.player.flipX = true;
	} else if (cursors.right.isDown) {
		this.player.setVelocityX(500);
        this.player.anims.play('run', true);
        this.player.flipX = false;
        }
	 else if (cursors.up.isDown && this.player.body.touching.down) {
		this.player.setVelocityY(-500);
        this.player.anims.play('jump', true);
	 
    //Attack
    
    } else if (cursors.space.isDown) {
        this.magic.create(this.player.x, this.player.y -40, 'magic').setGravityY(-3000).setScale(0.05);
        let attack = this.sound.add('attack');
        attack.play(); 
    } 
     
    //Idle

	else {
		this.player.setVelocityX(0);
        this.player.anims.play('idle', true);
	}
    
    //> falling from the platforms -------------------------------------------------------------------------------------------------------------------

    if (this.player.y > 800){
        this.cameras.main.shake(240, .01, false, function(camera, progress) {
        if(progress > .9) {
        let hit = this.sound.add('hit');
        hit.play();
        this.scene.restart(this.GameScene)
        gameState.hearts -=1;
        }
      });
    }
    
    //> game over ------------------------------------------------------------------------------------------------------------------------------------
    if(gameState.hearts === 0) {
        this.scene.stop('GameScene');
        gameState.theme.stop();
        gameState.hearts = 3;
        this.scene.start('EndingScene'); 
    }
    
}
}