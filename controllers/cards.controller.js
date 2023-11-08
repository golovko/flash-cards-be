const { cardsFetch } = require('../models/cards.model');

module.exports.cardsGet = async (req, res, next) => {
  try {
    const fetchedCards = await cardsFetch();
    await res.status(200).send(fetchedCards);
  } catch {}
};
