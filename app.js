const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db/newConnect');
const ObjectId = require('mongodb').ObjectId;

const { usersGet, usersPost } = require('./controllers/users.controller');
const {
  getCards,
  getCardById,
  postCard, deleteCard, updateCardIsCorrect
} = require('./controllers/cards.controller');
const { getTopics, postTopic } = require('./controllers/topics.controller');

app.use(cors());
app.use(express.json());

app.get('/api/cards', getCards);
app.get('/api/cards/:card_id', getCardById);
app.post('/api/cards', postCard);
app.delete('/api/cards/:card_id', deleteCard);
app.patch('/api/cards/:card_id', updateCardIsCorrect);

app.get('/api/users', usersGet);
app.post('/api/users', usersPost);

app.get('/api/topics', getTopics);
app.post('/api/topics', postTopic);
module.exports = app;
