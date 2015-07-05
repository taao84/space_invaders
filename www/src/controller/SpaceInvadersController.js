/**
 * The main controller for the Space invaders game.
 * @param canvasWidth The width of the canvas.
 * @param canvasHeight The height of the canvas.
 */
function SpaceInvadersController (canvasWidth, canvasHeight) {

  //create an empty container
  this.gameContainer = new PIXI.Container();
  this.graphics = new PIXI.Graphics();
  var canvasWidth = canvasWidth;
  var canvasHeight = canvasHeight;
  
  // Create the game elements
  var player = new Player(null, this.gameContainer, this.graphics);
  
  this.gameContainer.addChild(this.graphics);
  
  //Capture the keyboard arrow keys and space bar
  var left = keyboard(37),
      up = keyboard(38),
      right = keyboard(39),
      down = keyboard(40), 
      space_bar = keyboard(32);
  
  //Left arrow key `press` method
  left.press = function() {
    player.x -= 5;
  };

  //Left arrow key `release` method
  left.release = function() {};
  
  //Right
  right.press = function() {
    player.x += 5;
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
  // this.gameContainer.clearRect(0, 0, canvasWidth, canvasHeight);
  this.graphics.clear();
  this.getPlayer().draw();
}

/**
 * Update the stage. 
 */
SpaceInvadersController.prototype.update = function() {
  this.getPlayer().update();
  // this.player.x = this.player.x.clamp(0, CANVAS_WIDTH - player.width);
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