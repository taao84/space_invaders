var app = new App();
$(document).ready(function() {
  $("#restartButton").click(function(event) {
    app.restartGame(event);
  });

  $("#pauseButton").click(function(event) {
    app.pauseGame(event);
  });

  $("#muteButton").click(function(event) {
    app.muteGame(event);
  });
  
  app.initializeStage();
});
