const { biologyCards } = require('./data/cards-mock');
const MongoClient = require('mongodb').MongoClient;
let uri;
const ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: `${__dirname}/../.env.${ENV}`,
});

if (!process.env.MONGO_URI || !process.env.MONGO_DB) {
  throw new Error('MONGO_URI or MONGO_DB not set');
}

uri = process.env.MONGO_URI;

async function seedDB() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected correctly to server');
    const collection = client.db('flash-cards-test').collection('cards');
    collection.drop();
    collection
      .insertMany(biologyCards)
      .then((val) => {
        console.log(val.insertedIds);
        console.log('Database seeded! :)');
      })
      .finally(() => client.close());
  } catch (err) {
    console.log(err.stack);
  }
}

seedDB();
