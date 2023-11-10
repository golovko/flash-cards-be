const { fetchTopics, insertTopic } = require('../models/topics.model');

module.exports.getTopics = async (req, res, next) => {
  try {
    const fetchedTopics = await fetchTopics();
    await res.status(200).send(fetchedTopics);
  } catch (err) {
    console.log(err);
  }
};

module.exports.postTopic = async (req, res, next) => {
  const topic = await insertTopic(req.body);
  res.status(201).send(topic);
};