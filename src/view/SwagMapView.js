var SwagItemView = require("./SwagItemView");
var SwagConnectionView = require("./SwagConnectionView");

/**
 * The main view.
 * @class SwagMapView
 */
function SwagMapView() {
	this.swagItemViews = [];
	this.swagConnections = [];
}

/**
 * Add a swag item to be displayed.
 * @method addSwagItem
 */
SwagMapView.prototype.addSwagItem = function() {
	var swagItemView = new SwagItemView();

	this.swagItemViews.push(swagItemView);

	return swagItemView;
}

/**
 * Remove all swag items.
 * @method removeAllSwagItems
 */
SwagMapView.prototype.removeAllSwagItems = function() {
	this.swagItemViews = [];
}

/**
 *  creates a connection between two Swag items
 *  @method addConnection
 */
SwagMapView.prototype.addConnection = function(connection) {
	this.swagConnections.push(connection);
	console.log()
}

/**
 * Do the setup.
 * @method setup
 */
SwagMapView.prototype.setup = function() {
	createCanvas(windowWidth - 1, windowHeight - 1);
}

/**
 * Draw.
 * @method draw
 */
SwagMapView.prototype.draw = function() {
	background(0, 0, 0);

	textSize(32);
	text("Tunapanda Swag", 15, 35);

	stroke(255, 255, 255);
	line(0, 50, windowWidth, 50);

	for (var i = 0; i < this.swagItemViews.length; i++)
		this.swagItemViews[i].draw();

	for (var i = 0; i < this.swagConnections.length; i++)
		this.swagConnections[i].draw();
}

/**
 * Handle window resize events.
 * @method windowResized
 */
SwagMapView.prototype.windowResized = function() {
	resizeCanvas(windowWidth, windowHeight);
}

/**
 * Install this view to set the global p5js function to
 * point to functions in this instance.
 * @method install
 */
SwagMapView.prototype.install = function() {
	draw = this.draw.bind(this);
	setup = this.setup.bind(this);
	windowResized = this.windowResized.bind(this);
}

module.exports = SwagMapView;