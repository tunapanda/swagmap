var EventDispatcher = require("yaed");
var inherits = require("inherits");

// This is something quite ugly, it's a hack workaround...
// The Node version of Tincan doesn't work without it...
/*if (!process.versions) {
	process.versions = {
		node: "not_node"
	}
}*/

/**
 * This is resposible for creating an item model using jsondata
 * @class SwagItemModel
 */
function SwagItemModel(jsondata) {
	this.x = jsondata.x;
	this.y = jsondata.y;
	this.label = jsondata.label;
	this.object = jsondata.object;

	if (typeof this.object == "string")
		this.object = [this.object];

	this.completed = false;
	this.swagMapModel = null;

	if (jsondata.verb)
		this.verb = jsondata.verb;

	this.callsInProgress = 0;
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
 *  Get the label for a swag item
 *  @method getLabel
 */
SwagItemModel.prototype.getLabel = function() {
	return this.label;
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
	console.log("handling statement...");
	console.log(xApiStament);

	var actor = xApiStament["actor"];
	var verb = xApiStament["verb"];

	var object;

	if (xApiStament.object)
		object = xApiStament.object;

	else if (xApiStament.target)
		object = xApiStament.target;

	else
		throw new Error("statement doesn't have a target or object");

	if (!this.objectUrlMatches(object["id"]))
		return;

	if (this.verb) {
		if (this.verb == verb["id"]) {
			this.completed = true;
		}
	} else if (verb['id'].search("completed") >= 0) {
		this.completed = true;
	}
}

/**
 * Check if an object url matches this item, i.e., if its url
 * would mean completion of this item.
 */
SwagItemModel.prototype.objectUrlMatches = function(objectUrl) {
	var i;

	for (i = 0; i < this.object.length; i++)
		if (objectUrl == this.object[i])
			return true;

	return false;
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
	if (this.callsInProgress > 0)
		throw new Error("Already loading...");

	var tincan = this.swagMapModel.getTinCan();
	var statements = [];
	var scope = this;
	this.callsInProgress = 1;

	var oi;

	for (oi=0; oi<this.object.length; oi++) {
		tincan.getStatements({
			params: {
				"agent": new TinCan.Agent({
					"mbox": "mailto:" + this.swagMapModel.getActorEmail()
				}),
				"activity": new TinCan.Activity({
					"id": this.object[oi]
				})
			},
			callback: function(err, result) {
				for (var i = 0; i < result.statements.length; i++) {
					statements[i] = result.statements[i];
				}
				for (var i = 0; i < statements.length; i++) {
					scope.handleXApiStatement(statements[i]);
				}
				scope.callsInProgress--;
				scope.trigger("update");
			}
		});
	}
}

/**
 * Are we loading completion?
 * @method isLoading
 */
SwagItemModel.prototype.isLoading = function() {
	return this.callsInProgress > 0;
}

module.exports = SwagItemModel;