var EventDispatcher = require("../utils/EventDispatcher");
var inherits = require("inherits");
var fs = require("fs");
var SwagItemModel = require("./SwagItemModel");
var http = require("http");
var url = require("url");
var request = require('request');

/**
 * Main swag map model.
 * @class SwagMapModel
 */
function SwagMapModel() {
    this.swagItemModels = [];
}

inherits(SwagMapModel, EventDispatcher);

/**
 * This event is dispatched when the relevant data has been loaded.
 * @event loaded
 */

/**
 * This function will look at its parameter and determine if it is a
 * local file or a url. It will then make the appropriate request
 * to load the specified resource.
 * @method load
 * @param {Object} pathOrURL The local path or remove url to load.
 */
SwagMapModel.prototype.load = function(pathOrURL) {
    var parsedPathOrURL = url.parse(pathOrURL);
    if (typeof window !== "undefined" || parsedPathOrURL.protocol) {
        this.loadUrl(pathOrURL)
    } else {
        this.loadFile(pathOrURL)
    }
}

/**
 * This function loads a local JSON file and stores the list of items.
 * @method loadFile
 */
SwagMapModel.prototype.loadFile = function(jsonPath) {
    fs.readFile(jsonPath, function(err, data) {
        if (err) {
            console.log("Error" + err);
            return;
        }

        this.parseSwagMapDefinition(data.toString());
        this.trigger("loaded");
    }.bind(this));
}

/**
 * This function loads a local JSON file and stores the list of items.
 * @method loadUrl
 */
SwagMapModel.prototype.loadUrl = function(jsonUrl) {

    // If this is not a proper full url, we need to append the url
    // path from the window location.
    var parsedURL = url.parse(jsonUrl);

    if (!parsedURL.protocol) {
        var path = window.location.href.substring(0, window.location.href.lastIndexOf("/") + 1);
        jsonUrl = path + jsonUrl;
    }

    console.log("loading: " + jsonUrl);

    var options = {
        url: jsonUrl,
    };
    request(options, function(error, response, body) {
        console.log("loaded, error: " + error); //response.statusCode);

        if (!error && response.statusCode == 200) {
            this.parseSwagMapDefinition(body.toString());
        }

        this.trigger("loaded");
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
        this.swagItemModels.push(new SwagItemModel(data.items[i]));
    }
}

/**
 * This function gets data items from swagItemModels
 * @method getItemDatas
 */
SwagMapModel.prototype.getItemDatas = function() {
    var itemDatas = [];
    for (var i = 0; i < this.swagItemModels.length; i++) {
        var x = this.swagItemModels[i].x;
        var y = this.swagItemModels[i].y;
        itemDatas.push(this.swagItemModels[i].getSwagItemData(x, y));
    }
    return itemDatas;
}

/**
 * This function gets swag item models
 * @method getSwagItemModels
 */
SwagMapModel.prototype.getSwagItemModels = function() {
    return this.swagItemModels;
}

module.exports = SwagMapModel;