// creating GameScene class
class GameScene extends Phaser.Scene {
    constructor(){
      super({key: 'GameScene'})
    }

preload () {	
	this.load.image('magicalGirl', 'img/magical girl.png');
	this.load.image('plataforma', 'img/plataforma.png')
    this.load.image('background', 'img/background.png');
    this.load.image('enemy', 'img/enemy.png')
    
    //load music
    //this.load.audio('pixel', 'sounds/pixel.wav');
    this.load.audio('restart-bop', 'sounds/restart.wav');
}

create () {
	
    //Score
    gameState.scoreText = this.add.text(16, 16, 'Score: 0', {fontSize: '20px', fill:'#FFA8CF'})
    

    //Background
    //this.add.image(200, 200, 'background');
    
    //Demo Platfoms
    const platforms = this.physics.add.staticGroup();
	platforms.create(10, 400, 'plataforma').setScale(0.5, 0.5).refreshBody();
    platforms.create(100, 400, 'plataforma').setScale(0.5, 0.5).refreshBody();
    platforms.create(300, 400, 'plataforma').setScale(0.5, 0.5).refreshBody();
    platforms.create(450, 400, 'plataforma').setScale(0.5, 0.5).refreshBody();
    platforms.create(600, 400, 'plataforma').setScale(0.5, 0.5).refreshBody();
    platforms.create(700, 400, 'plataforma').setScale(0.5, 0.5).refreshBody();
    platforms.create(800, 400, 'plataforma').setScale(0.5, 0.5).refreshBody();
    platforms.create(1000, 400, 'plataforma').setScale(0.5, 0.5).refreshBody();
    platforms.create(1200, 400, 'plataforma').setScale(0.5, 0.5).refreshBody();
    platforms.create(1500, 400, 'plataforma').setScale(0.5, 0.5).refreshBody();
    platforms.create(1600, 400, 'plataforma').setScale(0.5, 0.5).refreshBody();
    platforms.create(1700, 400, 'plataforma').setScale(0.5, 0.5).refreshBody();
    platforms.create(2000, 400, 'plataforma').setScale(0.5, 0.5).refreshBody();

    //Obstacles
	// const obstacles = this.physics.add.staticGroup();
	// const deadlyObstacles = this.physics.add.staticGroup();
	// obstacles.create(300, 315).setScale(2,2).refreshBody();
	// //deadlyObstacles.create(380, 390).setScale(3,0.5).refreshBody();
	// obstacles.create(450, 280).setScale(2,4).refreshBody();

    //Enemies
    const enemies = this.physics.add.group();
    function generateEnemy () {
    const xCoordinate = Math.random() * 800;
    enemies.create(xCoordinate, 10, 30, 30, 'enemy');  
    }

    //enemy loop
   let enemyGenLoop = this.time.addEvent({
    delay: 700,
    callback: generateEnemy,
    callbackScope: this,
    loop: true 
   })

    //Player
	this.player = this.physics.add.sprite(5, 5,'magicalGirl').setScale(.35);
    this.cameras.main.setBounds(0, 0, gameState.width, gameState.height);
    this.physics.world.setBounds(0, 0, gameState.width, gameState.height)
    this.cameras.main.startFollow(this.player);

    // so it doesn't fall from the platform
    this.player.setCollideWorldBounds(true);
	
    //Collisions
    this.physics.add.collider(this.player, platforms);
	//this.physics.add.collider(this.player, obstacles);
	//this.physics.add.collider(this.player, deadlyObstacles);
    
    
    //Update score
    this.physics.add.collider(enemies, platforms, function (enemy){
        enemy.destroy();
       
        gameState.score += 5;
        gameState.scoreText.setText(`Score: ${gameState.score}`)
      })

      //Losing condition
    this.physics.add.collider(this.player, enemies, () => {
        // Logic to end the game
        enemyGenLoop.destroy();
        this.physics.pause();
        this.add.text(300, 200, 'GAME OVER', {fontSize: '30px', fill:'#FFA8CF'})
        this.add.text(250, 230, 'Click to Restart', {fontSize: '25px', fill:'#FFA8CF'})
        
        //Re-starting the game
        this.input.on('pointerup', () => {
            gameState.score = 0;
            this.scene.restart()
          })
    });

	}

update () {
    //update enemies movements
    
    //update gamer input
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
    if (this.player.y > 425){this.cameras.main.shake(240, .01, false, function(camera, progress) {
        if(progress > .9) {
          this.scene.restart(this.GameScene)}
      });
    }
}
}