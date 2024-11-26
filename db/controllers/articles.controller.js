const {
    selectArticleById, selectArticles

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

exports.getArticles = (req, res, next) => {

        selectArticles().then((articles) => {
          console.log({articles});
          res.status(200).send({ articles });
        }).catch((err)=>{
            console.log(err);
            next(err);
          });
    
      };