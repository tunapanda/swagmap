var EventDispatcher = require("yaed");
var SwagItemData = require("../data/SwagItemData");
var inherits = require("inherits");
var Tincan = require("tincanjs");
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
 *  This gets the swagItemData from the jsondata
 *  @method getSwagItemData
 */
SwagItemModel.prototype.getSwagItemData = function() {
	var swagItemData = new SwagItemData(this.x, this.y, this.object, this.completed);
	return swagItemData;
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
			"agent": new Tincan.Agent({
				"mbox": "mailto:" + this.swagMapModel.getActorEmail()
			}),
			"activity": new Tincan.Activity({
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