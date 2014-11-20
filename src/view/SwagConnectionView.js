/**
 *  Resposible for the display of a connction between two swagfacts
 *  @class SwagConnectionView
 */
function SwagConnectionView() {
	this.connection = [];
}

/**
 * Set from x.
 * @method setFromX
 */
SwagConnectionView.prototype.setFromX = function(value) {
	this.connection.push(value);
}

/**
 * Set from y.
 * @method setFromY
 */
SwagConnectionView.prototype.setFromY = function(value) {
	this.connection.push(value);
}

/**
 * Set to x.
 * @method setToX
 */
SwagConnectionView.prototype.setToX = function(value) {
	this.connection.push(value);
}

/**
 * Set to y.
 * @method setToY
 */
SwagConnectionView.prototype.setToY = function(value) {
	this.connection.push(value);
}

/**
 * Draw the connection.
 * @method draw
 */
SwagConnectionView.prototype.draw = function() {
	line(this.connection[0], this.connection[1], this.connection[2], this.connection[3]);
}

module.exports = SwagConnectionView;