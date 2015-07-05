/**
 * Main launcher for the Space Invader game.
 */
var renderer = null;
var stage = null;
var spaceInvadersController = null;

var canvasWidth = 640;
var canvasHeight = 300;

$(document).ready(function() {
  initializeMainContainers();
  initializeStage();
  animate();
});

function initializeMainContainers() {
  renderer = PIXI.autoDetectRenderer(canvasWidth, canvasHeight, {backgroundColor : 0x1099bb});
  //create the root of the scene graph
  stage = new PIXI.Container();
  spaceInvadersController = new SpaceInvadersController(canvasWidth, canvasHeight);
}

function initializeStage() {
  document.body.appendChild(renderer.view);
  //importing a texture atlas created with texture packer
  // var tileAtlas = ["asset/images.json"];
  // create a new loader
  // var loader = PIXI.loader.add(tileAtlas).load(onTilesLoaded);
  
  // add the container to the stage
  stage.addChild(spaceInvadersController.gameContainer);
}

function animate() {
  spaceInvadersController.update();
  spaceInvadersController.draw();
  requestAnimationFrame(animate);
  renderer.render(stage);
} 
