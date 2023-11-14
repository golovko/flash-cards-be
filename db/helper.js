const { ObjectId } = require('mongodb');
const { createHash } = require('crypto');

module.exports.getObjectId = (name) => {
  if (name === '') {
    throw new Error('Name cannot be empty');
  }
  const hash = createHash('sha1').update(name, 'utf8').digest('hex');
  return new ObjectId(hash.substring(0, 24));
};

module.exports.getObjectIds = (names) => {
  return names.map((name) => getObjectId(name));
};
