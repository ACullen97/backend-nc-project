const endpointsJson = require("../endpoints.json");
/* Set up your test imports here */

const app = require('../app');
const request = require('supertest');
const seed = require('../db/seeds/seed.js');
const db = require('../db/connection.js');
const {topicData, articleData, commentData, userData} = require("../db/data/test-data/index");



/* Set up your beforeEach & afterAll functions here */
beforeEach(() => seed({topicData, articleData, commentData, userData}));
afterAll(() => db.end());


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

describe('/api/topics', () => {
  test('GET:200 sends an array of topics to the client', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then(({ body }) => {
        expect(body.topics.length).toBe(3);
    
         body.topics.forEach((topic) => {
         expect(typeof topic.description).toBe('string');
         expect(typeof topic.slug).toBe('string');
          
        });
      });
  })
});

describe('/api/articles/:article_id', () => {
  test('GET:200 gets a single article by article_id when the ID exists', () => {
    return request(app)
      .get('/api/articles/2')
      .expect(200)
      .then(({ body }) => {
        expect(body.article_id).toBe(2);
      });
  });

  test('GET:404 not found when article id is not in the list', () => {
    return request(app)
      .get('/api/articles/999')
      .expect(404).then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe('Not found'); 
      })
  });

  test('GET:400 bad request when article contains a string instead of id', () => {
    return request(app)
      .get('/api/articles/banana')
      .expect(400).then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe('Bad request'); 
      })
  });
});

