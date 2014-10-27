/**
 * Information about one swag item.
 * @class SwagItemData
 */
function SwagItemData(x, y) {
	this.x = x;
	this.y = y;
}

/**
 * Get X.
 * @method getX
 */
SwagItemData.prototype.getX=function() {
	return this.x;
}

/**
 * Get Y.
 * @method getY
 */
SwagItemData.prototype.getY=function() {
	return this.y;
}

module.exports = SwagItemData;