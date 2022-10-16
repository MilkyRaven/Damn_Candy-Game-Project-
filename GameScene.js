// creating the GameScene class
class GameScene extends Phaser.Scene {
    constructor(){
      super({key: 'GameScene'})
    }

preload () {	
    this.load.image('magicalGirl', 'img/magical girl.png');
	this.load.image('plataforma', 'img/plataforma.png');
    this.load.image('enemy', 'img/enemy.png');
    this.load.image('hub', 'img/hub.png')
}

create () {

    //Player
	this.player = this.physics.add.sprite(5, 40, 'magicalGirl').setScale(0.3);
    this.player.setBounce(0.2);
    this.cameras.main.setBounds(0, 0, gameState.width, gameState.height);
    this.physics.world.setBounds(0, 0, gameState.width, gameState.height);
    this.cameras.main.startFollow(this.player);
    
    //Hud Container
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
     //end test    

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
    

     // so the player doesn't fall from the platform
     this.player.setCollideWorldBounds(true);

     //Collisions
    this.physics.add.collider(this.player, platforms);

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
	
    //Update score
    this.physics.add.collider(enemies, platforms, function (enemy){
        enemy.destroy();
       
        gameState.score += 5;
        //gameState.scoreText.setText(`Score: ${gameState.score}`)
      })
      
      //Losing condition
    this.physics.add.collider(this.player, enemies, () => {
        // Logic to end the game
        enemyGenLoop.destroy();
        gameState.score = 0;
        gameState.hearts -= 1;
        this.scene.restart();
        // this.add.text(this.player.x -50, this.player.y - 200, 'GAME OVER', {fontSize: '30px', fill:'#FFA8CF'})
        // this.add.text(this.player. x - 50, this.player.y - 100, 'Click to Restart', {fontSize: '25px', fill:'#FFA8CF'})
        
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
		this.player.setVelocityY(-400)
	 }
	else {
		this.player.setVelocityX(0);
	}
    if (this.player.y > 325 || gameState.hearts === 0){this.cameras.main.shake(240, .01, false, function(camera, progress) {
        if(progress > .9 || gameState.hearts === 0) {
          this.scene.restart(this.GameScene)}
          gameState.score = 0;
          gameState.hearts = 3;
      });
    }
}
}