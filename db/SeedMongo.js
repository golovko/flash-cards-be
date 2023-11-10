const { biologyCards } = require('./data/cards-mock');
const db = require('./newConnect');


const { users } = require('./data/users-mock'); // Import the users data




async function SeedMongo(dbm) {
  try {
    const collection = dbm.getCollection('cards');
    let res = await collection.drop();
    // console.log('collection dropped' + res);
    const result = await collection.insertMany(biologyCards);
    // console.log(result.insertedIds);
  } catch (error) {}
}

async function seedScript() {
  await db.connect();
  await SeedMongo(db);
  await db.close();
}
seedScript();
seedUsersScript();

module.exports = SeedMongo;





































































async function SeedUsers(dbm) {
  try {
    const collection = dbm.getCollection('users');
    let res = await collection.drop();
    // console.log('users collection dropped' + res);
    const result = await collection.insertMany(users);
    // console.log(result.insertedIds);
  } catch (error) {
    // console.error('Error seeding users:', error);
  }
}

async function seedUsersScript() {
  await db.connect();
  await SeedUsers(db);
  await db.close();
}
