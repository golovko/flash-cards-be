const { describe, it, before, after } = require('node:test');
const assert = require('node:assert');
const request = require('supertest');
const app = require('../app');
const db = require('../db/newConnect');
const {
  SeedMongo,
  seedTopicsScript,
  seedUsersScript,
} = require('../db/SeedMongo.js');

describe('cards endpoints', () => {
  before(async () => {
    await db.connect();
    await SeedMongo(db);
    await seedUsersScript(db);
    await seedTopicsScript(db);
  });
  after(async () => {
    await db.close();
  });
  it('GET /api/cards should return a list of cards from the test database', async () => {
    await request(app)
      .get('/api/cards')
      .then((response) => {
        assert.equal(response.status, 200);
        assert.equal(response.body.length, 10);
      });
  });
  it('GET /api/cards?topic=Math should return a list of cards from the test database', async () => {
    await request(app)
      .get('/api/cards?topic=Math')
      .then((response) => {
        assert.equal(response.status, 200);
        assert.equal(response.body.length, 2);
      });
  });
  it('should return 1 card by ID', async () => {
    let id;
    await request(app)
      .get('/api/cards')
      .then((response) => {
        id = response.body[0]._id;
      });
    await request(app)
      .get('/api/cards/' + id)
      .then((response) => {
        assert.equal(response.body._id, id);
      });
  });
});
