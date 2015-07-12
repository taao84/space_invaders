Background.SPRITE = "assets/space_background.jpg";
Background.width = 949;
Background.height = 534;

/**
 * A class to represent the background.
 * 
 * @param canvasWidth The width of the canvas were this background is going to be placed.
 * @param canvasHeigth The height of the canvas were this background is going to be placed.
 */
function Background(container, canvasWidth, canvasHeight) {
  this.tileSprite = PIXI.Sprite.fromImage(Background.SPRITE);
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
  
  container.addChild(this.tileSprite);
  
  this.x = -Background.width + canvasWidth;
  this.y = -Background.height + canvasHeight;
  this.movingForwardX = true;
  this.movingForwardY = true;
  
  this.xVelocity = 0
  this.yVelocity = 0;
  
  // place the tile
  this.tileSprite.position.x = this.x;
  this.tileSprite.position.y = this.y;
}

/**
 * Update this object.
 */
Background.prototype.update = function() {
  this.x += this.xVelocity;
  this.y += this.yVelocity;
  
  // X movement
  if (this.x <= -309) {
    this.movingForwardX = true;
  }
  else if (this.x >= 0) {
    this.movingForwardX = false;
  }
  
  // Y movement
  if (this.y <= -234) {
    this.movingForwardY = true;
  }
  else if (this.y >= 0) {
    this.movingForwardY = false;
  }
  
  if (this.movingForwardX) {
    this.xVelocity = 1 * Math.sin(3 * Math.PI / 64);
  }
  else {
    this.xVelocity = -1 * Math.sin(3 * Math.PI / 64);
  }
  
  if (this.movingForwardY) {
    this.yVelocity = 1 * Math.sin(3 * Math.PI / 64);
  }
  else {
    this.yVelocity = -1 * Math.sin(3 * Math.PI / 64);
  }
};

/**
 * Draw this object.
 * @param canvas The canvas object where this object is going to be drawn.
 * @param graphics A graphics object used to draw this object.
 */
Background.prototype.draw = function(canvas, graphics) {
  this.tileSprite.position.x = this.x;
  this.tileSprite.position.y = this.y;
}