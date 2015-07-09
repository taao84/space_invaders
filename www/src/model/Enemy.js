
Enemy.NORMAL_ENEMY_SPRITE = "galaga_3_7.png";
Enemy.EXPLODED_ENEMY_SPRITE = [
  "galaga_enemy_explosion_1_1.png", "galaga_enemy_explosion_1_2.png", 
  "galaga_enemy_explosion_1_3.png", "galaga_enemy_explosion_1_4.png", 
  "galaga_enemy_explosion_1_5.png", "galaga_enemy_explosion_1_6.png"
];

/**
 * @param canvasWidth The width of the canvas were this enemy is going to be placed.
 * @param canvasHeigth The height of the canvas were this enemy is going to be placed.
 */
function Enemy(container, canvasWidth, canvasHeight) {
  this.gameContainer = container;
  this.tileSprite = PIXI.Sprite.fromFrame(Enemy.NORMAL_ENEMY_SPRITE);
  this.explosionClip = null;
  this.animationCounter = 0;
  
  this.gameContainer.addChild(this.tileSprite);
  
  // Explosion animation
  var explosionTextures = [];
  for (var i=0; i<Enemy.EXPLODED_ENEMY_SPRITE.length; i++) {
    var texture = PIXI.Texture.fromFrame(Enemy.EXPLODED_ENEMY_SPRITE[i]);
    explosionTextures.push(texture);
  }
  this.explosionClip = new PIXI.extras.MovieClip(explosionTextures);
  
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
    if ((this.active) && (this.animationCounter == 0)) {
      canvas.removeChild(this.tileSprite);
      this.explosionClip.position.x = this.x;
      this.explosionClip.position.y = this.y;
      this.explosionClip.anchor.x = 0;
      this.explosionClip.anchor.y = 0;
      this.explosionClip.animationSpeed = 0.1;
      this.explosionClip.loop = false;
      this.explosionClip.gotoAndPlay(0);
      canvas.addChild(this.explosionClip);
    }
    
    if (!this.active) {
      canvas.removeChild(this.explosionClip);
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
    var iter = Enemy.EXPLODED_ENEMY_SPRITE.length * 10;
    if (this.animationCounter < iter) {
      this.animationCounter++;
    }
    else {
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
  this.exploded = true;
  this.timeDestruction = (new Date()).getTime();
}
