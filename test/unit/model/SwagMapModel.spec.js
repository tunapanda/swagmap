var SwagMapModel = require("../../../src/model/SwagMapModel");

describe("SwagMapModel", function() {
	it("can dispatch events", function() {
		var m = new SwagMapModel();
		var spy = jasmine.createSpy();

		m.on("the_event", spy);
		m.trigger("the_event");

		expect(spy).toHaveBeenCalled();
	});

	it("can load a swag map", function(done) {
		var m = new SwagMapModel();

		m.on("loaded", function() {
			expect(m.getItemDatas().length).toBe(3);
			done();
		});

		m.load(__dirname + "/res/swagmap.json");
	});
});