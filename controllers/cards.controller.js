const { ObjectId } = require('mongodb');
const {
  fetchCards, fetchCardsByUser,
  insertCard,
  fetchCardById,
  removeCardById,
  updateCardPatch,
  resetCardsIsCorrect,
} = require('../models/cards.model');

module.exports.getCards = async (req, res, next) => {
  const { user, topic} = req.query;
  try {
    if (user){
    const fetchedCardsByUser = await fetchCardsByUser(user, topic);
   
    res.status(200).send(fetchedCardsByUser);
    }else {
    res.status(400).json({ error: 'User parameter is required.' });
    }
  } catch (err){
  }
}

// module.exports.getCardsByUser = async (req, res, next) => {
//   const { user, topic} = req.query;
//   try {
//     if (user){
//     const fetchedCardsByUser = await fetchCardsByUser(user, topic);
   
//     res.status(200).send(fetchedCardsByUser);
//     }else {
//     res.status(400).json({ error: 'User parameter is required.' });
//     }
//   } catch (err){
//   }
// }


module.exports.postCard = async (req, res, next) => {
  try {
    const newCard = req.body;

    if (!newCard.question || !newCard.answer || !newCard.topic) {
      return res.status(400).send({ message: 'Card fields cannot be empty' });
    }
    const insertedCard = await insertCard(newCard);
    res.status(201).send({ card: insertedCard });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error occurred when posting the car' });
  }
};

module.exports.deleteCard = async (req, res, next) => {
  try {
    const { card_id } = req.params;
    const deletingCard = await removeCardById(card_id);
    return res.status(200).send(deletingCard);
  } catch (error) {
    console.error(error);
  }
};
module.exports.getCardById = async (req, res, next) => {
  try {
    const fetchedCard = await fetchCardById(req.params.card_id);
    res.status(200).send(fetchedCard);
  } catch (err) {
  }
};

module.exports.updateCard = async (req, res, next) => {
  try {
    const newUpdate = req.body;
    const { card_id } = req.params;

    if (
      !newUpdate.answer &&
      !newUpdate.topic &&
      newUpdate.isCorrect === undefined
    ) {
      return res
        .status(400)
        .send({ message: 'At least one field must be provided for update' });
    }

    const cardToUpdate = await updateCardPatch(card_id, newUpdate);
    if (!cardToUpdate) {
      return res.status(404).send({ message: 'Card not found' });
    }

    res
      .status(200)
      .send({ message: 'Card updated successfully', card: cardToUpdate });
  } catch (error) {
    console.error(error);
    res
      .status(error.status || 500)
      .send({ message: error.message || 'Error updating card' });
  }
};

module.exports.resetAllCards = async (req, res, next) => {
  const { user, topic } = req.query;
  try {
    if (user) {
      await resetCardsIsCorrect(user, topic);

      res.status(204).send({ message: 'Successfully reset isCorrect for cards' });

    }else {
      res.status(400).json({ error: 'User parameter is required.' });
    }
  
  } catch (error) {
    console.error(error);
    res
      .status(error.status || 500)
      .send({ message: error.message || 'Error resetting cards' });
  }
};
