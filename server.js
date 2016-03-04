var express = require('express');
var TestSuite = require('./models/TestSuite.js')
var TestCase = require('./models/TestCase.js')
var app = express();

app.use(express.static('public'));


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/testcase', function (req, res) {

    TestCase.findById(0, function(err, data) {
        res.send(data);
    })
});

app.get('/testsuite', function (req, res) {

    TestSuite.find({}, function(err, data) {
        res.send(data);
    })
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});