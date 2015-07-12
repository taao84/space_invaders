Score.TITLE = "Planet Invasion";
Score.WELCOME = "Try to not to get killed too soon boy";
Score.SCORE_TXT = "Score: ";
Score.GUN_SHOTS_TXT = "Gun shots: ";

Score.MOTIVATIONAL_PHRASES = [
  "Is that all you got? Thank god we didn't have big hopes on you.",
  "Ohhh come on!!! A blind man can do better.", 
  "Next time you could really try.", 
  "There it goes. Our last hope is gone. LOL just kidding.",
  "Uhhhh that was close. Just messing with you are really bad at this."
];

/**
 * Constructor.
 * @param container the container were this Score will be rendered.
 * @param canvasWidth The width of the canvas were this Score is going to be placed.
 * @param canvasHeigth The height of the canvas were this Score is going to be placed.
 */
function Score (container, canvasWidth, canvasHeight) {
  var graphics = new PIXI.Graphics();
  //set a fill and a line style again and draw a rectangle
  graphics.lineStyle(2, 0x0000FF, 1);
  graphics.beginFill(0x000000, 1);
  graphics.drawRect(1, 1, (canvasWidth - 2), 50);
  graphics.zIndex = 999;
  container.addChild(graphics);
  
  var title = new PIXI.Text(Score.TITLE, {
    font : "bold 18px Arial",
    align : "left",
    fill : "red",
    stroke : "#FFFFFF",
    strokeThickness : 2,
    dropShadow: true,
    dropShadowColor: "#FFFFFF",
    dropShadowDistance: 2
  });
  title.position.x = 10;
  title.position.y = 5;
  container.addChild(title);
  
  this.motivationalMsg = new PIXI.Text(Score.WELCOME, {
    font : "bold 14px Courier",
    align : "left",
    fill : "red"
  });
  this.motivationalMsg.position.x = 10;
  this.motivationalMsg.position.y = 35;
  container.addChild(this.motivationalMsg);
  this.movationalMsgIndex = null;
  
  this.scoreText = new PIXI.Text(Score.SCORE_TXT, {font:"bold 14px Courier", align: "left", fill:"red"});
  this.scoreText.position.x = ((canvasWidth / 4) * 3) + 10;
  this.scoreText.position.y = 5;
  container.addChild(this.scoreText);
  var currentScore = 0;
  
  this.gunShotsText = new PIXI.Text(Score.GUN_SHOTS_TXT, {font:"bold 14px Courier", align: "left", fill:"red"});
  this.gunShotsText.position.x = ((canvasWidth / 4) * 3) + 10;
  this.gunShotsText.position.y = 20;
  container.addChild(this.gunShotsText);
  this.currentGunShots = 0;
  
  this.isGameOver = false;
  this.active = true;
  
  
  /**
   * Increment the score in the given number of points.
   * @param points Points to increment the score to.
   */
  this.incrementScore = function(points) {
    currentScore = currentScore + points;
  };
  
  /**
   * Increment the score in the given number of points.
   * @param points Points to increment the score to.
   */
  this.incrementGunShots = function(points) {
    this.currentGunShots++;
  };
  
  this.getCurrentScore = function() {
    return currentScore;
  }
}

/**
 * Increase the score. Use it when an enemy is killed.
 */
Score.prototype.enemyKilled = function() {
  this.incrementScore(10);
}

/**
 * Increase the score. Use it when an enemy is killed.
 */
Score.prototype.gameOver = function() {
  this.isGameOver = true;
}

/**
 * Draw the stage.
 * @param canvas The canvas object where this object is going to be drawn.
 * @param graphics A graphics object used to draw this object.
 */
Score.prototype.draw = function(canvas, graphics) {
  if (this.active) {
    var score = this.getCurrentScore();
    this.scoreText.text = Score.SCORE_TXT + score;
    this.gunShotsText.text = Score.GUN_SHOTS_TXT + this.currentGunShots;
    
    if (this.isGameOver) {
      this.motivationalMsg.text = Score.MOTIVATIONAL_PHRASES[this.movationalMsgIndex];
      this.active = false;
    }
  }
}

/**
 * Update this score.
 */
Score.prototype.update = function() {
  if (this.isGameOver) {
    this.movationalMsgIndex = Math.floor(Math.random() * Score.MOTIVATIONAL_PHRASES.length);
  }
}
