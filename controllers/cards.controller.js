const {
  fetchCards,
  insertCard,
  fetchCardById,
} = require('../models/cards.model');

module.exports.getCards = async (req, res, next) => {
  try {
    const fetchedCards = await fetchCards();
    await res.status(200).send(fetchedCards);
  } catch {}
};

module.exports.postCard = async (req, res, next) => {
  try {
    const newCard = req.body;

    if (!newCard.question || !newCard.answer || !newCard.topic) {
      return res.status(400).send({ message: 'Card fields cannot be empty' });
    }

    const insertedCard = await insertCard(newCard);
    res.status(201).json(insertedCard);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error occurred when posting the car' });
  }
};

module.exports.getCardById = async (req, res, next) => {
  try {
    const fetchedCard = await fetchCardById(req.params.card_id);
    res.status(200).send(fetchedCard);
  } catch (err) {}
};
