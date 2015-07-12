Score.TITLE = "Planet Invasion";
Score.WELCOME = "Try to not to get killed too soon boy";
Score.SCORE_TXT = "Score: ";

Score.MOTIVATIONAL_PHRASES = [
  "Is that all you got? Thank god we didn't have big hopes on you.",
  "Ohhh come on!!! A blind man can do better.", 
  "Next time you could really try.", 
  "There it goes. Our last hope is gone. LOL just kidding."
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
  
  var title = new PIXI.Text(Score.TITLE, {font:"bold 18px Arial", align: "left", fill:"red"});
  title.position.x = 10;
  title.position.y = 5;
  container.addChild(title);
  
  this.motivationalMsg = new PIXI.Text(Score.WELCOME, {
    font : "bold 14px Courier",
    align : "left",
    fill : "red"
  });
  this.motivationalMsg.position.x = 10;
  this.motivationalMsg.position.y = 30;
  container.addChild(this.motivationalMsg);
  this.movationalMsgIndex = null;
  
  this.scoreText = new PIXI.Text("Score: ", {font:"bold 14px Courier", align: "left", fill:"red"});
  this.scoreText.position.x = (canvasWidth / 4) * 3;
  this.scoreText.position.y = 10;
  container.addChild(this.scoreText);
  
  this.isGameOver = false;
  this.active = true;
  
  var currentScore = 0;
  
  /**
   * Increment the score in the given number of points.
   * @param points Points to increment the score to.
   */
  this.incrementScore = function(points) {
    currentScore = currentScore + points;
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
