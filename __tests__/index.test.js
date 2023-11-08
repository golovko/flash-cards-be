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

  it('POST /api/cards should add a card to the database', async () => {
    const newItem = {
      question: 'How many hairs are there?',
      answer: '46',
      topic: 'Biology',
    };

    await request(app)
      .post('/api/cards')
      .send(newItem)
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.body.acknowledged).toBe(true);
      });
  });

  it('POST /api/cards 400 responds with an appropriate status and error message when provided with a no card body', async () => {
    const newItem = {
      question: '',
      answer: '',
      topic: 'Biology',
    };

    await request(app)
      .post('/api/cards')
      .send(newItem)
      .expect(400)
      .then((response) => {
        expect(response.body.message).toBe('Card fields cannot be empty');
      });
  });
});
