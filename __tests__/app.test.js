const endpointsJson = require("../endpoints.json");
/* Set up your test imports here */

const app = require('../app');
const request = require('supertest');
const seed = require('../db/seeds/seed.js');


/* Set up your beforeEach & afterAll functions here */

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});