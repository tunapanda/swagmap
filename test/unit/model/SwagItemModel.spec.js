var SwagItemModel = require("../../../src/model/SwagItemModel");

describe("SwagItemModel", function() {
	it("can be created from data", function() {
		var jsonData = {
			x: 20,
			y: 21
		};

		var swagItemModel = new SwagItemModel(jsonData);
		var data = swagItemModel.getSwagItemData();

		expect(data.getX()).toBe(20);
		expect(data.getY()).toBe(21);
	});
});