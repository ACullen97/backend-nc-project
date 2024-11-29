const {
  selectArticleById,
  selectArticles,
  selectCommentById,
  addComment,
  updateArticle,
} = require("../models/articles.model.js");

exports.getArticleById = (req, res, next) => {
  const article_id = req.params.article_id;

  selectArticleById(article_id)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.getArticles = (req, res, next) => {

  const sort_by = req.query.sort_by;
  const order = req.query.order;
  selectArticles(sort_by, order)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.getArticleComments = (req, res, next) => {
  const article_id = req.params.article_id;

  selectCommentById(article_id)
    .then((result) => {
      console.log(result, "result");
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.postArticleComment = (req, res, next) => {
  const article_id = req.params.article_id;
  const comment = req.body;

  addComment(comment, article_id)
    .then((result) => {
      res.status(201).send({ result });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.patchArticle = (req, res, next) => {
  const article_id = req.params.article_id;
  const votes = req.body.inc_votes;
  updateArticle(votes, article_id)
    .then((result) => {
      res.status(201).send({ result });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
