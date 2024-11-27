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

describe('GET /api/topics', () => {
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

describe('GET /api/articles/:article_id', () => {
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

describe('GET /api/articles', () => {
  test('GET:200 gets all articles with specified columns', () => {
    return request(app)
      .get('/api/articles/')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles.length).toBe(13);
        expect(body.articles).toBeSortedBy('created_at');
        body.articles.forEach((article) => {
          expect(typeof article.author).toBe('string');
          expect(typeof article.title).toBe('string');
          expect(typeof article.comment_count).toBe('string');
         });
      });
  });
})

describe('GET /api/articles/:article_id/comments', () => {
  test('GET:200 gets all comments with specified article id', () => {
    return request(app)
      .get('/api/articles/3/comments')
      .expect(200)
      .then(( { body } ) => {
        expect(body.length).toBe(2);

        body.forEach((comment) => {
          expect(typeof comment.comment_id).toBe('number');
          expect(typeof comment.votes).toBe('number');
          expect(typeof comment.author).toBe('string');
         });
      });
  });

  test('GET:404 not found when article id is not in the list', () => {
    return request(app)
      .get('/api/articles/999/comments')
      .expect(404).then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe('Not found'); 
      })
  });

  test('GET:400 bad request when article contains a string instead of id', () => {
    return request(app)
      .get('/api/articles/banana/comments')
      .expect(400).then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe('Bad request'); 
      })
  });
});

describe('POST /api/articles/:article_id/comments', () => {
  test('POST:201 adds a comment to the comments table where the user exists', () => {
    const newComment = {
      body: "Test Comment",
      author: "icellusedkars",
    };
    return request(app)
      .post('/api/articles/3/comments').send(newComment)
      .expect(201)
      .then((response) => {
        expect(response.body.result.body).toBe("Test Comment");
        expect(response.body.result.author).toBe("icellusedkars");
        expect(response.body.result.article_id).toBe(3);
      });
  });
  test('POST:404 adds a comment to the comments table when the user does not exist', () => {
    const newComment = {
      body: "Test Comment",
      author: "acullen97",
    };
    return request(app)
      .post('/api/articles/3/comments').send(newComment)
      .expect(404).then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe('Not found'); 
      })
  });
  test('POST:404 not found when article id does not exist', () => {
    const newComment = {
      body: "Test Comment",
      author: "icellusedkars",
    };
    return request(app)
      .post('/api/articles/999/comments').send(newComment)
      .expect(404).then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe('Not found'); 
      })
  });
});

describe('PATCH /api/articles/:article_id', () => {
  test('PATCH:201 updates the vote count of a specified article', () => {
    const newVote = {
      inc_votes: 2
    };
    return request(app)
      .patch('/api/articles/1').send(newVote)
      .expect(201)
      .then((response) => {
        expect(response.body.result.votes).toBe(102);
      });
  });

  test('PATCH:201 updates the vote count of a specified article with a negative decrement', () => {
    const newVote = {
      inc_votes: -102
    };
    return request(app)
      .patch('/api/articles/1').send(newVote)
      .expect(201)
      .then((response) => {
        expect(response.body.result.votes).toBe(-2);
      });
  });

  test('POST:404 not found when article id does not exist', () => {
    const newVote = {
      inc_votes: 2
    };
    return request(app)
      .patch('/api/articles/999').send(newVote)
      .expect(404).then(( response ) => {
        console.log(response.body, "response");
        const { msg } = response.body;
        expect(msg).toBe('Not found'); 
      })
  });

  test('POST:400 bad reqest when article id is not a number', () => {
    const newVote = {
      inc_votes: 2
    };
    return request(app)
      .patch('/api/articles/banana').send(newVote)
      .expect(400).then(( response ) => {
        console.log(response.body, "response");
        const { msg } = response.body;
        expect(msg).toBe('Bad request'); 
      })
  });
});




