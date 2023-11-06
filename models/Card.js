const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const cardSchema = new Schema({
  published: Boolean,
  author: String,
  question: String,
  answer: String,
  topic: String,
  deck: [String],
  tags: [String],
  createdAt: Date,
  updatedAt: Date,
});

const Card = model('Card', cardSchema);
module.exports = Card;
