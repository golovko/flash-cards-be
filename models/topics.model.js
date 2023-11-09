const db = require("../db/newConnect");

module.exports.fetchTopics = async () => {
  try {
    await db.connect();
    const collection = db.getCollection("topics");
    const fetchedTopics = await collection.find({}).toArray();
    return fetchedTopics;
  } catch (err) {
    console.log(err);
  } finally {
    db.close();
  }
};
