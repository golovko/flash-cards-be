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
  test('GET /api/cards should return a list of cards from the test database',  async () => {
     await request(app)
      .get('/api/cards')
      .then((response) => {
        
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(10);
      });
  });
  
});


describe('Users tests', () => {
  test('GET /api/users should return a list of users from the test database', async () => {
    await request(app)
    .get('/api/users')
    .then((response) => {
      
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(10);
    })
  })
  test('POST /api/users should add a new user to the list of users', async() => {
    const testUser = { username: 'NewUser', password: 'password', email: 'newuser@test.com' }
    await request(app)
    .post('/api/users')
    .send(testUser)
    .then((response) => {
      const postedUser = response.body
      
      expect(response.status).toBe(201)
      expect(postedUser.user).toMatchObject({
        _id: expect.any(String),
        username: 'NewUser', 
        password: 'password', 
        email: 'newuser@test.com'
      })
    })
  })
})

