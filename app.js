const express = require('express');
const cors = require('cors');
const app = express();
const Card = require('./models/Card');

const db_connect = require('./db/connect');
const ObjectId = require('mongodb').ObjectId;

app.use(cors());
app.use(express.json());
db_connect();

app.get('/api/cards', async function (req, res) {
  try {
    const fetchedCards = await Card.find({});
    res.status(200).send(fetchedCards);
  } catch (err) {
    console.log(err);
  }
});

app.get('/api/cards/:card_id', async function (req, res) {
  let id = req.params.card_id;
  console.log(id);
  try {
    const fetchedCard = await Card.find({ _id: id });
    res.status(200).send(fetchedCard);
  } catch (err) {
    console.log(err);
  }
});

app.post('/api/cards', async function (req,res) {
  const card = new Card({
    question: req.body.question,
    answer: req.body.answer,
    topic: req.body.topic
  })
  try{
    const insertCard = await card.save()
    res.status(201).send(insertCard)
  } catch(err){
    console.log(err)
  }
})
module.exports = app;
