var EventDispatcher = require("../utils/EventDispatcher");
var inherits = require("inherits");
var fs = require("fs")

/**
 * Main swag map model.
 * @class SwagMapModel
 */
function SwagMapModel() {
    
}
inherits(SwagMapModel, EventDispatcher);

/**
*  This function loads the JSON file and returns a list of items 
*  @load
*/
SwagMapModel.prototype.load = function(url){
    fs.readFile(url, function (err, data){
    	if(err){
    		console.log("Error" + err);
    		return;
    	}
    	data = JSON.parse(data);
    	console.log(data);
    	for (var i = 0; i < data.items.length; i++){
	   		swagItemsDatas = new swagItemData(data[i]);
		}

    	this.trigger("loaded")

    }.bind(this));
}


module.exports = SwagMapModel;