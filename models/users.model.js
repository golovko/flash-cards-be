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

module.exports.postUser = async (testUser) => {
    
    try {
        await db.connect();
        const collection = db.getCollection('users');
        
        const fetchPostedUser = await collection.insertOne(testUser)
        
        const objectId = new ObjectId(fetchPostedUser.insertedId)
        
        const postedUser = await collection.findOne({_id: objectId})
        
        
        return postedUser
    }catch (err){
        

    } finally {
        db.close()
    }

}