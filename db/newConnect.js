const { biologyCards } = require('./data/cards-mock');
const MongoClient = require('mongodb').MongoClient;
const ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: `${__dirname}/../.env.${ENV}`,
});

if (!process.env.MONGO_URI || !process.env.MONGO_DB) {
  throw new Error('MONGO_URI or MONGO_DB not set');
}

const mongoURI = process.env.MONGO_URI;

let client = null;

async function connect() {
  if (!client) {
    client = new MongoClient(mongoURI);
    await client.connect();
  }
}

function getCollection(collectionName) {
  if (!client) {
    throw new Error('Database is not connected.');
  }
  const db = client.db(process.env.MONGO_DB);
  return db.collection(collectionName);
}

async function close() {
  if (client) {
    await client.close();
    client = null;
  }
}

module.exports = {
  connect,
  getCollection,
  close,
};
