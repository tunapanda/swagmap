var EventDispatcher = require("../utils/EventDispatcher");
var inherits = require("inherits");
var fs = require("fs")
var SwagItemModel = require("./SwagItemModel");
var SwagItemData = require("../data/SwagItemData");

/**
 * Main swag map model.
 * @class SwagMapModel
 */
function SwagMapModel() {
    this.swagItemModels = [];
}
inherits(SwagMapModel, EventDispatcher);

/**
 *  This function loads the JSON file and returns a list of items
 *  @ method load
 */
SwagMapModel.prototype.load = function(url) {
    fs.readFile(url, function(err, data) {
        if (err) {
            console.log("Error" + err);
            return;
        }
        var dataitems = JSON.parse(data);
        for (var i = 0; i < dataitems.items.length; i++){
            this.swagItemModels.push(new SwagItemModel(dataitems.items[i]));
   //         console.log(this.swagItemModels.length);
        }
        
        this.trigger("loaded");

    }.bind(this));
}

/**
 *  This function gets data items from the JSON file
 *  @method getItemDatas
 */
SwagMapModel.prototype.getItemDatas = function() {
    var itemDatas = [];
    for (var i = 0; i < this.swagItemModels.length; i++){
        itemDatas.push(this.swagItemModels[i].getSwagItemData(this.swagItemModels[i].x, this.swagItemModels[i].y));
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