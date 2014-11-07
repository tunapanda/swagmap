var SwagItemModel = require("../../../src/model/SwagItemModel");

describe("SwagItemModel", function() {
	/*it("can be created from data", function() {
		var jsonData = {
			x: 20,
			y: 21
		};

		var swagItemModel = new SwagItemModel(jsonData);
		var data = swagItemModel.getSwagItemData();

		expect(data.getX()).toBe(20);
		expect(data.getY()).toBe(21);
	});*/

	it("can check if an xAPI statement matches", function() {
		var jsonData = {
			x: 20,
			y: 21,
			object: "http://example.com/activity"
		};

		var swagItemModel = new SwagItemModel(jsonData);

		// At first, it should not be complete.
		var data = swagItemModel.getSwagItemData();
		expect(data.isComplete()).toBe(false);

		// First, handle an "attempted" activity. Nothing should happen.
		xApiStatement = {
			"actor": {
				"mbox": "test@example.com"
			},

			"verb": {
				"id": "http://adlnet.gov/expapi/verbs/attempted/"
			},

			"object": {
				"id": "http://example.com/activity"
			}
		};

		swagItemModel.handleXApiStatement(xApiStatement);
		expect(swagItemModel.getSwagItemData().isComplete()).toBe(false);

		// Then, handle an "completed" activity.
		// Now the data should show that the activity is completed.
		xApiStatement = {
			"actor": {
				"mbox": "test@example.com"
			},

			"verb": {
				"id": "http://adlnet.gov/expapi/verbs/completed/"
			},

			"object": {
				"id": "http://example.com/activity"
			}
		};

		swagItemModel.handleXApiStatement(xApiStatement);
		expect(swagItemModel.getSwagItemData().isComplete()).toBe(true);
<<<<<<< HEAD
	});
=======
	});*/

	/*it("checks so that the object and verb matches",function() {
		var jsonData = {
			x: 20,
			y: 21,
			object: "http://example.com/activity"
		};

		var swagItemModel = new SwagItemModel(jsonData);

		// This is related to another activity, it should not affect the completion.
		xApiStatement = {
			"actor": {
				"mbox": "test@example.com"
			},

			"verb": {
				"id": "http://adlnet.gov/expapi/verbs/completed/"
			},

			"object": {
				"id": "http://example.com/some/other/activity"
			}
		};

		swagItemModel.handleXApiStatement(xApiStatement);
		expect(swagItemModel.getSwagItemData().isComplete()).toBe(false);
	});*/
>>>>>>> 07e65e49cbe89828052934d5554db021dfb6acb9
});