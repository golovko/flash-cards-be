
const { usersFetch, postUser } = require('../models/users.model');

module.exports.usersGet = async (req, res, next) => {
  try {
    const fetchedUsers = await usersFetch();
    await res.status(200).send(fetchedUsers);
  } catch {}
};

module.exports.usersPost = async (req, res, next) => {
    try {
        const testUser = req.body
       const postedUser =  await postUser(testUser)
        await res.status(201).send({user: postedUser})
    }catch {}
}