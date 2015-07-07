/**
 * A class to represent the player spaceship.
 * @param {Sprite} A pixi.js Sprite representing player Spaceship.
 * @param {Container} A pixi Container where this Sprite will be placed.
 */
function Player (sprite, container) {
  this.tileSprite = sprite;
  this.gameContainer = container;
  this.gameContainer.addChild(this.tileSprite);
  
  this.color = "#FFF";
  this.x = 220;
  this.y = 270;
  this.width = 30;
  this.height = 30;
  
  this.playerBullets = [];
  
  // Initialize player
  this.tileSprite.interactive = false;
  // is the tile selected?
  this.tileSprite.isSelected = false;
  // place the tile
  this.tileSprite.position.x = this.x;
  this.tileSprite.position.y = this.y;
};

Player.prototype.moveRight = function(steps) {
  this.x += steps;
  this.tileSprite.position.x = this.x;
}

Player.prototype.moveLeft = function(steps) {
  this.x -= steps;
  this.tileSprite.position.x = this.x;
}

/**
 * Draw the stage.
 * @param canvas The canvas object where this object is going to be drawn.
 * @param graphics A graphics object used to draw this object.
 */
Player.prototype.draw = function(canvas, graphics) {
  var canvas = canvas;
  var graphics = graphics;
  
  // Draw a rectangle if there is no sprite loaded
  if (!this.tileSprite) {
    graphics.beginFill(this.color);
    graphics.lineStyle(1, this.color);
    //draw a rectangle
    graphics.drawRect(this.x, this.y, this.width, this.height);
  }
  
  // draw the bullets
  this.playerBullets.forEach(function(bullet) {
    bullet.draw(canvas, graphics);
  });
}

/**
 * 
 */
Player.prototype.update = function () {
  this.playerBullets.forEach(function(bullet) {
    bullet.update();
  });
  
  this.playerBullets = this.playerBullets.filter(function(bullet) {
    return bullet.active;
  });
}

Player.prototype.shoot = function() {
  var bulletPosition = this.midpoint();

  var bullet = new Bullet(5, bulletPosition.x, bulletPosition.y);
  this.playerBullets.push(bullet);
};

Player.prototype.midpoint = function() {
  return {
    x: this.x + this.width/2,
    y: this.y + this.height/2
  };
};