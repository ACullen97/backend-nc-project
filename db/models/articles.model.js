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
