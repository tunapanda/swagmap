/**
 * Information about one swag item.
 * @class SwagItemData
 */
function SwagItemData(x, y, object, completed) {
	this.x = x;
	this.y = y;
	this.object = object;
	this.completed = completed;

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


SwagItemData.prototype.isComplete = function (){

	return this.completed;
}

module.exports = SwagItemData;
