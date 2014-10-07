var SwagItemData = require("../data/SwagItemData");

/**
 * This is resposible for creating an item model using jsondata
 * @class SwagItemModel
 */
function SwagItemModel(jsondata) {
    this.x = jsondata.x;
    this.y = jsondata.y;
    
}

/**
*  This gets the swagItemData from the jsondata 
*  @method getSwagItemData
*/
SwagItemModel.prototype.getSwagItemData = function(){
    var swagItemData = new SwagItemData(this.x, this.y);
    return swagItemData;
}

module.exports = SwagItemModel;
