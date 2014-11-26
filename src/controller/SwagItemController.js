/**
 * Manage the connection between the model and the view for on e swag item.
 * @class SwagMapController
 */
function SwagItemController(model, view) {
	this.swagItemModel = model;
	this.swagItemView = view;

	this.swagItemModel.on("update", this.onSwagItemModelUpdate, this);

	this.update();
}

/**
 * Update the view from the model.
 * @method update
 */
SwagItemController.prototype.update = function() {
	this.swagItemView.setX(this.swagItemModel.getX());
	this.swagItemView.setY(this.swagItemModel.getY());
	this.swagItemView.setLabel(this.swagItemModel.getLabel());
	this.swagItemView.setComplete(this.swagItemModel.isComplete());
}

/**
 * The swag item model was updated.
 * @method onSwagItemModelUpdate
 */
SwagItemController.prototype.onSwagItemModelUpdate = function() {
	console.log("swag item model update, complete=" + this.swagItemModel.isComplete());

	this.update();
}

module.exports = SwagItemController;