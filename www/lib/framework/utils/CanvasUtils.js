// Static methods

/** 
 * Given an image this method creates a new Canvas element and draws the 
 * given image into the canvas. The newly created canvas is returned.
 * @param image The image to be drawn in the canvas to return.
 * @returns A new canvas with the given image  drawn in it.
 */
CanvasUtils.convertImageToCanvas = function (image) {
  var canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  canvas.getContext("2d").drawImage(image, 0, 0);
  return canvas;
}

/**
 * This method gets the current Image data from the given canvas and 
 * converts it into an image. 
 * @param canvas The canvas from were we will get the current image.
 * @return An image containing the current data drawn in the given canvas.
 * The returned image is in PNG format.
 */
CanvasUtils.convertCanvasToPngImage = function(canvas) {
  var image = new Image();
  image.src = canvas.toDataURL("image/png");
  return image;
}

/**
 * Constructor.
 */
var CanvasUtils = function() {};
