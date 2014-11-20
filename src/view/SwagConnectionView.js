/**
 *  Resposible for the display of a connction between two swagfacts
 *  @class SwagConnectionView
 */
function SwagConnectionView() {
	this.connection = [];

	this.fromX = 0;
	this.fromY = 0;
	this.toX = 0;
	this.toY = 0;
}

/**
 * Set from x.
 * @method setFromX
 */
SwagConnectionView.prototype.setFromX = function(value) {
	this.fromX = value;
}

/**
 * Set from y.
 * @method setFromY
 */
SwagConnectionView.prototype.setFromY = function(value) {
	this.fromY = value;
}

/**
 * Set to x.
 * @method setToX
 */
SwagConnectionView.prototype.setToX = function(value) {
	this.toX = value;
}

/**
 * Set to y.
 * @method setToY
 */
SwagConnectionView.prototype.setToY = function(value) {
	this.toY = value;
}


/**
 * Draw the connection.
 * @method draw
 */
SwagConnectionView.prototype.draw = function() {
	var dx = this.toX - this.fromX;
	var dy = this.toY - this.fromY;
	var l = Math.sqrt(dx * dx + dy * dy);

	if (l > 0) {
		dx /= l;
		dy /= l;
	}

	line(this.fromX + dx * 40, this.fromY + dy * 40, this.toX - dx * 40, this.toY - dy * 40);

	var angle = Math.atan2(dy, dx);

	//console.log("pi: "+Math.PI);

	line(
		this.toX - dx * 40,
		this.toY - dy * 40,
		this.toX - dx * 40 + 10 * Math.cos(angle + Math.PI+.5),
		this.toY - dy * 40 + 10 * Math.sin(angle + Math.PI+.5)
	);

	line(
		this.toX - dx * 40,
		this.toY - dy * 40,
		this.toX - dx * 40 + 10 * Math.cos(angle + Math.PI-.5),
		this.toY - dy * 40 + 10 * Math.sin(angle + Math.PI-.5)
	);
}

module.exports = SwagConnectionView;