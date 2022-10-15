const gameState = {
    score: 0,
	life: 3,
	width: 2000,
	height: 500,
	  };

const config = {
  type: Phaser.AUTO,
  width: 800,
	height: 1000,
	//backgroundColor: "b9eaff",
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {y: 700},
			enableBody: true,
			debug: false,
		}
	},
  scene: [StartScene, GameScene]
}

const game = new Phaser.Game(config)