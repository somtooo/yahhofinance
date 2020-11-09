let chai = require('chai');
let should = chai.should();
let expect = chai.expect();
var path = require('path');
var file = path.basename(__filename).split(".js")[0]


describe(file + "-TC", () => {

    beforeEach(function(done) {
        FUNCTIONS[file].cases = FUNCTIONS[file].cases += 1;
        done();
    });
    afterEach(function(done) {
        if (this.currentTest.state == 'passed') {
            FUNCTIONS[file].pass = FUNCTIONS[file].pass += 1;
        }
        if (this.currentTest.state == 'failed') {
            FUNCTIONS[file].fail = FUNCTIONS[file].fail += 1;
        }
        done();
    });

    it(file + "() should return an array of values", (done) => {
        yahoo.history('AAPL', '2020-01-01', '2020-02-01', '1d', function(err, data) {
            data.should.be.an('array');
            done();
        })
    });

    it(file + "() should return an error if ticker(1st) argument is bad", (done) => {
        yahoo.history('abcdefghij', '2020-01-01', '2020-02-01', '1d', function(err, data) {
            err.should.not.equal(null);
            err.should.have.property('code');
            err.should.have.property('description');
            done();
        })
    });

    it(file + "() should return an error if interval(4th) argument is bad", (done) => {
        yahoo.history('AAPL', '2020-01-01', '2020-02-01', 'abc', function(err, data) {
            err.should.not.equal(null);
            err.should.have.property('code');
            err.should.have.property('description');
            done();
        })
    });
    
});
