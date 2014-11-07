/**
 * Manage the connection between the model and the view.
 * @class SwagMapController
 */
function SwagMapController(model, view) {
	this.swagMapModel = model;
	this.swagMapView = view;

	this.swagMapModel.on("loaded", this.onSwagMapModelLoaded, this);
}

/**
 * Handle loaded events.
 * @method onSwagMapModelLoaded
 */
SwagMapController.prototype.onSwagMapModelLoaded = function() {
	var i;
	var datas = this.swagMapModel.getItemDatas();

	console.log("model loaded, data length: " + datas.length);

	for (i = 0; i < datas.length; i++) {
		this.swagMapView.addSwagItem(datas[i]);
	}
}

module.exports = SwagMapController;