var EventDispatcher = require("../utils/EventDispatcher");
var inherits = require("inherits");

/**
 * Main swag map model.
 * @class SwagMapModel
 */
function SwagMapModel() {

}

inherits(SwagMapModel, EventDispatcher);

module.exports = SwagMapModel;