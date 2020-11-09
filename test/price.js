let chai = require('chai');
//let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect();
var path = require('path');
var file = path.basename(__filename).split(".js")[0]


describe(file + "-TC", () => {

    beforeEach(function(done) {
        FUNCTIONS.price.cases = FUNCTIONS.price.cases += 1;
        done();
    });
    afterEach(function(done) {
        if (this.currentTest.state == 'passed') {
            FUNCTIONS.price.pass = FUNCTIONS.price.pass += 1;
        }
        if (this.currentTest.state == 'failed') {
            FUNCTIONS.price.fail = FUNCTIONS.price.fail += 1;
        }
        done();
    });

    it(file + "() should return an integer greater than 0 on success", (done) => {
        yahoo.price('AAPL', function(err, data) {
            data.should.to.be.at.least(1)
            done();
        })
    });

    it(file + "() should return error if ticker doesnt exist", (done) => {
        yahoo.price('abcdefghijk', function(err, data) {
            err.should.not.equal(null);
            err.should.have.property('code');
            err.should.have.property('description');
            done();
        })
    });
});



