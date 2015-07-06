/**
 * @param canvasWidth The width of the canvas were this enemy is going to be placed.
 * @param canvasHeigth The height of the canvas were this enemy is going to be placed.
 */
function Enemy(canvasWidth, canvasHeight) {
  this.active = true;
  this.age = Math.floor(Math.random() * 128);

  this.color = "#A2B";

  this.x = canvasWidth / 4 + Math.random() * canvasHeight / 2;
  this.y = 0;
  this.xVelocity = 0
  this.yVelocity = 0.5;

  this.width = 32;
  this.height = 32;
  
  this.getX = function() {
    return this.x;
  }
  
  this.getY = function() {
    return this.y;
  }
};

/**
 * Draw this object.
 * @param canvas The canvas object where this object is going to be drawn.
 * @param graphics A graphics object used to draw this object.
 */
Enemy.prototype.draw = function(canvas, graphics) {
  graphics.beginFill(this.color);
  graphics.lineStyle(1, this.color);
  //draw a rectangle
  graphics.drawRect(this.x, this.y, this.width, this.height);
};

/**
 * 
 */
Enemy.prototype.update = function() {
  this.x += this.xVelocity;
  this.y += this.yVelocity;

  this.xVelocity = 3 * Math.sin(this.age * Math.PI / 64);

  this.age++;

  this.active = this.active && SpaceInvadersController.isElementsInBounds(this);
};
