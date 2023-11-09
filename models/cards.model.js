const db = require('../db/newConnect');
const { ObjectId } = require('mongodb');

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
    const cardId = new ObjectId(insertedCard.insertedId)
    const postedCard = await collection.findOne({_id: cardId})
    return postedCard;
  } catch (err) {
    throw err;
  } finally {
    db.close();
  }
};
