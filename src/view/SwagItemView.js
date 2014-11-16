/**
 * Manages the display of one swag item.
 * @class SwagItemView
 */
function SwagItemView(swagItemData) {
	this.x = 0;
	this.y = 0;
	this.complete = false;
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
 * Set complete.
 * @method setComplete
 */
SwagItemView.prototype.setComplete = function(value) {
	this.complete = value;
}

/**
 * Draw the swag item.
 * @method draw
 */
SwagItemView.prototype.draw = function() {
	if (this.complete) {
		fill(255, 0, 0);
	} else {
		fill(255, 255, 255);
	}

	ellipse(this.x, this.y, 50, 50);
}

module.exports = SwagItemView;