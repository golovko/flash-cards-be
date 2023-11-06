const { MongoClient } = require('mongodb');
const Db = 'mongodb://localhost:27017';
const ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: `${__dirname}/../.env.${ENV}`,
});

const client = new MongoClient(Db);

var _db;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      console.log(db);
      if (db) {
        _db = db.db('flash-card-db');
        console.log('Successfully connected to MongoDB.');
      }
      return callback(err);
    });
  },

  getDb: function () {
    return _db;
  },
};
