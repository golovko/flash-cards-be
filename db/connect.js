const { biologyCards } = require('./data/cards-mock');
const MongoClient = require('mongodb').MongoClient;
const ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: `${__dirname}/../.env.${ENV}`,
});

if (!process.env.MONGO_URI || !process.env.MONGO_DB) {
  throw new Error('MONGO_URI or MONGO_DB not set');
}

let uri = process.env.MONGO_URI;

const client = new MongoClient(uri);
client.connect();
const db = client.db(process.env.MONGO_DB);

const connection = async () => {
  try {
    await client.connect();
    const db = dbClient.db(process.env.MONGO_DB);
  } catch (err) {
    console.log(err.stack);
  }
  console.log('connected to DB');
  return db;
};

module.exports = { db, client };
