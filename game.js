const gameState = {
    score: 0,
	hearts: 3,
	width: 5000,
	height: 900,
	  };

const config = {
  type: Phaser.AUTO,
  width: 1200,
	height: 900,
	//backgroundColor: "b9eaff",
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {y: 900},
			enableBody: true,
			debug: false,
		}
	},
  scene: [EndingScene, StartScene, GameScene, LevelClear]
}

const game = new Phaser.Game(config)