const express = require('express');
const cors = require('cors');
const app = express();

const dbo = require('./db/connect');
const ObjectId = require('mongodb').ObjectId;

app.use(cors());
app.use(express.json());

app.get('/api/articles', (req, res) => {
  let db_connect = dbo.getDb('flash-cards-db');
  db_connect
    .collection('articles')
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.status(200).send(json(result));
    });
});

module.exports = app;
