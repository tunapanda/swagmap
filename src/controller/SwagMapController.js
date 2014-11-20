var SwagItemController = require("./SwagItemController");

/**
 * Manage the connection between the model and the view.
 * @class SwagMapController
 */
function SwagMapController(model, view) {
	this.swagMapModel = model;
	this.swagMapView = view;

	this.swagItemControllers = [];

	this.swagMapModel.on("loaded", this.onSwagMapModelLoaded, this);
}

/**
 * Handle loaded events.
 * @method onSwagMapModelLoaded
 */
SwagMapController.prototype.onSwagMapModelLoaded = function() {
	this.swagMapView.removeAllSwagItems();
	this.swagItemControllers = [];

	var i;
	var swagItemModels = this.swagMapModel.getSwagItemModels();

	console.log("model loaded, length: " + swagItemModels.length);

	for (i = 0; i < swagItemModels.length; i++) {
		var swagItemView = this.swagMapView.createSwagItem();
		var swagItemController = new SwagItemController(swagItemModels[i], swagItemView);
		this.swagItemControllers.push(swagItemController);
	}
}

module.exports = SwagMapController;