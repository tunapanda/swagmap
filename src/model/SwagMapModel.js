var EventDispatcher = require("../utils/EventDispatcher");
var inherits = require("inherits");
var fs = require("fs")
var SwagItemModel = require("./SwagItemModel");

/**
 * Main swag map model.
 * @class SwagMapModel
 */
function SwagMapModel() {
    this.dataitems;
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
        this.dataitems = JSON.parse(data);
        this.trigger("loaded");

    }.bind(this));
}

/**
 *  This function gets data items form the JOSN file
 *  @method getItemDatas
 */
SwagMapModel.prototype.getItemDatas = function() {
    //console.log(this.dataitems.items);
    return this.dataitems.items;
}

module.exports = SwagMapModel;