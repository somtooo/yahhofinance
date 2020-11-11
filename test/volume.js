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

	var TEST_CASE_DESC = file + "() should return an integer greater than 0 on success"
    it(TEST_CASE_DESC, (done) => {
        yahoo.volume('AAPL', function(err, data) {
			if (!err) data.should.to.be.at.least(1)
            done();
        })
    });

    var TEST_CASE_DESC = file + "() should return error if ticker doesnt exist"
    it(TEST_CASE_DESC, (done) => {
        yahoo.volume('abcdefghijk', function(err, data) {
            err.should.not.equal(null);
            err.should.have.property('code');
            err.should.have.property('description');
            done();
        })
    });



});