const db = require('../db/newConnect');
const { ObjectId } = require('mongodb');

module.exports.fetchCards = async () => {
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

module.exports.insertCard = async (newCard) => {
  const { question, answer, topic } = newCard;

  try {
    await db.connect();
    const collection = db.getCollection('cards');
    const insertedCard = await collection.insertOne({
      question,
      answer,
      topic,
    });
    return insertedCard;
  } catch (err) {
    throw err;
  } finally {
    await db.close();
  }
};

module.exports.fetchCardById = async (card_id) => {
  try {
    await db.connect();
    const collection = db.getCollection('cards');
    const objectId = new ObjectId(card_id);
    return await collection.findOne({ _id: objectId });
  } catch (err) {
    return err;
  }
};
