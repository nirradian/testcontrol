var db = require("./db.js");

Function.prototype.inheritsFrom = function( parentClassOrObject ){
    if ( parentClassOrObject.constructor == Function )
    {
        //Normal Inheritance
        this.prototype = Object.create(parentClassOrObject.prototype);
        this.constructor = this;
        this.prototype.parent = parentClassOrObject.prototype;
    }
    else
    {
        //Pure Virtual Inheritance
        this.prototype = parentClassOrObject;
        this.prototype.constructor = this;
        this.prototype.parent = parentClassOrObject;
    }

    for (var i in parentClassOrObject) {
        this.constructor[i] = parentClassOrObject[i];
    }

    return this;
};

var Model = function(data) {
    var self = this;

    self.rawData = data;

    for (var i in data) {
        if (data.hasOwnProperty(i)) {
            self[i] = data[i];
        }
    }
};

Model.key = "id";

Model.qb = function() {
    return db.database(this.constructor.database).table(this.constructor.table);
};

Model.findById = function(id, callback) {
    var whereObj = {};
    whereObj[this.constructor.key] = id;
    this.constructor.qb().limit(1).get(whereObj, function(err, response) {
        if (err || response.length == 0)
            callback(err);
        else
            callback(null, new (this.constructor)(response[0]));
    });
};

Model.first  = function(callback) {
    this.constructor.qb().query().limit(1).get([], function(err, response) {
        if (err || response.length == 0)
            callback(err);
        else
            callback(null, new (this.constructor)(response[0]));
    });
};

Model.find = function(whereObj, callback) {
    console.log("here");
    this.constructor.qb().query().where(whereObj).get([], function(err, response) {
        if (err || response.length == 0)
            callback(err);
        else {
            var result = [];
            for (var i = 0; i < response.length; i++)
                result.push(new (this.constructor)(response[i]));

            callback(null, result);
        }

    });
};



module.exports = Model;