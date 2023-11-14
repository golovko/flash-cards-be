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
  const { question, answer, topic, author } = newCard;

  try {
    await db.connect();
    const collection = db.getCollection('cards');
    const insertedCard = await collection.insertOne({
      question,
      answer,
      topic,
      author,
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

module.exports.removeCardById = async (card_id) => {
  try {
    await db.connect();
    const id = new ObjectId(card_id);
    const collection = await db.getCollection('cards');
    const deletedCard = await collection.deleteOne({ _id: id });
    return deletedCard;
  } catch (error) {
    console.log(error);
    throw error;
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

module.exports.updateCardPatch = async (card_id, cardUpdate) => {
  const { answer, topic, isCorrect } = cardUpdate;
  try {
    await db.connect();
    const objectId = new ObjectId(card_id);

    const collection = db.getCollection('cards');
    const updatedCard = await collection.updateOne(
      { _id: objectId },
      {
        $set: {
          answer: answer,
          topic: topic,
          isCorrect: isCorrect,
        },
      },
      { returnDocument: 'after' }
    );
    if (updatedCard.matchedCount === 0) {
      throw new Error('Card not found');
    } else if (updatedCard.matchedCount === 1) {
      const patchedCard = await collection.findOne({ _id: objectId });
      return patchedCard;
    }
  } catch (err) {
    throw err;
  } finally {
    db.close();
  }
};

// reset all cards on ${topic} isCorrect => false
module.exports.resetCardsIsCorrect = async (topic) => {
  const query = topic ? { topic } : {};

  try {
    await db.connect();
    const collection = db.getCollection('cards');
    const updatedCards = await collection.updateMany(query, {
      $set: { isCorrect: false },
    });

    if (updatedCards.matchedCount === 0) {
      throw { status: 404, message: `No cards found` };
    }
    return { message: 'Successfully reset isCorrect for All cards' };
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    db.close();
  }
};
