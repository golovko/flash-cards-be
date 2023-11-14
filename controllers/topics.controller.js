const {
  fetchTopics,
  insertTopic,
  deleteTopicBySlug,
  updateTopicBySlug,
} = require("../models/topics.model");

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

module.exports.deleteTopic = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const deletedTopic = await deleteTopicBySlug(slug);
    if (!deletedTopic) {
      return res.status(404).send({ msg: "Topic doesn't exist!" });
    }
    return res.status(204).send();
  } catch (err) {
    console.error("There was a problem deleting your topic", err);
  }
};

module.exports.editTopic = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const updatedInfo = req.body;
    const updatedTopic = await updateTopicBySlug(slug, updatedInfo);
    return res.status(200).send(updatedTopic);
  } catch (err) {}
};
