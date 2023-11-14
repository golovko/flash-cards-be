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
    await db.close();
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
    await db.close();
  }
};

module.exports.deleteTopicBySlug = async (slug) => {
  try {
    await db.connect();
    const collection = db.getCollection('topics');
    const deleted = await collection.deleteOne({ slug: slug });
    return deleted;
  } catch (err) {
    console.error('Error deleting topic!', err);
    throw err;
  } finally {
    await db.close();
  }
};

module.exports.updateTopicBySlug = async (slug, updatedInfo) => {
  console.log(slug);
  console.log(updatedInfo);
  try {
    await db.connect();
    const collection = db.getCollection('topics');
    const updatedTopic = await collection.updateOne(
      { slug: slug },
      {
        $set: { name: updatedInfo.name, description: updatedInfo.description },
      },
      { returnDocument: 'after' }
    );
    console.log(updatedTopic, 'updated');
    return updatedTopic;
  } catch (err) {
    throw err;
  } finally {
    await db.close();
  }
};
