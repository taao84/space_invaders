/**
 * Main launcher for the Space Invader game.
 */
var renderer = null;
var stage = null;
var spaceInvadersController = null;

var canvasWidth = 640;
var canvasHeight = 300;

$(document).ready(function() {
  initializeStage();
});

function initializeMainContainers() {
  //create the root of the scene graph
  stage = new PIXI.Container();
  spaceInvadersController = new SpaceInvadersController(canvasWidth, canvasHeight);
  //add the container to the stage
  stage.addChild(spaceInvadersController.gameContainer);
}

function initializeStage() {
  renderer = PIXI.autoDetectRenderer(canvasWidth, canvasHeight, {backgroundColor : 0x000000});
  document.body.appendChild(renderer.view);
  //importing a texture atlas created with texture packer
  var tileAtlas = ["assets/space_invaders_atlas.json"];
  // create a new loader
  var loader = PIXI.loader.add(tileAtlas).load(onTilesLoaded);
}

function onTilesLoaded() {
  initializeMainContainers();
  requestAnimationFrame(animate);
}

function animate() {
  //if (!spaceInvadersController.gameOver) {
    spaceInvadersController.update();
    spaceInvadersController.draw();
    requestAnimationFrame(animate);
    renderer.render(stage);
  //}
} 
