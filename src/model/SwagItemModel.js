var SwagItemData = require("../data/SwagItemData");
/**
 * This is resposible for creating an item model using jsondata
 * @class SwagItemModel
 */
function SwagItemModel(jsondata) {
    this.x = jsondata.x;
    this.y = jsondata.y;
    this.object = jsondata.object;
    this.completed = false;
}

/**
*  This gets the swagItemData from the jsondata 
*  @method getSwagItemData
*/
SwagItemModel.prototype.getSwagItemData = function(){
    var swagItemData = new SwagItemData(this.x, this.y, this.object, this.completed);
    return swagItemData;
}

SwagItemModel.prototype.handleXApiStatement = function(xApiStament){
	var actor = xApiStament["actor"];
	var verb = xApiStament["verb"];
	var object = xApiStament["object"];
	if (object['id'] === this.object){
		if (verb['id'].search("completed") >= 0){
			this.completed = true;
		}
	} 
}

module.exports = SwagItemModel;

