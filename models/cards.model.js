const db = require('../db/newConnect');
const { ObjectId } = require('mongodb');

module.exports.fetchCards = async (topic) => {
  let query = {};
  if (topic) query = { topic: topic };
  try {
    await db.connect();
    const collection = db.getCollection('cards');
    const fetchedCards = await collection.find(query).toArray();
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
    const cardId = new ObjectId(insertedCard.insertedId);
    const postedCard = await collection.findOne({ _id: cardId });
    return postedCard;
  } catch (err) {
    throw err;
  } finally {
    db.close();
  }
};

module.exports.removeCardById = async (card_id, req, res) => {
try {
  await db.connect();
  if(ObjectId.isValid(card_id)){
    const collection = db.getCollection('cards');

  await collection.findOneAndDelete({_id: card_id})
  } else{
   return res.status(400).send({message: "Invalid input"})
  }
} catch(err){
  throw err;
}
finally{
  db.close()
} 
}

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
