// creating GameScene class
class GameScene extends Phaser.Scene {
    constructor(){
      super({key: 'GameScene'})
    }

preload () {	
    this.load.image('magicalGirl', 'img/magical girl.png');
	this.load.image('plataforma', 'img/plataforma.png');
    this.load.image('enemy', 'img/enemy.png');
   
}

create () {

    // //Score
    gameState.scoreText = this.add.text(16, 16, 'Score: 0', {fontSize: '20px', fill:'#FFA8CF'});
    
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
    
    //Enemies
    const enemies = this.physics.add.group();
    function generateEnemy () {
    const xCoordinate = Math.random() * 1800;
    enemies.create(xCoordinate, 10, 20, 20, 'enemy');  
    }

    //enemy loop
   let enemyGenLoop = this.time.addEvent({
    delay: 250,
    callback: generateEnemy,
    callbackScope: this,
    loop: true 
   })

   //Player
	this.player = this.physics.add.sprite(5, 40, 'magicalGirl').setScale(0.3);
    this.player.setBounce(0.2);
    this.cameras.main.setBounds(0, 0, gameState.width, gameState.height);
    this.physics.world.setBounds(0, 0, gameState.width, gameState.height);
    this.cameras.main.startFollow(this.player);

    // so it doesn't fall from the platform
    this.player.setCollideWorldBounds(true);
	
    //Collisions
    this.physics.add.collider(this.player, platforms);
    
    let stars = this.physics.add.group({
        key: 'star',
        repeat: 20,
        setXY: { x: 210, y: 0, stepX: 70 }
    });

    this.physics.add.collider(stars, platforms);
    
    stars.children.iterate(function (child) {
    
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    
    });

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
        this.add.text(this.player.x -50, this.player.y - 200, 'GAME OVER', {fontSize: '30px', fill:'#FFA8CF'})
        this.add.text(this.player. x - 50, this.player.y - 100, 'Click to Restart', {fontSize: '25px', fill:'#FFA8CF'})
        
        //Re-starting the game
        this.input.on('pointerup', () => {
            gameState.score = 0;
            this.scene.restart()
          })
    });
}

update () {
    //update gamer input

    const cursors = this.input.keyboard.createCursorKeys();

	if(cursors.left.isDown){
		this.player.setVelocityX(-300)
	} else if (cursors.right.isDown) {
		this.player.setVelocityX(300)}
	 else if (cursors.space.isDown && this.player.body.touching.down) {
		this.player.setVelocityY(-500)
	 }
	else {
		this.player.setVelocityX(0);
	}
    if (this.player.y > 355){this.cameras.main.shake(240, .01, false, function(camera, progress) {
        if(progress > .9) {
          this.scene.restart(this.GameScene)}
      });
    }
}
}