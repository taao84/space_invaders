/**
 * @param canvasWidth The width of the canvas were this enemy is going to be placed.
 * @param canvasHeigth The height of the canvas were this enemy is going to be placed.
 */
function Enemy(container, canvasWidth, canvasHeight) {
  this.NORMAL_ENEMY_SPRITE = "galaga_3_7.png";
  this.EXPLODED_ENEMY_SPRITE = "galaga_enemy_explosion_1_3.png";
  
  this.gameContainer = container;
  this.tileSprite = PIXI.Sprite.fromFrame(this.NORMAL_ENEMY_SPRITE);
  
  this.gameContainer.addChild(this.tileSprite);
  
  this.active = true;
  this.timeDestruction = null;
  this.exploded = false;
  this.age = Math.floor(Math.random() * 128);

  this.color = "#A2B";

  this.x = canvasWidth / 4 + Math.random() * canvasHeight / 2;
  this.y = 0;
  this.xVelocity = 0
  this.yVelocity = 0.5;

  this.width = 32;
  this.height = 32;
  
  //Initialize player
  this.tileSprite.interactive = false;
  // is the tile selected?
  this.tileSprite.isSelected = false;
  // place the tile
  this.tileSprite.position.x = this.x;
  this.tileSprite.position.y = this.y;
  
  this.getX = function() {
    return this.x;
  }
  
  this.getY = function() {
    return this.y;
  }
  
  this.getWidth = function() {
    return this.width;
  }
  
  this.getHeight = function() {
    return this.height;
  }
};

/**
 * Draw this object.
 * @param canvas The canvas object where this object is going to be drawn.
 * @param graphics A graphics object used to draw this object.
 */
Enemy.prototype.draw = function(canvas, graphics) {
  if (this.exploded) {
    if (this.active) {
      canvas.removeChild(this.tileSprite);
      
      this.tileSprite = PIXI.Sprite.fromFrame(this.EXPLODED_ENEMY_SPRITE);
      // place the tile
      this.tileSprite.position.x = this.x;
      this.tileSprite.position.y = this.y;
      
      canvas.addChild(this.tileSprite);
    }
    else {
      canvas.removeChild(this.tileSprite);
    }
  }
  else {
    // If there is no sprite loaded then draw a rectangle
    if (!this.tileSprite) {
      graphics.beginFill(this.color);
      graphics.lineStyle(1, this.color);
      //draw a rectangle
      graphics.drawRect(this.x, this.y, this.width, this.height);
    }    
  }
};

/**
 * Update this enemy.
 */
Enemy.prototype.update = function() {
  if (this.exploded) {
    var timeFromDestruction = ((new Date()).getTime()) - this.timeDestruction;
    if (timeFromDestruction > 1000) {
      this.active = false;
    }
  }
  else {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
  
    this.tileSprite.position.x = this.x;
    this.tileSprite.position.y = this.y;
    
    this.xVelocity = 3 * Math.sin(this.age * Math.PI / 64);
  
    this.age++;
  
    this.active = this.active && SpaceInvadersController.isElementsInBounds(this);
  }
};

/**
 * Explode this enemy.
 */
Enemy.prototype.explode = function() {
  console.log("Boom enemy exploded!!");
  this.exploded = true;
  this.timeDestruction = (new Date()).getTime();
}
