
Enemy.NORMAL_ENEMY_SPRITE = [
  "galaga_3_1.png", "galaga_3_2.png",
  "galaga_3_3.png", "galaga_3_4.png", 
  "galaga_3_5.png", "galaga_3_6.png", 
  "galaga_3_7.png", "galaga_3_8.png" 
];
Enemy.EXPLODED_ENEMY_SPRITE = [
  "galaga_enemy_explosion_1_1.png", "galaga_enemy_explosion_1_2.png", 
  "galaga_enemy_explosion_1_3.png", "galaga_enemy_explosion_1_4.png", 
  "galaga_enemy_explosion_1_5.png", "galaga_enemy_explosion_1_6.png"
];

/**
 * Constructor.
 * @param container the container were this enemy will be rendered.
 * @param canvasWidth The width of the canvas were this enemy is going to be placed.
 * @param canvasHeigth The height of the canvas were this enemy is going to be placed.
 */
function Enemy(container, canvasWidth, canvasHeight) {
  this.gameContainer = container;
  
  // enemy animation
  var enemyTextures = [];
  for (var i=0; i<Enemy.NORMAL_ENEMY_SPRITE.length; i++) {
    var texture = PIXI.Texture.fromFrame(Enemy.NORMAL_ENEMY_SPRITE[i]);
    enemyTextures.push(texture);
  }
  this.enemyMovementClip = new PIXI.extras.MovieClip(enemyTextures);
  this.enemyMovementClip.anchor.x = 0;
  this.enemyMovementClip.anchor.y = 0;
  this.enemyMovementClip.animationSpeed = 0.01;
  this.enemyMovementClip.loop = true;
  this.enemyMovementClip.gotoAndPlay(Math.floor(Math.random() * 8));
  this.gameContainer.addChild(this.enemyMovementClip);
  
  // Explosion animation
  this.animationExplosionCounter = 0;
  var explosionTextures = [];
  for (var i=0; i<Enemy.EXPLODED_ENEMY_SPRITE.length; i++) {
    var texture = PIXI.Texture.fromFrame(Enemy.EXPLODED_ENEMY_SPRITE[i]);
    explosionTextures.push(texture);
  }
  this.explosionClip = new PIXI.extras.MovieClip(explosionTextures);
  
  //Sounds
  this.explodingSound = null;
  
  this.active = true;
  this.timeDestruction = null;
  this.exploded = false;
  this.age = Math.floor(Math.random() * 128);

  this.color = "#A2B";

  this.x = Math.floor(Math.random() * canvasWidth);
  this.y = 50;
  this.xVelocity = 0
  this.yVelocity = 0.4;

  this.width = 19;
  this.height = 20;
  
  //Initialize player
  this.enemyMovementClip.interactive = false;
  // is the tile selected?
  this.enemyMovementClip.isSelected = false;
  // place the tile
  this.enemyMovementClip.position.x = this.x;
  this.enemyMovementClip.position.y = this.y;
  
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
    if ((this.active) && (this.animationExplosionCounter == 0)) {
      canvas.removeChild(this.enemyMovementClip);
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
    if (!this.enemyMovementClip) {
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
    if (this.animationExplosionCounter < iter) {
      this.animationExplosionCounter++;
    }
    else {
      this.active = false;
    }
  }
  else {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
    
    if (this.x <= 0) {
      this.x -= this.xVelocity;
    }
    
    this.enemyMovementClip.position.x = this.x;
    this.enemyMovementClip.position.y = this.y;
    
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
  if (this.explodingSound != null) {
    this.explodingSound.play();
  }
}
