/**
 * Manages the display of one swag item.
 * @class SwagItemView
 */
function SwagItemView(swagItemData) {
	this.swagItemData = swagItemData;
}

/**
 * Draw the swag item.
 * @method draw
 */
SwagItemView.prototype.draw = function() {
	ellipse(this.swagItemData.getX(), this.swagItemData.getY(), 50, 50);
}

module.exports = SwagItemView;