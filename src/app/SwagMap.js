var SwagMapView = require("../view/SwagMapView");
var SwagMapModel = require("../model/SwagMapModel");
var SwagMapController = require("../controller/SwagMapController");

/**
 * Main SwagMap application.
 * Contains a model, a view and a controller.
 * @class SwagMap
 */
function SwagMap() {
	this.swagMapModel = new SwagMapModel();
	this.swagMapView = new SwagMapView();
	this.swagMapController = new SwagMapController(this.swagMapModel, this.swagMapView);

	this.swagMapModel.on("loaded", this.onSwagMapModelLoaded, this);
}

/**
 * Set xAPI store reference.
 * @method setXApiStore
 */
SwagMap.prototype.setXApiStore = function(value) {
	this.swagMapModel.setXApiStore(value);
}

/**
 * Set actor email.
 * @method actorEmail
 */
SwagMap.prototype.setActorEmail = function(value) {
	this.swagMapModel.setActorEmail(value);
}

/**
 * Set map url.
 * @method setMapUrl
 */
SwagMap.prototype.setMapUrl = function(value) {
	this.swagMapModel.setMapUrl(value);
}

/**
 * Run.
 * @method run
 */
SwagMap.prototype.run = function() {
	this.swagMapView.install();

	this.swagMapModel.load(this.mapUrl);
}

/**
 * Swag map model loaded.
 * @method onSwagMapModelLoaded
 */
SwagMap.prototype.onSwagMapModelLoaded = function() {
	console.log("loading completion...");
	this.swagMapModel.updateCompletion();
}

module.exports = SwagMap;