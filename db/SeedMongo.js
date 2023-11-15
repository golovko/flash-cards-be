const db = require('./newConnect');
const { biologyCards } = require('./data/cards-mock');
const { topicsMock } = require('../db/data/topics-mock');
const { users } = require('./data/users-mock');
const { getObjectId } = require('./helper');

async function SeedMongo(dbm) {
  try {
    const collection = dbm.getCollection('cards');
    let res = await collection.drop();
    const result = await collection.insertMany(biologyCards);
    // console.log(result.insertedIds);
  } catch (error) {
    // console.log(error);
  }
}

async function seedScript() {
  await db.connect();
  await SeedMongo(db);
  await db.close();
}
seedScript();

async function SeedUsers(dbm) {
  try {
    const collection = dbm.getCollection('users');
    let res = await collection.drop();

    const result = await collection.insertMany(users);
    // console.log(result.insertedIds);
  } catch (error) {
    console.error('Error seeding users: ', error);
  }
}

async function seedUsersScript() {
  await db.connect();
  await SeedUsers(db);
  await db.close();
}

async function SeedTopics(dbm) {
  try {
    const collection = dbm.getCollection('topics');
    let res = await collection.drop();

    const result = await collection.insertMany(topicsMock);
  } catch (error) {
    console.error('Error seeding topics: ', error);
  }
}

async function seedTopicsScript() {
  await db.connect();
  await SeedTopics(db);
  await db.close();
}

// async function seedCollection(dbm, collectionName, data) {
//   try {
//     const collection = dbm.getCollection(collectionName);
//     let res = await collection.drop();
//     console.log("hello");
//     const result = await collection.insertMany(data);
//     console.log(result.insertedIds);
//   } catch (error) {
//     console.error(`Error seeding ${collectionName}:`, error);
//   }
// }

// async function seedUsersScript() {
//   await db.connect();
//   await seedCollection(db, "users", users);
//   await db.close();
// }

// async function seedTopicsScript() {
//   await db.connect();
//   await seedCollection(db, "topics", topicsMock);
//   await db.close();
// }

seedUsersScript();
seedTopicsScript();

module.exports = { SeedMongo, seedUsersScript, seedTopicsScript };
