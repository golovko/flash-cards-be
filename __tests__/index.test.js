const app = require("../app");
const db = require("../db/newConnect");
const request = require("supertest");
const {
  SeedMongo,
  seedTopicsScript,
  seedUsersScript,
} = require("../db/SeedMongo.js");

beforeAll(async () => {
  await db.connect();
  await SeedMongo(db);
  await db.connect();
  await seedUsersScript(db);
  await db.connect();
  await seedTopicsScript(db);
});
afterAll(async () => {
  await db.close();
});

describe("Endpoint tests", () => {
  test("GET /api/cards should return a list of cards from the test database", async () => {
    await request(app)
      .get("/api/cards")
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(10);
      });
  });

  it("POST /api/cards should add a card to the database", async () => {
    const newItem = {
      question: "How many hairs are there?",
      answer: "46",
      topic: "Biology",
    };

    await request(app)
      .post("/api/cards")
      .send(newItem)
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.body.acknowledged).toBe(true);
      });
  });

  it("POST /api/cards 400 responds with an appropriate status and error message when provided with a no card body", async () => {
    const newItem = {
      question: "",
      answer: "",
      topic: "Biology",
    };

    await request(app)
      .post("/api/cards")
      .send(newItem)
      .expect(400)
      .then((response) => {
        expect(response.body.message).toBe("Card fields cannot be empty");
      });
  });
});

describe("Users tests", () => {
  test("GET /api/users should return a list of users from the test database", async () => {
    await request(app)
      .get("/api/users")
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(10);
      });
  });
  test("POST /api/users should add a new user to the list of users", async () => {
    const testUser = {
      username: "NewUser",
      password: "password",
      email: "newuser@test.com",
    };
    await request(app)
      .post("/api/users")
      .send(testUser)
      .then((response) => {
        const postedUser = response.body;

        expect(response.status).toBe(201);
        expect(postedUser.user).toMatchObject({
          _id: expect.any(String),
          username: "NewUser",
          password: "password",
          email: "newuser@test.com",
        });
      });
  });
});

describe("Topics tests", () => {
  test("GET /api/topics", async () => {
    await request(app)
      .get("/api/topics")
      .then((response) => {
        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
      });
  });
});
