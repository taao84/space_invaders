/**
 * A class to represent the player spaceship.
 * @param {Sprite} A pixi.js Sprite representing player Spaceship.
 * @param {Container} A pixi Container where this Sprite will be placed.
 */
function Player (sprite, container, graphics) {
  var tileSprite = sprite;
  this.gameContainer = container;
  this.graphics = graphics;
  
  this.color = "#FFF";
  this.x = 220;
  this.y = 270;
  this.width = 30;
  this.height = 30;
  
  this.playerBullets = [];
};

/**
 * Draw the stage.
 */
Player.prototype.draw = function() {
  this.graphics.beginFill(this.color);
  this.graphics.lineStyle(1, this.color);
  //draw a rectangle
  this.graphics.drawRect(this.x, this.y, this.width, this.height);
  
  // draw the bullets
  this.playerBullets.forEach(function(bullet) {
    bullet.draw();
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

  var bullet = new Bullet(5, bulletPosition.x, bulletPosition.y, this.graphics);
  this.playerBullets.push(bullet);
};

Player.prototype.midpoint = function() {
  return {
    x: this.x + this.width/2,
    y: this.y + this.height/2
  };
};