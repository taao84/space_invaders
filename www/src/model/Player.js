Player.NORMAL_SPRITE = "galaga_1_7.png";
Player.EXPLODED_ANIMATION = [
  "galaga_explosion_1_2.png", "galaga_explosion_1_3.png", 
  "galaga_explosion_1_4.png", "galaga_explosion_1_6.png",
];

/**
 * A class to represent the player spaceship.
 * @param {Sprite} A pixi.js Sprite representing player Spaceship.
 * @param {Container} A pixi Container where this Sprite will be placed.
 */
function Player (container) {
  this.tileSprite = PIXI.Sprite.fromFrame(Player.NORMAL_SPRITE);
  this.gameContainer = container;
  this.gameContainer.addChild(this.tileSprite);
  
  // Sounds
  this.shootingSound = null;
  this.explodingSound = null;
  
  //Explosion animation
  this.explosionClip = null;
  var explosionTextures = [];
  for (var i = 0; i < Player.EXPLODED_ANIMATION.length; i++) {
    var texture = PIXI.Texture.fromFrame(Player.EXPLODED_ANIMATION[i]);
    explosionTextures.push(texture);
  }
  this.explosionClip = new PIXI.extras.MovieClip(explosionTextures);
  this.animationExplotionCounter = 0;
  
  this.active = true;
  this.exploded = false;
  this.color = "#FFF";
  this.x = 220;
  this.y = 250;
  this.speedX = 0;
  this.width = 17;
  this.height = 18;
  
  this.playerBullets = [];
  
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

Player.prototype.moveRight = function(steps) {
  if (this.active) {
    this.speedX = 2;
  }
}

Player.prototype.moveLeft = function(steps) {
  if (this.active) {
    this.speedX = -2;
  }
}

Player.prototype.stop = function(steps) {
  if (this.active) {
    this.speedX = 0;
  }
}

/**
 * Draw the stage.
 * @param canvas The canvas object where this object is going to be drawn.
 * @param graphics A graphics object used to draw this object.
 */
Player.prototype.draw = function(canvas, graphics) {
  var canvas = canvas;
  var graphics = graphics;
  if ((this.exploded) && (this.animationExplotionCounter == 0)) {
    canvas.removeChild(this.tileSprite);
    this.explosionClip.position.x = this.x;
    this.explosionClip.position.y = this.y;
    this.explosionClip.anchor.x = 0;
    this.explosionClip.anchor.y = 0;
    this.explosionClip.animationSpeed = 0.1;
    this.explosionClip.loop = false;
    this.explosionClip.gotoAndPlay(0);
    canvas.addChild(this.explosionClip);
    return;
  }
  
  if (this.active) {
    // Draw a rectangle if there is no sprite loaded
    if (this.tileSprite) {
      this.tileSprite.position.x = this.x;
      this.tileSprite.position.y = this.y;
    }
    else {
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
  else {
    canvas.removeChild(this.explosionClip);
  }
}

/**
 * 
 */
Player.prototype.update = function () {
  if (this.active) {
    if (((this.x > 0) && (this.x < 630)) || ((this.x == 0) && (this.speedX > 0))
        || ((this.x == 630) && (this.speedX < 0))) {
      this.x += this.speedX;
    } 
    
    this.playerBullets.forEach(function(bullet) {
      bullet.update();
    });
    
    this.playerBullets = this.playerBullets.filter(function(bullet) {
      return bullet.active;
    });
    
    if (this.exploded) { 
      var iter = Player.EXPLODED_ANIMATION.length * 10;
      if (this.animationExplotionCounter < iter) {
        this.animationExplotionCounter++;
      }
      else {
        this.active = false;
      }
    }
  }
}

Player.prototype.shoot = function() {
  if (this.active) {
    var bulletPosition = this.midpoint();
  
    var bullet = new Bullet(5, bulletPosition.x, bulletPosition.y);
    this.playerBullets.push(bullet);
    
    if (this.shootingSound != null) {
      this.shootingSound.play();
    }
  }
};

Player.prototype.midpoint = function() {
  return {
    x: this.x + this.width/2,
    y: this.y + this.height/2
  };
};

/**
 * Explode this enemy.
 */
Player.prototype.explode = function() {
  this.exploded = true;
  
  if (this.explodingSound != null) {
    this.explodingSound.play();
  }
}