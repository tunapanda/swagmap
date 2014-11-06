var SwagMapModel = require("../../../src/model/SwagMapModel");
var SwagItemModel = require("../../../src/model/SwagItemModel");
var http = require("http");
var request = require("request");
var fs = require("fs");

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

	it("has a number of SwagMapModel:s internally", function(done) {
		var m = new SwagMapModel();

		m.on("loaded", function() {
			var models = m.getSwagItemModels();

			expect(models.length).toBe(3);
			expect(models[0]).toEqual(jasmine.any(SwagItemModel));

			done();
		});

		m.load(__dirname + "/res/swagmap.json");
	});

	it("can load from a url", function(done) {
		var server = http.createServer();
		server.listen(2345);

		server.on("request", function(request, response) {
			console.log("got request to: " + request.url);
			expect(request.url).toBe("/file.json");
			var fileContent = fs.readFileSync(__dirname + "/res/swagmap.json");
			console.log(response.write(fileContent));
			response.end();
		});

		var m = new SwagMapModel();

		m.on("loaded", function() {
			console.log("loaded...");
			var models = m.getSwagItemModels();

			expect(models.length).toBe(3);
			expect(models[0]).toEqual(jasmine.any(SwagItemModel));

			server.close();
			done();
		});

		m.load("http://localhost:2345/file.json");
	});
});