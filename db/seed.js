const { biologyCards } = require('./data/cards-mock');
const { db, client } = require('../db/connect');
const collection = db.collection('cards');

async function seedDB() {
  try {
    console.log('Connected correctly to server');
    //collection.drop();
    db.runCommand({
      drop: 'cards',
      writeConcern: '',
      comment: '',
    });

    const result = await collection.insertMany(biologyCards);
    console.log(result.insertedIds);
  } catch (err) {
    console.log(err.stack);
  } finally {
    console.log('connection closed');
  }
}

seedDB();
client.close();

module.exports = seedDB;
