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

module.exports.removeCardById = async (card_id, req, res) => {
try {
  await db.connect();
  if(ObjectId.isValid(card_id)){
    const collection = db.getCollection('cards');

    const deletedCard = await collection.findOneAndDelete({_id: card_id})
    return deletedCard
  } else{
   return res.status(400).send({message: "Invalid input"}) //card not found
   //QUESTION for learning res.? can res be in model? ???       return Promise.reject ({ status: 404, message: 'Card does not exist' });
  }
} catch(err){
  throw err;
}
finally{
  db.close()
} 
}


module.exports.updateCardIsCorrectPatch = async (card_id) => {
  try {
    await db.connect();

    const objectId = new ObjectId(card_id);

    const collection = db.getCollection('cards');
    // console.log(`this one item ${card_id} >>> `, await collection.findOne({_id:  objectId}));
    // console.log("All Cards:", await collection.find({}).toArray());
    const updatedCard = await collection.updateOne(
      { _id: objectId },
      { $set: { isCorrect: true } },
      { returnDocument: 'after' }
    );
// console.log("updatedCard >>", updatedCard)
    if (updatedCard.matchedCount === 0) {
      console.log("Card not found:", card_id);
      throw new Error("Card not found");
    } else if (updatedCard.matchedCount === 1) {
      console.log("Card updated successfully");
      return { message: "Card updated successfully" };
    }

    
  } catch (err) {
    throw err;
  } finally {
    db.close();
  }
};


