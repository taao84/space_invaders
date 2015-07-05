/**
 * An extended version of the Array object. 
 */
function ExtendedArray() {};
ExtendedArray.prototype = new Array;

ExtendedArray.prototype.shuffle = function() {
  var counter = this.length, temp, index;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    temp = this[counter];
    this[counter] = this[index];
    this[index] = temp;
  }
}

/**
 * Creates an array of random numbers. The array will have the indicated size, and it 
 * will be composed only by number between 0 and the given #maxNum. This method is useful 
 * to fill n spaces with m options. For instance, fill 24 spaces with 44 options.
 * 
 * @param {int} maxNum The maximum number to choose from.
 * @param {int} size The size of the returned array.
 * @returns {ExtendedArray} 
 */
ExtendedArray.createArrayRandomNumbers = function(maxNum, size) {
  
}

/**
 * Creates an array of the given #numberElements size with numbers increasing 
 * by the given increment.
 * 
 * @param {int} The starting number for the range.
 * @param {int} The increment between elements in the array to be returned.
 * @param {int} numberElements The number of elements of the array to be returned.
 * @return {ExtendedArray} An array of numbers with values increasing to the given #increment param 
 * and a number of elements equal to #numberElements.  
 */
ExtendedArray.range = function(startFrom, increment, numberElements) {
  var x = new ExtendedArray();
  var i = startFrom;
  var elements = 0;
  while (elements < numberElements) {
    elements = x.push(i);
    i = i + increment;
  }
  return x;
}

/**
 * Creates an array of the given #numberElements size with numbers increasing 
 * by the given increment.
 * 
 * @param {int} The increment between elements in the array to be returned.
 * @param {int} The number of elements of the array to be retorned.
 * @return {ExtendedArray} An array of numbers with values increasing to the given #increment param 
 * and a number of elements equal to #numberElements.  
 */
ExtendedArray.range2 = function(numberElements) {
  var chosenTiles = new ExtendedArray();
  while (chosenTiles.length < 48) {
    var candidate = Math.floor(Math.random() * numberElements);
    if (chosenTiles.indexOf(candidate) == -1) {
      chosenTiles.push(candidate, candidate)
    }
  }
  return chosenTiles;
}