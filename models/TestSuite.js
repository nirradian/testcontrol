var Model = require("../model.js");

var TestSuite = function(data) {
    Model.call(this, data);

    console.log("created this model", this);
};

TestSuite.inheritsFrom(Model);

TestSuite.database = "test_control";
TestSuite.table = "test_suites";


module.exports = TestSuite;
