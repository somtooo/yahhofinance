let chai = require("chai");
let should = chai.should();
let expect = chai.expect();var path = require("path");
var file = path.basename(__filename).split(".js")[0];

describe(file + "-TC", () => {
	beforeEach(function(done) {
		FUNCTIONS[file].cases = FUNCTIONS[file].cases += 1;
		done()
	});
	afterEach(function(done) {
		if (this.currentTest.state == "passed") {
			FUNCTIONS[file].pass = FUNCTIONS[file].pass += 1;
		}
		if (this.currentTest.state == "failed") {
			FUNCTIONS[file].fail = FUNCTIONS[file].fail += 1;
		}
		done();
	});



});