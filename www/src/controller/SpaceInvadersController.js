/**
 * The main controller for the Space invaders game.
 * @param canvasWidth The width of the canvas.
 * @param canvasHeight The height of the canvas.
 */
function SpaceInvadersController (canvasWidth, canvasHeight) {

  //create an empty container
  this.gameContainer = new PIXI.Container();
  this.graphics = new PIXI.Graphics();
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
  
  var background = new Background(this.gameContainer, this.canvasWidth, this.canvasHeight);
  
  this.gameContainer.addChild(this.graphics);
  
  // Game Sounds
  this.sounds = SpaceInvadersController.loadSounds();
  
  // Create the game elements
  var player = new Player(this.gameContainer);
  player.shootingSound = this.sounds["galaga_shoot.mp3"];
  player.explodingSound = this.sounds["explosion.mp3"];
  
  // Create the score
  this.score = new Score(this.gameContainer, this.canvasWidth, this.canvasHeight);

  this.enemies = [];
  this.gameOver = false;
  
  //Capture the keyboard arrow keys and space bar
  var left = keyboard(37),
      up = keyboard(38),
      right = keyboard(39),
      down = keyboard(40), 
      space_bar = keyboard(32);
  
  //Left arrow key `press` method
  left.press = function() {
    player.moveLeft();
  };

  //Left arrow key `release` method
  left.release = function() {
    player.stop();
  };
  
  //Right
  right.press = function() {
    player.moveRight();
  };
  right.release = function() {
    player.stop();
  };
  
  // Space bar 
  space_bar.press = function() {
    player.shoot();
  };
  
  this.getPlayer = function () {
    return player;
  };
  
  this.getBackground = function () {
    return background;
  };
} 

/**
 * Draw the stage.
 */
SpaceInvadersController.prototype.draw = function() {
  this.getBackground().draw();
  
  var graphics = this.graphics;
  var canvas = this.gameContainer;
  graphics.clear();
  
  if (!this.gameOver) {
    this.score.draw(canvas, graphics);
    this.getPlayer().draw(canvas, graphics);
  }
  
  this.enemies.forEach(function(enemy) {
    enemy.draw(canvas, graphics);
  });
  
}

/**
 * Update the stage. 
 */
SpaceInvadersController.prototype.update = function() {
  this.getBackground().update();
  
  this.enemies = this.enemies.filter(function(enemy) {
    return enemy.active;
  });

  this.enemies.forEach(function(enemy) {
    enemy.update();
  });
  
  if ((this.enemies) && (this.enemies.length < 10)) { 
    if(Math.random() < 0.1) {
      var enemy = new Enemy(this.gameContainer, this.canvasWidth, this.canvasHeight);
      enemy.explodingSound = this.sounds["kill_enemy.mp3"]
      this.enemies.push(enemy);
    }
  }
  
  if (!this.getPlayer().active) { 
    this.gameOver = true;
  }
  
  if (!this.gameOver) {
    this.getPlayer().update();
    this.handleCollisions();
    this.score.update();
  }
}

/**
 * Handle the collision of elements.
 */
SpaceInvadersController.prototype.handleCollisions = function() {
  var player = this.getPlayer();
  var enemies = this.enemies;
  var score = this.score;
  player.playerBullets.forEach(function(bullet) {
    enemies.forEach(function(enemy) {
      if (SpaceInvadersController.rectangularCollision(bullet, enemy)) {
        enemy.explode();
        bullet.active = false;
        score.enemyKilled();
      }
    });
  });

  enemies.forEach(function(enemy) {
    if (SpaceInvadersController.rectangularCollision(enemy, player)) {
      enemy.explode();
      player.explode();
      score.gameOver();
    }
  });
}

/**
 * The given object has to implement the getX(), getY(), getWidth() and getHeight() methods, 
 * otherwise this method will fail.
 * @param element The element to check if it is in the bounds of the canvas handled by this 
 * controller or not.
 * @return {boolean} true if the object in the bounds of the canvas in this controller, 
 * false otherwise. 
 */
SpaceInvadersController.isElementsInBounds = function(element) {
  return element.getX() >= 0 && element.getX() <= canvasWidth
      && element.getY() >= 0 && element.getY() <= canvasHeight;
}

/**
 * This method returns true if the two given elements collide. False otherwise.
 * The given objects have to implement the getX(), getY(), getWidth() and getHeight() methods, 
 * otherwise this method will fail.
 * @param o1 The first element to check in the collision.
 * @param o2 The second element to check in the collision.
 * @return {boolean} true if the objects intersect, false otherwise. 
 */
SpaceInvadersController.rectangularCollision = function(o1, o2) {
  return o1.getX() < o2.getX() + o2.getWidth()
      && o1.getX() + o1.getWidth() > o2.getX()
      && o1.getY() < o2.getY() + o2.getHeight()
      && o1.getY() + o1.getHeight() > o2.getY();
}

/**
 * Load the game sounds.
 */
SpaceInvadersController.loadSounds = function() {
  if (!buzz.isMP3Supported()) {
    alert("Your browser doesn't support MP3 Format.");
    return;
  }
  
  var sounds = {};
  sounds["Intro.mp3"] = new buzz.sound("assets/sounds/Intro.mp3");
  sounds["galaga_shoot.mp3"] = new buzz.sound("assets/sounds/galaga_shoot.mp3");
  sounds["spaceship-atmosphere.mp3"] = new buzz.sound("assets/sounds/spaceship-atmosphere.mp3");
  sounds["explosion.mp3"] = new buzz.sound("assets/sounds/explosion.mp3");
  sounds["kill_enemy.mp3"] = new buzz.sound("assets/sounds/kill_enemy.mp3");
  
  sounds["Intro.mp3"].load();
  sounds["galaga_shoot.mp3"].load();
  sounds["spaceship-atmosphere.mp3"].load();
  sounds["explosion.mp3"].load;
  sounds["kill_enemy.mp3"].load();
  return sounds;
}