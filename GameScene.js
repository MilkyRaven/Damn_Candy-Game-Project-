// HERE IS WHERE THE MAIN GAME GOES (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧
// let's create a GameScene class
class GameScene extends Phaser.Scene {
    constructor(){
      super({key: 'GameScene'})
    }


    // LOADING THE MATERIAL WE NEED ---------------------------------------------------------------------------------
preload () {	
    this.load.image('magicalGirl', 'img/magical girl.png');
	this.load.image('plataforma', 'img/plataforma.png');
    this.load.image('enemy', 'img/enemy.png');
    this.load.image('boss', 'img/boss.png');
    this.load.image('hud', 'img/hub.png');
    this.load.image('portal', 'img/portal.png');
    this.load.image('star', 'img/star.png')
    this.load.image('magic', 'img/magic.png')
    this.load.audio('theme', 'sounds/gameTheme.wav');
}

    // "DRAWING" THE SCENE -------------------------------------------------------------------------------------------

    create () {
    
    //gameState.active = true  (I may need this later)

    //PORTAL ---------------------------------------------------------------------------------------------------------
        let endLevel = this.physics.add.sprite(4950, 200, 'portal').setScale(0.2);
        endLevel.setCollideWorldBounds(true);

    //PLAYER ----------------------------------------------------------------------------------------------------------
	    let player = this.player = this.physics.add.sprite(40, 400, 'magicalGirl').setScale(0.5);
        player.setBounce(0.3); //little bounce as you fall
            //> let the camera follow the player
            this.cameras.main.setBounds(0, 0, gameState.width, gameState.height);
            this.physics.world.setBounds(0, 0, gameState.width, gameState.height);
            this.cameras.main.startFollow(this.player);

            //> Danger Zone Warning > If player life is equal to 1, red tint
            if(gameState.hearts === 1){
            player.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);
            }         

    //PLATFORMS ---------------------------------------------------------------------------------------------------------
    const platforms = this.physics.add.staticGroup();
    platforms.create(0, 800, 'plataforma').setScale(0.5, 0.5).refreshBody();
    platforms.create(300, 800, 'plataforma').setScale(0.5, 0.5).refreshBody();
    platforms.create(600, 800, 'plataforma').setScale(0.5, 0.5).refreshBody();
    platforms.create(800, 800, 'plataforma').setScale(0.5, 0.5).refreshBody();
    platforms.create(1000, 800, 'plataforma').setScale(0.5, 0.5).refreshBody();
    platforms.create(1200, 800, 'plataforma').setScale(0.5, 0.5).refreshBody();
    platforms.create(1500, 800, 'plataforma').setScale(0.5, 0.5).refreshBody();
    platforms.create(1700, 800, 'plataforma').setScale(0.5, 0.5).refreshBody();
    platforms.create(2300, 800, 'plataforma').setScale(0.5, 0.5).refreshBody();
    platforms.create(2700, 800, 'plataforma').setScale(0.5, 0.5).refreshBody();
    platforms.create(3000, 800, 'plataforma').setScale(0.5, 0.5).refreshBody();
    platforms.create(3500, 800, 'plataforma').setScale(0.5, 0.5).refreshBody();
    platforms.create(4000, 800, 'plataforma').setScale(0.5, 0.5).refreshBody();
    platforms.create(4500, 800, 'plataforma').setScale(0.5, 0.5).refreshBody();
    platforms.create(4800, 800, 'plataforma').setScale(0.5, 0.5).refreshBody();


    //HUD CONTAINER ----------------------------------------------------------------------------------------------------
    let scoreText = this.add.text(68, 32, `${gameState.score}`, {fill: '#FFFFFF', fontSize: '20px'})
    let heartText = this.add.text(165, 27, `${gameState.hearts}`, {fill: '#FFFFFF', fontSize: '20px'}, )
    let hud = this.add.image(100, 35, 'hud').setScale(1);
    let contenedor = this.add.container(10, 10);
     contenedor.add([hud, scoreText, heartText]);
     this.tweens.add({
         targets: contenedor,
         duration: 800,
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
		this.player.setVelocityX(-400)
	} else if (cursors.right.isDown) {
		this.player.setVelocityX(400)}
	 else if (cursors.up.isDown && this.player.body.touching.down) {
		this.player.setVelocityY(-500)
	 
    //Attack
    
    } else if (cursors.space.isDown) {
        this.magic.create(this.player.x, this.player.y -40, 'magic').setGravityY(-3000).setScale(0.05);
     } 
     
    //Protect

        else if (cursors.down.isDown) {
        //this.shield = this.physics.add.sprite(this.player.x, this.player.y, 'magic').setScale(0.2);
      }
     
    //Idle

	else {
		this.player.setVelocityX(0);
	}
    
    //> falling from the platforms -------------------------------------------------------------------------------------------------------------------

    if (this.player.y > 800){
        this.cameras.main.shake(240, .01, false, function(camera, progress) {
        if(progress > .9) {
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