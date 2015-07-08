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
  
  // Create the game elements
  var player = new Player(this.gameContainer);
  this.enemies = [];
  
  this.gameContainer.addChild(this.graphics);
  
  //Capture the keyboard arrow keys and space bar
  var left = keyboard(37),
      up = keyboard(38),
      right = keyboard(39),
      down = keyboard(40), 
      space_bar = keyboard(32);
  
  //Left arrow key `press` method
  left.press = function() {
    player.moveLeft(5);
  };

  //Left arrow key `release` method
  left.release = function() {};
  
  //Right
  right.press = function() {
    player.moveRight(5);
  };
  right.release = function() {
  };
  
  // Space bar 
  space_bar.press = function() {
    player.shoot();
  };
  
  this.getPlayer = function () {
    return player;
  } 
} 

/**
 * Draw the stage.
 */
SpaceInvadersController.prototype.draw = function() {
  var graphics = this.graphics;
  var canvas = this.gameContainer;
  graphics.clear();
  this.getPlayer().draw(canvas, graphics);
  
  this.enemies.forEach(function(enemy) {
    enemy.draw(canvas, graphics);
  });
}

/**
 * Update the stage. 
 */
SpaceInvadersController.prototype.update = function() {
  if (this.getPlayer().active) { 
    this.getPlayer().update();
    
    this.enemies = this.enemies.filter(function(enemy) {
      return enemy.active;
    });

    this.enemies.forEach(function(enemy) {
      enemy.update();
    });
    
    if ((this.enemies) && (this.enemies.length < 10)) { 
      if(Math.random() < 0.1) {
        var enemy = new Enemy(this.gameContainer, this.canvasWidth, this.canvasHeight);
        this.enemies.push(enemy);
      }
    }
    this.handleCollisions();
  }
}

/**
 * Handle the collision of elements.
 */
SpaceInvadersController.prototype.handleCollisions = function() {
  var player = this.getPlayer();
  var enemies = this.enemies;
  player.playerBullets.forEach(function(bullet) {
    enemies.forEach(function(enemy) {
      if (SpaceInvadersController.rectangularCollision(bullet, enemy)) {
        enemy.explode();
        bullet.active = false;
      }
    });
  });

  enemies.forEach(function(enemy) {
    if (SpaceInvadersController.rectangularCollision(enemy, player)) {
      enemy.explode();
      player.explode();
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