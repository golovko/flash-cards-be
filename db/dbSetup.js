const MongoClient = require('mongodb').MongoClient;
let uri;
const ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: `${__dirname}/../.env.${ENV}`,
});

if (!process.env.MONGO_URI || !process.env.MONGO_DB) {
  throw new Error('MONGO_URI or MONGO_DB not set');
}

uri = process.env.MONGO_URI;

async function dbSetup() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected correctly to server');
    const db = client.db(process.env.MONGO_DB);
    db.dropDatabase()
      .then((val) => {
        console.log(val);
      })
      .then(() => client.db(process.env.MONGO_DB))
      .finally(() => client.close());
  } catch {}
}

dbSetup();
