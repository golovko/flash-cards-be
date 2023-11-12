const { ObjectId } = require('mongodb');
const db = require('../db/newConnect');


module.exports.usersFetch = async () => {
  try {
    await db.connect();
    const collection = db.getCollection('users');
    const fetchedUsers = await collection.find({}).toArray();
    return fetchedUsers;
  } catch (err) {
    
  } finally {
    db.close();
  }
};

module.exports.postUser = async (testUser, req, res, next) => {
    
    try {
        await db.connect();
        const collection = db.getCollection('users');
        const userExists = await collection.findOne({username: req.body.username});

        if (userExists) {
          return res.status(400).send({ msg: "Username is already taken!" });
        }

        
        
        const fetchPostedUser = await collection.insertOne(testUser)
        
        const objectId = new ObjectId(fetchPostedUser.insertedId)
        
        const responseData = await collection.findOne({_id:  objectId })
        
        const postedUser = {
          _id: responseData._id.toString(),
          username: responseData.username,
          email: responseData.email,
          password: responseData.password
        };
        
        //console.log(postedUser)
        
        
        
        return postedUser
    }catch (err){
        

    } finally {
        db.close()
    }

}