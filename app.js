const express = require('express');
const cors = require('cors');
const app = express();
const { db } = require('./db/connect');
const ObjectId = require('mongodb').ObjectId;
const collection = db.collection('cards');

app.use(cors());
app.use(express.json());

app.get('/api/cards', async function (req, res) {
  try {
    const fetchedCards = await collection.find({}).toArray();
    res.status(200).send(fetchedCards);
  } catch (err) {
    console.log(err);
  }
});

app.get('/api/cards/:card_id', async function (req, res) {
  try {
    const objectId = new ObjectId(req.params.card_id);
    const fetchedCard = await collection.findOne({ _id: objectId });
    console.log(fetchedCard);
    res.status(200).send(fetchedCard);
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;
