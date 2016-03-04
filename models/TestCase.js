var Model = require("../model.js");

var TestCase = function(data) {
    Model.call(this, data);

    console.log("created this model", this);
};

TestCase.inheritsFrom(Model);

TestCase.database = "test_control";
TestCase.table = "test_cases";


module.exports = TestCase;
