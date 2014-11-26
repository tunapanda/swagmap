var EventDispatcher = require("yaed");
var inherits = require("inherits");
var fs = require("fs");
var SwagItemModel = require("./SwagItemModel");
var http = require("http");
var url = require("url");
var request = require('request');

// This is something quite ugly, it's a hack workaround...
// The Node version of Tincan doesn't work without it...
if (!process.versions) {
    process.versions = {
        node: "not_node"
    }
}

var TinCan = require("tincanjs");

/**
 * Main swag map model.
 * @class SwagMapModel
 */
function SwagMapModel() {
    this.swagItemModels = [];
    this.mapUrl = null;
    this.actorEmail = null;
    this.tinCan = null;
    this.loadingMap = false;
}

inherits(SwagMapModel, EventDispatcher);

/**
 * This event is dispatched when the relevant data has been loaded.
 * @event loaded
 */

/**
 * Set map url.
 * @method setMapUrl
 */
SwagMapModel.prototype.setMapUrl = function(value) {
    this.mapUrl = value;
}

/**
 * Set map url.
 * @method setMapUrl
 */
SwagMapModel.prototype.setXApiStore = function(parameters) {
    this.tinCan = new TinCan({
        recordStores: [parameters]
    });
}

/**
 * Set actor email.
 * @method setActorEmail
 */
SwagMapModel.prototype.setActorEmail = function(value) {
    this.actorEmail = value;
}

/**
 * Get tin can reference.
 * @method getTinCan
 */
SwagMapModel.prototype.getTinCan = function() {
    return this.tinCan;
}

/**
 * Get actor email.
 * @method getActorEmail
 */
SwagMapModel.prototype.getActorEmail = function() {
    return this.actorEmail;
}

/**
 * This function will look at its parameter and determine if it is a
 * local file or a url. It will then make the appropriate request
 * to load the specified resource. The pathOrURL parameter is optional,
 * if it is not set, the url previously set with setMapUrl will be used.
 * @method load
 * @param {Object} pathOrURL The local path or remove url to load.
 */
SwagMapModel.prototype.load = function(pathOrURL) {
    if (pathOrURL)
        this.mapUrl = pathOrURL;

    var parsedPathOrURL = url.parse(this.mapUrl);
    if (typeof window !== "undefined" || parsedPathOrURL.protocol) {
        this.loadUrl(this.mapUrl)
    } else {
        this.loadFile(this.mapUrl)
    }
}

/**
 * This function loads a local JSON file and stores the list of items.
 * @method loadFile
 * @private
 */
SwagMapModel.prototype.loadFile = function(jsonPath) {
    if (this.isLoading())
        throw new Error("Can't load, loading already in progress...");

    this.loadingMap = true;
    this.trigger("loadingStateChange");

    var scope = this;

    fs.readFile(jsonPath, function(err, data) {
        if (err) {
            console.log("Error" + err);
            return;
        }

        scope.parseSwagMapDefinition(data.toString());
        scope.loadingMap = false;
        scope.trigger("loadingStateChange");
        scope.trigger("loaded");
    }.bind(this));
}

/**
 * This function loads a local JSON file and stores the list of items.
 * @method loadUrl
 * @private
 */
SwagMapModel.prototype.loadUrl = function(jsonUrl) {
    if (this.isLoading())
        throw new Error("Can't load, loading already in progress...");

    this.loadingMap = true;
    this.trigger("loadingStateChange");

    // If this is not a proper full url, we need to append the url
    // path from the window location.
    var parsedURL = url.parse(jsonUrl);

    if (!parsedURL.protocol) {
        var path = window.location.href.substring(0, window.location.href.lastIndexOf("/") + 1);
        jsonUrl = path + jsonUrl;
    }

    console.log("loading swagmap: " + jsonUrl);

    var scope = this;

    var options = {
        url: jsonUrl,
    };
    request(options, function(error, response, body) {
        console.log("loaded... error: " + error); //response.statusCode);

        if (!error && response.statusCode == 200) {
            this.parseSwagMapDefinition(body.toString());
        }

        scope.loadingMap = false;
        scope.trigger("loadingStateChange");
        scope.trigger("loaded");
    }.bind(this));
}

/**
 * Parse a swag map definition. This function tries to be tolerant and
 * accept parsed and unparsed json. It is importand however that nothing
 * gets passed in that is an object that is "kind of" a string, but not
 * actually a string. In that case use toString() on the object first.
 * @method parseSwagMapDefinition
 * @param {Object} data The string or object containing the definition.
 */
SwagMapModel.prototype.parseSwagMapDefinition = function(data) {
    if (typeof data == "string")
        data = JSON.parse(data);

    for (var i = 0; i < data.items.length; i++) {
        var swagItemModel = new SwagItemModel(data.items[i]);
        swagItemModel.setSwagMapModel(this);
        swagItemModel.on("update", this.onSwagItemUpdate.bind(this));
        this.swagItemModels.push(swagItemModel);
    }
}

/**
 * One of our swag items were updated.
 * @method onSwagItemUpdate
 */
SwagMapModel.prototype.onSwagItemUpdate = function() {
    this.trigger("loadingStateChange");
}

/**
 * This function gets swag item models
 * @method getSwagItemModels
 */
SwagMapModel.prototype.getSwagItemModels = function() {
    return this.swagItemModels;
}

/**
 * Update completion for all swag item models.
 * @method updateCompletion
 */
SwagMapModel.prototype.updateCompletion = function() {
    if (this.isLoading())
        throw new Error("Can't update completion, loading already in progress...");

    for (var i = 0; i < this.swagItemModels.length; i++)
        this.swagItemModels[i].updateCompletion();

    this.trigger("loadingStateChange");
}

/**
 * Are we loading somethinf currently?
 * @method isLoading
 */
SwagMapModel.prototype.isLoading = function() {
    if (this.loadingMap)
        return true;

    for (var i = 0; i < this.swagItemModels.length; i++)
        if (this.swagItemModels[i].isLoading())
            return true;

    return false;
}

module.exports = SwagMapModel;