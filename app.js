const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db/newConnect');
const ObjectId = require('mongodb').ObjectId;
const { cardsGet } = require('./controllers/cards.controller');
const { usersGet, usersPost } = require('./controllers/users.controller');

app.use(cors());
app.use(express.json());

app.get('/api/cards', cardsGet);

app.get('/api/cards/:card_id', async function (req, res) {
  try {
    await db.connect();
    const collection = db.getCollection('cards');
    const objectId = new ObjectId(req.params.card_id);
    const fetchedCard = await collection.findOne({ _id: objectId });
    console.log(fetchedCard);
    res.status(200).send(fetchedCard);
  } catch (err) {
    
  } finally {
  }
});



























app.get('/api/users', usersGet)
app.post('/api/users', usersPost)
module.exports = app;
