const {
    selectArticleById,

  } = require("../models/articles.model.js");

exports.getArticleById = (req, res, next) => {
    const article_id = req.params.article_id

 selectArticleById(article_id).then((result) =>{
        res.status(200).send(result)
    }).catch((err)=>{
        console.log(err);
        next(err);
      });
    };

