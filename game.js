const gameState = {
    score: 0,
	hearts: 3,
	width: 600,
	height: 3000,
	  };

const config = {
  type: Phaser.AUTO,
  width: 600,
	height: 800,
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