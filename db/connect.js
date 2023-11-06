let Db;
const mongoose = require('mongoose');
const ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: `${__dirname}/../.env.${ENV}`,
});

if (!process.env.MONGO_URI || !process.env.MONGO_DB) {
  throw new Error('MONGO_URI or MONGO_DB not set');
}

Db = process.env.MONGO_URI + process.env.MONGO_DB;

const connection = async () => {
  await mongoose.connect(Db);
  console.log('connected to DB');
};

module.exports = connection;
