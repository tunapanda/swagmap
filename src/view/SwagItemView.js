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
    var connected = false;
	if (connected)
	{
	    fill(255, 0, 0);
	}
	ellipse(this.swagItemData.getX(), this.swagItemData.getY(), 50, 50);
}

module.exports = SwagItemView;
