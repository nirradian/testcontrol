var config = require(__dirname + "/config.js");
var mysql      = require('mysql');
var qb = require('node-querybuilder');

var connectionMgr = {
  connections: {},
  getConnection: function(connection) {
      if (!this.connections.hasOwnProperty(connection))
      {
          if (!config.db.connections.hasOwnProperty(connection))
            return null;
          else{
              this.connections[connection] =  qb.QueryBuilder(config.db.connections[connection], 'mysql', 'single');
          }
      }
      return this.connections[connection];
  }
};

var db = function(database) {

    var self = this;
    if (typeof database == "undefined")
    {
        if (typeof config.db.default_database == "undefined")
            throw "default database not configured";
        else
            self._connection = connectionMgr.getConnection(config.db.default_database);
    }
    else
        self._connection = connectionMgr.getConnection(database);

    self.table = function(table) {
        self._table = table;
        return self;
    };

    self.connection = function(table) {
        self._connection = table;
        return self;
    };

    self.query = function() {
        return self._connection.from(self._table);
    };

    self.get = function(data, callback) {
        self.query().where(data).get([], callback);
    };



};

db.database = function (database) {
    return new db(database);
};

module.exports = db;