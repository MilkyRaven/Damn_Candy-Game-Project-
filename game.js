const gameState = {
    score: 0,
	life: 3,
	width: 2000,
	height: 400,
	  };

const config = {
  type: Phaser.AUTO,
  width: 800,
	height: 400,
	//backgroundColor: "b9eaff",
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {y: 700},
			enableBody: true,
			debug: true,
		}
	},
  scene: [StartScene, GameScene]
}

const game = new Phaser.Game(config)