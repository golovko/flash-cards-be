const db = require('../db/newConnect');

module.exports.fetchTopics = async (username) => {
  const query = {};
  if (username) query.username = username;
  try {
    await db.connect();
    const collection = db.getCollection('topics');
    const fetchedTopics = await collection.find(query).toArray();
    return fetchedTopics;
  } catch (err) {
    console.log(err);
  } finally {
    db.close();
  }
};

module.exports.insertTopic = async (topic) => {
  try {
    await db.connect();
    const collection = db.getCollection('topics');
    const inserted = await collection.insertOne(topic);
    return inserted;
  } catch (err) {
    console.log(err);
  } finally {
    db.close();
  }
};
