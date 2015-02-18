var SwagConnectionView = require("./SwagConnectionView");

/**
 * Manages the display of one swag item.
 * @class SwagItemView
 */
function SwagItemView() {
	this.x = 0;
	this.y = 0;
	this.label = "";
	this.complete = false;

	this.swagConnections = [];
}

/**
 * Set x.
 * @method setX
 */
SwagItemView.prototype.setX = function(value) {
	this.x = value;
}

/**
 * Set y.
 * @method setY
 */
SwagItemView.prototype.setY = function(value) {
	this.y = value;
}

/**
 *  Set the label of swag item
 *  @method setLabel
 */
SwagItemView.prototype.setLabel = function(value) {
	this.label = value;
}
/**
 * Set complete.
 * @method setComplete
 */
SwagItemView.prototype.setComplete = function(value) {
	this.complete = value;
}

/**
 * Create a connection between two swag items
 * @method createConnection
 */
SwagItemView.prototype.createConnection = function() {
	var connection = new SwagConnectionView();
	connection.setFromX(this.x);
	connection.setFromY(this.y);

	this.swagConnections.push(connection);

	return connection;
}

/**
 * Draw the swag item.
 * @method draw
 */
SwagItemView.prototype.draw = function() {
	for (var i = 0; i < this.swagConnections.length; i++)
		this.swagConnections[i].draw();

	if (this.complete) {
		fill(255, 255, 0);
	} else {
		fill(255, 255, 255);
	}
	ellipse(this.x, this.y, 50, 50);
	text(this.label, this.x - textWidth(this.label)/2, this.y + 60);
}

module.exports = SwagItemView;