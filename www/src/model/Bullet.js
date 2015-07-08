/**
 * A class to represent a shot from the player.
 * @param speed 
 * @param x 
 * @param y 
 */
function Bullet (speed, x, y) {
  this.speed = speed;

  this.active = true;
  this.xVelocity = 0;
  this.yVelocity = -speed;
  this.width = 3;
  this.height = 3;
  this.color = "0xFFFFFF";
  
  this.x = x;
  this.y = y
  
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
}

/**
 * Draw this object.
 * @param canvas The canvas object where this object is going to be drawn.
 * @param graphics A graphics object used to draw this object.
 */
Bullet.prototype.draw = function(canvas, graphics) {
  graphics.beginFill(this.color);
  graphics.lineStyle(1, this.color);
  //draw a rectangle
  graphics.drawRect(this.x, this.y, this.width, this.height);
};

/**
 * 
 */
Bullet.prototype.update = function() {
  this.x += this.xVelocity;
  this.y += this.yVelocity;

  this.active = this.active && SpaceInvadersController.isElementsInBounds(this);
};