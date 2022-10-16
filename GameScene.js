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
    this.load.image('hub', 'img/hub.png');
    this.load.image('portal', 'img/portal.png');
    this.load.image('sky', 'img/b1.png');
    this.load.image('mountains', 'img/b2.png');
    this.load.image('moon', 'img/b3.png');
    this.load.image('star', 'img/star.png')
}

    // "DRAWING" THE SCENE -------------------------------------------------------------------------------------------

    create () {
    
    //gameState.active = true  (I may need this later)

    //BACKGROUND ------------------------------------------------------------------------------------------------------
        //> Starry Night
        this.add.image(0, 0, 'sky').setScale(0.8);
        this.add.image(700, 0, 'sky').setScale(0.8);
        this.add.image(1400, 0, 'sky').setScale(0.8);
        this.add.image(1900, 0, 'sky').setScale(0.8);
        
        //> Moon
        let moon = this.add.image(500, 100, 'moon').setScale(0.6);
        moon.setScrollFactor(0);
    
    //PORTAL ---------------------------------------------------------------------------------------------------------
        let endLevel = this.physics.add.sprite(1985, 60, 'portal').setScale(0.2);
        endLevel.setCollideWorldBounds(true);

    //PLAYER ----------------------------------------------------------------------------------------------------------
	    let player = this.player = this.physics.add.sprite(5, 40, 'magicalGirl').setScale(0.3);
        player.setBounce(0.2); //little bounce as you fall
            //> let the camera follow the player
            this.cameras.main.setBounds(0, 0, gameState.width, gameState.height);
            this.physics.world.setBounds(0, 0, gameState.width, gameState.height);
            this.cameras.main.startFollow(this.player);

            //> Danger Zone Warning > If player life is equal to 1, red tint
            if(gameState.hearts === 1){
            player.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);
            }
    
    //HUD CONTAINER ----------------------------------------------------------------------------------------------------
    let scoreText = this.add.text(100, 27, `${gameState.score}`, {fill: '#FFFFFF', fontSize: '20px'})
    let heartText = this.add.text(165, 27, `${gameState.hearts}`, {fill: '#FFFFFF', fontSize: '20px'}, )
    let hub = this.add.image(100, 35, 'hub').setScale(1);
    let contenedor = this.add.container(10, 10);
     contenedor.add([hub, scoreText, heartText]);
     this.tweens.add({
         targets: contenedor,
         duration: 800,
         y: 0
     });
     contenedor.setScrollFactor(0);
         

    //PLATFORMS ---------------------------------------------------------------------------------------------------------
    const platforms = this.physics.add.staticGroup();
	platforms.create(0, 400, 'plataforma').setScale(0.5, 0.5).refreshBody();
    //350 to 350 for a linear platform
    platforms.create(350, 400, 'plataforma').setScale(0.5, 0.5).refreshBody();
    platforms.create(700, 400, 'plataforma').setScale(0.5, 0.5).refreshBody();
    platforms.create(1000, 400, 'plataforma').setScale(0.5, 0.5).refreshBody();
    platforms.create(1500, 400, 'plataforma').setScale(0.5, 0.5).refreshBody();
    platforms.create(1700, 400, 'plataforma').setScale(0.5, 0.5).refreshBody();
    platforms.create(2000, 400, 'plataforma').setScale(0.5, 0.5).refreshBody();
    

     //CANDY STARDUST! 
    let stars = this.physics.add.group({
        key: 'star',
        repeat: 70,
        setXY: { x: 12, y: 0, stepX: 70 }
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
        console.log(gameState.score);
        scoreText.setText(`${gameState.score}`);
        }
    
    //ENEMIES  --------------------------------------------------------------------------------------------------------------
//     const enemies = this.physics.add.group();
//     function generateEnemy () {
//     const xCoordinate = Math.random() * 1700;
//     enemies.create(xCoordinate, 10, 20, 20, 'enemy');  
//     }

//     //enemy loop
//    let enemyGenLoop = this.time.addEvent({
//     delay: 250,
//     callback: generateEnemy,
//     callbackScope: this,
//     loop: true 
//    })

//    //Update score
//     this.physics.add.collider(enemies, platforms, function (enemy){
//         enemy.destroy();
//         //gameState.score += 5;
//       })
      
//       //Losing condition
//     this.physics.add.collider(this.player, enemies, () => {
//         // Logic to end the game
//         enemyGenLoop.destroy();
//         //gameState.score = 0;
//         gameState.hearts -= 1;
//         this.scene.restart();

//         //Re-starting the game
//         this.input.on('pointerup', () => {
//             //gameState.score = 0;
//             this.scene.restart()
//           })
//     });

    //level clear
    this.physics.add.overlap(this.player, endLevel, function() {
        this.cameras.main.fade(800, 0, 0, 0, false, function(camera, progress) {
          if (progress > .9) {
            this.scene.stop('GameScene');
            this.scene.start('LevelClear');
          }
        });
      }, null, this);
}

// UPDATE ---------------------------------------------------------------------------------------------------------------------------------
update () {
    // > updating player input 
    const cursors = this.input.keyboard.createCursorKeys();

	if(cursors.left.isDown){
		this.player.setVelocityX(-300)
	} else if (cursors.right.isDown) {
		this.player.setVelocityX(300)}
	 else if (cursors.space.isDown && this.player.body.touching.down) {
		this.player.setVelocityY(-400)
	 }
	else {
		this.player.setVelocityX(0);
	}
    
    //> falling from the platforms -------------------------------------------------------------------------------------------------------------------

    if (this.player.y > 325){
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
        gameState.hearts = 3;
        this.scene.start('EndingScene'); 
    }
}
}