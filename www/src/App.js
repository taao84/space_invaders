App.SPACE_INVADERS_MAIN_CONTAINER_ID = "SpaceInvadersCanvas";

/**
 * Main launcher for the Space Invader game.
 */

/**
 * Constructor.
 */
function App() {
  this.renderer = null;
  this.stage = null;
  this.spaceInvadersController = null;
  this.sounds = null;

  // Control variables
  this.paused = false;
  this.muted = false;
}

/**
 * 
 */
App.prototype.initializeStage = function() {
  //importing a texture atlas created with texture packer
  var tileAtlas = ["assets/space_invaders_atlas.json"];
  // create a new loader
  var app = this;
  var loader = PIXI.loader.add(tileAtlas).load(function() {
    app.sounds = App.loadSounds();
    app.initializeMainContainers();
    requestAnimationFrame(function() {
      app.animate();
    });
  });
}

/**
 * 
 */
App.prototype.initializeMainContainers = function() {
  this.renderer = PIXI.autoDetectRenderer(GameSettings.canvasWidth, GameSettings.canvasHeight, {
    backgroundColor : 0x000000
  });
  this.renderer.view.id = App.SPACE_INVADERS_MAIN_CONTAINER_ID;
  document.body.appendChild(this.renderer.view);
  
  //create the root of the scene graph
  this.stage = new PIXI.Container();
  this.spaceInvadersController = new SpaceInvadersController(GameSettings.canvasWidth, 
      GameSettings.canvasHeight, this.sounds);
  //add the container to the stage
  this.stage.addChild(this.spaceInvadersController.gameContainer);
}

/**
 * 
 */
App.prototype.animate = function() {
  if (!this.paused) {
    this.spaceInvadersController.update();
    this.spaceInvadersController.draw();
    var app = this;
    requestAnimationFrame(function() {
      app.animate();
    });
    this.renderer.render(this.stage);
  }
} 

/**
 * 
 */
App.prototype.checkCompatibility = function() {
  //Check if browser supports html5 sound
  if (buzz.isSupported()) {
    return true;
  }
  alert("Your browser is too old, it doesn't support html sound. Time to update!!!");
  return false;
}

/**
 * Restart the game.
 * @param event The event that generated the call to this method.
 * @param element The element from which the event was triggered.
 */
App.prototype.restartGame = function(event, element) {
  // destroy variables
  $("#"+this.renderer.view.id).remove();
  
  this.stage.destroy();
  this.renderer.destroy();
  this.spaceInvadersController = null;

  // Restart others
  this.paused = false;
  this.muted = false;
  this.initializeMainContainers();
}

/**
 * Pauses and unpauses the game.
 * @param event The event that generated the call to this method.
 * @param element The element from which the event was triggered.
 */
App.prototype.pauseGame = function(event, element) {
  this.paused = !this.paused;
  if (!this.paused) {
    var app = this;
    requestAnimationFrame(function() {
      app.animate();
    });
  }
}

/**
 * Enable and disable the sounds for the game.
 * @param event The event that generated the call to this method.
 * @param element The element from which the event was triggered.
 */
App.prototype.muteGame = function() {
  this.muted = !this.muted;
}

/**
 * Load the game sounds.
 */
App.loadSounds = function() {
  if (!buzz.isMP3Supported()) {
    alert("Your browser doesn't support MP3 Format.");
    return;
  }
  
  var sounds = {};
  for (var i = 0; i < GameSettings.sounds.length; i++) {
    sounds[GameSettings.sounds[i].name] = new buzz.sound(GameSettings.sounds[i].path);
  }
  
  for (var i = 0; i < GameSettings.sounds.length; i++) {
    sounds[GameSettings.sounds[i].name].load();
  }
  return sounds;
}