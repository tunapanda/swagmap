/**
 * Manage the connection between the model and the view for on e swag item.
 * @class SwagMapController
 */
function SwagItemController(model, view) {
	this.swagItemModel = model;
	this.swagItemView = view;

	this.update();
}

/**
 * Update the view from the model.
 * @method update
 */
SwagItemController.prototype.update = function() {
	this.swagItemView.setX(this.swagItemModel.getX());
	this.swagItemView.setY(this.swagItemModel.getY());
	this.swagItemView.setComplete(this.swagItemModel.isComplete());
}

module.exports = SwagItemController;