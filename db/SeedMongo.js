const { biologyCards } = require('./data/cards-mock');
const db = require('./newConnect');

async function SeedMongo(dbm) {
  try {
    const collection = dbm.getCollection('cards');
    let res = await collection.drop();
    console.log('collection dropped' + res);
    const result = await collection.insertMany(biologyCards);
    console.log(result.insertedIds);
  } catch (error) {}
}

async function seedScript() {
  await db.connect();
  await SeedMongo(db);
  await db.close();
}
seedScript();

module.exports = SeedMongo;
