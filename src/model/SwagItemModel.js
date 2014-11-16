var EventDispatcher = require("yaed");
var inherits = require("inherits");

// This is something quite ugly, it's a hack workaround...
// The Node version of Tincan doesn't work without it...
if (!process.versions) {
	process.versions = {
		node: "not_node"
	}
}

var TinCan = require("tincanjs");

/**
 * This is resposible for creating an item model using jsondata
 * @class SwagItemModel
 */
function SwagItemModel(jsondata) {
	this.x = jsondata.x;
	this.y = jsondata.y;
	this.object = jsondata.object;
	this.completed = false;
	this.swagMapModel = null;
}
inherits(SwagItemModel, EventDispatcher);

/**
 * Get x coordinate where this should be rendered.
 * @method getX
 */
SwagItemModel.prototype.getX = function() {
	return this.x;
}

/**
 * Get y coordinate where this should be rendered.
 * @method getY
 */
SwagItemModel.prototype.getY = function() {
	return this.y;
}

/**
 * Is this item completed?
 * @method isComplete
 */
SwagItemModel.prototype.isComplete = function() {
	return this.completed;
}

/**
 * Handle an xAPI statement and update completion if it is the right object
 * and verb.
 * @method handleXApiStatement
 */
SwagItemModel.prototype.handleXApiStatement = function(xApiStament) {
	var actor = xApiStament["actor"];
	var verb = xApiStament["verb"];
	var object = xApiStament["object"];
	if (object['id'] === this.object) {
		if (verb['id'].search("completed") >= 0) {
			this.completed = true;
		}
	}
}

/**
 * Set reference to SwagMapModel
 * @method setSwagMapModel
 */
SwagItemModel.prototype.setSwagMapModel = function(swagMapModel) {
	this.swagMapModel = swagMapModel;
}

/**
 *  Update the completion of an activity
 *  @method updateCompletion
 */
SwagItemModel.prototype.updateCompletion = function() {
	var tincan = this.swagMapModel.getTinCan();
	var statements = [];
	tincan.getStatements({
		params: {
			"agent": new TinCan.Agent({
				"mbox": "mailto:" + this.swagMapModel.getActorEmail()
			}),
			"activity": new TinCan.Activity({
				"id": this.object
			})
		},
		callback: function(err, result) {
			for (var i = 0; i < result.statements.length; i++) {
				statements[i] = result.statements[i];
			}
		}
	});
	for (var i = 0; i < statements.length; i++) {
		this.handleXApiStatement(statements[i]);
	}
	this.trigger("update");
}

module.exports = SwagItemModel;