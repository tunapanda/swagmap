var EventDispatcher = require("../utils/EventDispatcher");
var inherits = require("inherits");
var fs = require("fs");
var SwagItemModel = require("./SwagItemModel");
var request = require('request');
var http = require("http");
var url = require("url");
/**
 * Main swag map model.
 * @class SwagMapModel
 */
function SwagMapModel() {
    this.swagItemModels = [];
}
inherits(SwagMapModel, EventDispatcher);


/**
*  This function loads a local JSON file 
*  @method loadFile
*/
SwagMapModel.prototype.load = function(pathOrURL) {
    var parsedPathOrURL = url.parse(pathOrURL);
    if (parsedPathOrURL.protocol)
    {
        this.loadUrl(parsedPathOrURL)
    }
    else 
    {

        this.loadFile(pathOrURL)
    } 
}

/**
 *  This function loads the JSON file and returns a list of items
 *  @method loadFile
 */
SwagMapModel.prototype.loadFile = function(jsonPath) {
    fs.readFile(jsonPath, function(err, data) {
        if (err) {
            console.log("Error" + err);
            return;
        }
        var dataitems = JSON.parse(data);
        for (var i = 0; i < dataitems.items.length; i++){
            this.swagItemModels.push(new SwagItemModel(dataitems.items[i]));
        }
        
        this.trigger("loaded");

    }.bind(this));
}

/**
*  This function loads A JSON file from a url
*  @method loadUrl
*/
SwagMapModel.prototype.loadUrl = function (jsonUrl){
    var options = {
        url: jsonUrl,
    };
    request(options, function(error, response, body){
    if (!error && response.statusCode == 200){
       var dataitems = JSON.parse(body);
       for (var i = 0; i < dataitems.items.length; i++){
            this.swagItemModels.push(new SwagItemModel(dataitems.items[i]));
        }
    }
    this.trigger("loaded");
    }.bind(this));
}

/**
 *  This function gets data items from swagItemModels 
 *  @method getItemDatas
 */
SwagMapModel.prototype.getItemDatas = function() {
    var itemDatas = [];
    for (var i = 0; i < this.swagItemModels.length; i++){
        var x = this.swagItemModels[i].x;
        var y = this.swagItemModels[i].y;
        itemDatas.push(this.swagItemModels[i].getSwagItemData(x, y));
    }
    return itemDatas;
}

/**
*  This function gets swag item models
*  @method getSwagItemModels
*/
SwagMapModel.prototype.getSwagItemModels = function (){
    return this.swagItemModels;
}

module.exports = SwagMapModel;