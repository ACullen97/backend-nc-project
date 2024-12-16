const express = require("express");

const cors = require('cors');

const app = express();


const { getEndpoints } = require("./db/controllers/main.controller");

const { getTopics } = require("./db/controllers/topics.controller");

const {
  getArticleById,
  getArticles,
  getArticleComments,
  postArticleComment,
  patchArticle,
} = require("./db/controllers/articles.controller");

const { deleteComment } = require("./db/controllers/comments.controller");

const { getUsers } = require("./db/controllers/users.controller");

app.use(express.json());
app.use(cors());
//middleware functions
app.get("/api", getEndpoints);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles", getArticles);

app.get("/api/users", getUsers);

app.get("/api/articles/:article_id/comments", getArticleComments);

app.post("/api/articles/:article_id/comments", postArticleComment);

app.patch("/api/articles/:article_id", patchArticle);

app.delete("/api/comments/:comment_id", deleteComment);

//error handling

app.use((err, req, res, next) => {
  console.log(err, "error in middleware");

  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad request" });
  } else if (err.code === "23502") {
    res.status(400).send({ msg: "Bad request" });
  } else if (err.code == "42703") {
    res.status(404).send({ msg: "Not found" });
  } else if (err.code == "23503") {
    res.status(404).send({ msg: "Not found" });
  } else if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  }
});

module.exports = app;
