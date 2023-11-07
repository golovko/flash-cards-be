const app = require('../app');
const { client } = require('../db/connect');
const request = require('supertest');
//const seed = require('../db/seed');

beforeAll(async () => {
  // await seed();
});

afterAll(async () => {
  client.close();
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
      .get('/api/cards/')
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(10);
      });
  });
});
