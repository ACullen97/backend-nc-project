const { promises } = require("supertest/lib/test.js");
const db = require("../connection.js");

exports.selectArticleById = (articleId) => {
  if (isNaN(articleId)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  let queryStr = `SELECT * FROM articles WHERE article_id = $1`;
  let queryValue = [articleId];

  return db.query(queryStr, queryValue).then((response) => {
    if (response.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Not found" });
    } else {
      return response.rows[0];
    }
  });
};

exports.selectArticles = () => {
  let queryStr = `SELECT articles.*, COALESCE(COUNT(comments.comment_id),0) AS comment_count FROM articles LEFT JOIN comments ON comments.author = articles.author GROUP BY articles.article_id ORDER BY created_at ASC`;
  return db.query(queryStr).then((result) => {
    return result.rows;
  });
};

exports.selectCommentById = (article_id) => {
  if (isNaN(article_id)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
  let queryStr = `SELECT comment_id, votes, created_at, author, body, article_id FROM comments WHERE article_id = ${article_id}`;
  return db.query(queryStr).then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Not found" });
    } else {
      return result.rows;
    }
  });
};

exports.addComment = ({ body, author }, article_id) => {
  if (isNaN(article_id)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  let queryStr = `SELECT * FROM users WHERE username = $1`;
  let queryValue = [author];

  return db
    .query(queryStr, queryValue)
    .then((response) => {
      if (response.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .then(() => {
      return db
        .query(
          "INSERT INTO comments (body, author, article_id) VALUES ($1, $2, $3) RETURNING *;",
          [body, author, article_id]
        )
        .then((result) => {
          return result.rows[0];
        });
    });
};

exports.updateArticle = (votes, article_id) => {
  let queryStr = `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;`;
  let queryValue = [votes, article_id];

  return db.query(queryStr, queryValue)
  .then((response) => {
  
    if (response.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Not found" });
    } else {
      return response.rows[0];
    }
  });
};
