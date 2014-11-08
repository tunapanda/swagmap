var qsub = require("qsub");
var async = require("async");
var fs = require("fs");
var fse = require("fs-extra");

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')
	});

	grunt.registerTask("test", function() {
		var done = this.async();

		async.series([

			function(next) {
				var job = new qsub("./node_modules/.bin/jasmine-node");
				job.arg("--captureExceptions", "--verbose", "test/unit");

				if (grunt.option("match"))
					job.arg("--match", grunt.option("match"));

				job.show().expect(0);

				job.run().then(next, grunt.fail.fatal);
			},

			function() {
				done();
			}
		]);
	});

	grunt.registerTask("browserify", function() {
		var done = this.async();

		async.series([

			function(next) {
				var job = new qsub("./node_modules/.bin/browserify");
				job.arg("--debug", "-o", "test/view/swagmap.bundle.js", "src/swagmap.js");
				job.show().expect(0);

				job.run().then(next, grunt.fail.fatal);
			},

			function() {
				done();
			}
		]);
	});

	grunt.registerTask("doc", function() {
		var done = this.async();

		var job = qsub("./node_modules/.bin/yuidoc");
		job.arg("--configfile", "res/yuidoc/yuidoc.json");
		job.show().expect(0);
		job.run().then(
			function() {
				fse.copySync("res/yuidoc/tunapanda.png", "doc/tunapanda.png");
				done();
			},

			function(e) {
				console.log(e);
				grunt.fail.fatal(e);
			}
		);
	});

	grunt.registerTask("publish-doc", function() {
		var done = this.async();

		if (fs.existsSync("doc.zip"))
			fs.unlinkSync("doc.zip");

		async.series([

			function(next) {
				var job = qsub("zip");
				job.arg("-r", "doc.zip", "doc");
				job.expect(0);
				job.run().then(next, grunt.fail.fatal);
			},

			function(next) {
				console.log("running...");

				var job = qsub("curl");
				job.arg("-s", "-X", "POST");
				job.arg("--data-binary", "@doc.zip");
				job.arg("http://limikael.altervista.org/?target=swagmapdoc&key=TEL46U6L");
				job.expect(0).show();

				job.run().then(
					function() {
						if (job.output.substring(0, 2) != "OK") {
							console.log(job.output);
							grunt.fail.fatal("Unexpected output from curl");
						}

						next();
					},
					function(e) {
						grunt.fail.fatal(e);
					}
				);
			},

			function() {
				if (fs.existsSync("doc.zip"))
					fs.unlinkSync("doc.zip");

				done();
			}
		]);
	});

	grunt.registerTask("publish-demo", function() {
		var done = this.async();

		if (fs.existsSync("demo.zip"))
			fs.unlinkSync("demo.zip");

		async.series([

			function(next) {
				var job = qsub("zip");
				job.arg("-r", "demo.zip", "test/view");
				job.expect(0);
				job.run().then(next, grunt.fail.fatal);
			},

			function(next) {
				console.log("running...");

				var job = qsub("curl");
				job.arg("-s", "-X", "POST");
				job.arg("--data-binary", "@demo.zip");
				job.arg("http://limikael.altervista.org/?target=swagmapdemo&key=TEL46U6L");
				job.expect(0).show();

				job.run().then(
					function() {
						if (job.output.substring(0, 2) != "OK") {
							console.log(job.output);
							grunt.fail.fatal("Unexpected output from curl");
						}

						next();
					},
					function(e) {
						grunt.fail.fatal(e);
					}
				);
			},

			function() {
				if (fs.existsSync("demo.zip"))
					fs.unlinkSync("demo.zip");

				done();
			}
		]);
	});

	grunt.registerTask("default", function() {
		console.log("Available tasks:");
		console.log("");
		console.log("  doc           - Build documentation.");
		console.log("  publish-doc   - Upload internal class docs to: http://limikael.altervista.org/swagmapdoc");
		console.log("  publish-demo  - Upload demo to: http://limikael.altervista.org/swagmapdemo");
		console.log("  test          - Run tests on model.");
		console.log("  browserify    - Compile javascript bundle.");
	});
};