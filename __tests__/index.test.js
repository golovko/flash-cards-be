const app = require('../app');
const db = require('../db/newConnect');
const request = require('supertest');
const {
  SeedMongo,
  seedTopicsScript,
  seedUsersScript,
} = require('../db/SeedMongo.js');

beforeEach(async () => {
  await db.connect();
  await SeedMongo(db);
  await seedUsersScript(db);
  await seedTopicsScript(db);
});
afterAll(async () => {
  await db.close();
});

describe('cards endpoints tests', () => {
  test('GET /api/cards should return a list of cards from the test database', async () => {
    await request(app)
      .get('/api/cards')
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(10);
      });
  });
  test('GET /api/cards?topic=Math should return a list of cards from the test database', async () => {
    await request(app)
      .get('/api/cards?topic=Math')
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
      });
  });

  test('POST /api/cards should add a card to the database', async () => {
    const newItem = {
      question: 'How many hairs are there?',
      answer: '46',
      topic: 'Biology',
      author: 'BiologyExpert',
    };

    await request(app)
      .post('/api/cards')
      .send(newItem)
      .then((response) => {
        const postedCard = response.body;
        expect(response.statusCode).toBe(201);
        expect(postedCard.card).toMatchObject({
          _id: expect.any(String),
          question: 'How many hairs are there?',
          answer: '46',
          topic: 'Biology',
          author: 'BiologyExpert',
        });
      });
  });

  test('POST /api/cards 400 responds with an appropriate status and error message when provided with a no card body', async () => {
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
  test('should return 1 card by ID', async () => {
    let id;
    await request(app)
      .get('/api/cards')
      .then((response) => {
        id = response.body[0]._id;
      });
    await request(app)
      .get('/api/cards/' + id)
      .then((response) => {
        console.log('>>>', response.body);
        expect(response.body._id).toBe(id);
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
      });
  });
  test('POST /api/users should add a new user to the list of users', async () => {
    const testUser = {
      username: 'NewUser',
      password: 'password',
      email: 'newuser@test.com',
    };
    await request(app)
      .post('/api/users')
      .send(testUser)
      .then((response) => {
        const postedUser = response.body;

        expect(response.status).toBe(201);
        expect(postedUser.user).toMatchObject({
          _id: expect.any(String),
          username: 'NewUser',
          password: 'password',
          email: 'newuser@test.com',
        });
      });
  });
  test('Check if a user is available on POST', async () => {
    const testNonUniqueUser = {
      username: 'CellBiologist',
      password: 'password',
      email: 'CellBiologist@test.com',
    };
    await request(app)
      .post('/api/users')
      .send(testNonUniqueUser)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body.msg).toBe('Username is already taken!');
      });
  });
});

describe('/api/cards/:card_id', () => {
  it('DELETE: 200 deletes specific card and return no body', async () => {
    let card_id;
    await request(app)
      .get('/api/cards')
      .then((response) => {
        card_id = response.body[0]._id;
      });
    await request(app)
      .delete(`/api/cards/${card_id}`)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.deletedCount).toBe(1);
      });
  });
});
describe('Topics tests', () => {
  test('GET /api/topics', async () => {
    await request(app)
      .get('/api/topics')
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
        expect(Array.isArray(response.body)).toBe(true);
        response.body.forEach((topic) => {
          expect(topic).toHaveProperty('name');
          expect(topic).toHaveProperty('description');
        });
      });
  });
  test('POST /api/topics', async () => {
    const newTopic = {
      name: 'New',
      description: 'description',
    };
    await request(app)
      .post('/api/topics')
      .send(newTopic)
      .then((response) => {
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('acknowledged');
        expect(response.body).toHaveProperty('insertedId');
      });
  });
  test('GET /api/topics/username', async () => {
    await request(app)
      .get('/api/topics/BiologyExpert')
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
      });
  });

  test('DELETE /api/topics/:slug', async () => {
    const newTopic = {
      name: 'Test Topic',
      description: 'Test Description',
      slug: 'testSlug',
    };
    await request(app).post('/api/topics').send(newTopic);
    const slug = newTopic.slug;
    await request(app)
      .delete(`/api/topics/${slug}`)
      .then((response) => {
        expect(response.status).toBe(204);
      });
    await request(app)
      .get(`/api/topics`)
      .then((response) => {
        const deletedTopic = response.body.find(
          (topic) => topic.slug === 'slug'
        );
        expect(deletedTopic).toBeUndefined();
      });
  });

  test('PATCH /api/topics/:slug', async () => {
    const newTopic = {
      name: 'Test Topic',
      description: 'Test Description',
      slug: 'testSlug',
    };
    await request(app).post('/api/topics').send(newTopic);

    const updatedInfo = {
      name: 'testNameUpdated',
      description: 'testDescriptionUpdated',
    };

    await request(app)
      .patch(`/api/topics/${newTopic.slug}`)
      .send(updatedInfo)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.modifiedCount).toBe(1);
        expect(response.body.acknowledged).toBeTruthy();
      });

    await request(app)
      .get(`/api/topics`)
      .then((response) => {
        const updatedTopic = response.body.find(
          (topic) => topic.slug === 'testSlug'
        );
        expect(updatedTopic.name).toBe(updatedInfo.name);
        expect(updatedTopic.description).toBe(updatedInfo.description);
      });
  });
});

describe('Updated isCorrect answer on the card tests', () => {
  test('PATCH /api/cards/:card_id updates isCorrect property of the single card', async () => {
    const updateToSend = { isCorrect: true };
    let id;
    await request(app)
      .get('/api/cards')
      .then((response) => {
        id = response.body[0]._id;
      });
    await request(app)
      .patch(`/api/cards/${id}`)
      .send(updateToSend)
      .then((response) => {
        // console.log(response)
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Card updated successfully');
        expect(response.body.card.isCorrect).toBe(true);
      });
  });

  test('PATCH /api/cards/:card_id updates isCorrect property of the single card', async () => {
    const updateToSend = { topic: 'Neuroscience' };
    let id;
    await request(app)
      .get('/api/cards')
      .then((response) => {
        id = response.body[0]._id;
      });
    await request(app)
      .patch(`/api/cards/${id}`)
      .send(updateToSend)
      .then((response) => {
        // console.log(response)
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Card updated successfully');
        expect(response.body.card.topic).toBe('Neuroscience');
      });
  });
});

describe('reset isCorrect to false ', () => {
  test('PATCH /api/cards resets isCorrect property of all cards', async () => {
    const updateToSend = { isCorrect: false };
    await request(app)
      .patch(`/api/cards`)
      .send(updateToSend)
      .then((response) => {
        expect(response.status).toBe(204);
      });
  });

  test('PATCH /api/cards/:topic resets isCorrect property of all cards on the topic', async () => {
    const topic = 'Biology';
    const updateToSend = { isCorrect: false };

    await request(app)
      .patch(`/api/cards?${topic}`)
      .send(updateToSend)
      .then((response) => {
        expect(response.status).toBe(204);
      });
  });
});
