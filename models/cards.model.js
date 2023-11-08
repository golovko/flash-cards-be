const db = require('../db/newConnect');

module.exports.cardsFetch = async () => {
  try {
    await db.connect();
    const collection = db.getCollection('cards');
    const fetchedCards = await collection.find({}).toArray();
    return fetchedCards;
  } catch (err) {
    
  } finally {
    db.close();
  }
};
