/**
 * A class to represent a shot from the player.
 */
function Bullet (speed, x, y, graphics) {
  this.graphics = graphics;
  
  this.speed = speed;

  this.active = true;
  this.xVelocity = 0;
  this.yVelocity = -speed;
  this.width = 3;
  this.height = 3;
  this.color = "#000";
  
  this.x = x;
  this.y = y
  
  this.getX = function() {
    return this.x;
  }
  
  this.getY = function() {
    return this.y;
  }
}

/**
 * 
 */
Bullet.prototype.draw = function() {
  this.graphics.beginFill(this.color);
  this.graphics.lineStyle(1, this.color);
  //draw a rectangle
  this.graphics.drawRect(this.x, this.y, this.width, this.height);
};

/**
 * 
 */
Bullet.prototype.update = function() {
  this.x += this.xVelocity;
  this.y += this.yVelocity;

  this.active = this.active && SpaceInvadersController.isElementsInBounds(this);
};