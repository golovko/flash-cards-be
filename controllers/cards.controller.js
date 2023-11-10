const { cardsFetch, insertCard, removeCardById} = require('../models/cards.model');
const { ObjectId } = require('mongodb');

module.exports.cardsGet = async (req, res, next) => {
  try {
    const fetchedCards = await cardsFetch();
    await res.status(200).send(fetchedCards);
  } catch {}
};

module.exports.postCard = async (req, res, next) => {
  try {
    const newCard = req.body;

    if(!newCard.question || !newCard.answer || !newCard.topic) {
      return res.status(400).send({ message: 'Card fields cannot be empty'});
    }

    const insertedCard = await insertCard(newCard);
    res.status(201).send({card: insertedCard});
} catch(err){
  console.error(err);
  res.status(500).send({ message: "Error occured when posting the car"});
}
};

module.exports.deleteCard = async (req, res, next) => {
  try{
    const card_id = new ObjectId(req.params.id)
    await removeCardById(card_id)
    res.status(204).send()
  }
 catch(error){
 return res.status(400).send({message: "Invalid input"})
 }
}