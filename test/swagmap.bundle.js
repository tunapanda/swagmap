(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
swagmap = {};

swagmap.SwagMapView = require("./view/SwagMapView");
swagmap.SwagItemData = require("./data/SwagItemData");

},{"./data/SwagItemData":1,"./view/SwagMapView":5}],3:[function(require,module,exports){
/**
*  Resposible for the display of a connction between two swagfacts
*  @class SWagConnectionView
*/

function SwagConnectionView(swagItem1, swagItem2){
    this.swagItem1 = swagItem1;
    this.swagItem2 = swagItem2;
}

/**
*  Draw a connection between two items
*  @method draw
*/

SwagConnectionView.prototype.draw = function(){
    item1 = [this.swagItem1.getX(), this.swagItem1.getY()];
    item2 = [this.swagItem2.getX(), this.swagItem2.getY()];
    
    var connected = true;
    if (connected)
    {
        stroke(255);
        line(item1[0], item1[1], item2[0], item2[1]);
    }
}

module.exports=SwagConnectionView;


},{}],4:[function(require,module,exports){
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
    var completed = false;
	if (completed)
	{
	    fill(255, 0, 0);
	}
	ellipse(this.swagItemData.getX(), this.swagItemData.getY(), 50, 50);
}

module.exports = SwagItemView;

},{}],5:[function(require,module,exports){
var SwagItemView = require("./SwagItemView");
var SwagConnectionView = require("./SwagConnectionView");

/**
 * The main view.
 * @class SwagMapView
 */
function SwagMapView() {
	this.swagItemViews = [];
	this.swagConnection;
}

/**
 * Add a swag item to be displayed.
 * @method addSwagItem
 */
SwagMapView.prototype.addSwagItem = function(swagItemData) {
	this.swagItemViews.push(new SwagItemView(swagItemData));
}

/**
*  creates a connection between two Swag items
*  @method addConnection
*/
SwagMapView.prototype.addConnection = function(swagItem1, swagItem2){
    this.swagConnection = new SwagConnectionView(swagItem1, swagItem2);
}
/**
 * Do the setup.
 * @method setup
 */
SwagMapView.prototype.setup = function() {
	console.log("setting up... SwagConnectionView="+SwagConnectionView);
	createCanvas(windowWidth - 1, windowHeight - 1);
}

/**
 * Draw.
 * @method draw
 */
SwagMapView.prototype.draw = function() {
	background(0, 0, 0);

	textSize(32);
	text("Tunapanda Swag",15,35);

	stroke(255, 255, 255);
	line(0, 50, windowWidth, 50);

	for (var i = 0; i < this.swagItemViews.length; i++)
		this.swagItemViews[i].draw();

    if (this.swagConnection)
        this.swagConnection.draw();
}

/**
 * Handle window resize events.
 * @method windowResized
 */
SwagMapView.prototype.windowResized = function() {
	resizeCanvas(windowWidth, windowHeight);
}

module.exports = SwagMapView;

},{"./SwagConnectionView":3,"./SwagItemView":4}]},{},[2]);
