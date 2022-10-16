const gameState = {
    score: 0,
	hearts: 3,
	width: 2000,
	height: 1000,
	  };

const config = {
  type: Phaser.AUTO,
  width: 800,
	height: 500,
	//backgroundColor: "b9eaff",
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {y: 700},
			enableBody: true,
			debug: false,
		}
	},
  scene: [StartScene, GameScene, EndingScene, LevelClear]
}

const game = new Phaser.Game(config)