const app = require("../app");
const mongoose = require("mongoose");
const request = require("supertest");
const Card = require("../models/Card");
const seed = require("../db/seed");

describe("Endpoint tests", () => {
  beforeAll(async () => {
    await seed();
  });

  // const SergiiCard = new Card({
  //   published: true,
  //   author: "Sergii",
  //   question: "Question 1",
  //   answer: "Answer 1",
  //   topic: "Topic 1",
  //   deck: ["Deck 1"],
  //   tags: ["Tag 1", "Tag 2"],
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  // });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("GET /api/cards should return a list of cards from the test database", () => {
    request(app)
      .get("/api/cards")
      .then((response) => {
        console.log(response, "res");
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(10);
      });
  });
});
