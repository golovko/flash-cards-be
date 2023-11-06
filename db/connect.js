const Db = 'mongodb://localhost:27017/flash-cards-db';
const mongoose = require('mongoose');

const connection = async () => {
  await mongoose.connect(Db);
  console.log('connected to DB');
};

module.exports = connection;
