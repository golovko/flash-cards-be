const app = require('../app');
const db = require('../db/newConnect');
const request = require('supertest');
const SeedMongo = require('../db/SeedMongo.js');

beforeAll(async () => {
  db.connect();
  await SeedMongo(db);
});
afterAll(async () => {
  await db.close();
});

describe('Endpoint tests', () => {
  it('GET /api/cards should return a list of cards from the test database', async () => {
    await request(app)
      .get('/api/cards')
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(10);
      });
  });
  it('GET /api/cards should return a list of cards from the test database', async () => {
    await request(app)
      .get('/api/cards')
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(9);
      });
  });
});
