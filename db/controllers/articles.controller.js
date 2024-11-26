const {
    selectArticleById,

  } = require("../models/articles.model.js");

exports.getArticleById = (req, res, next) => {
    const  { id }  = req.params

 return selectArticleById(id).then((result) =>{
        res.status(200).send(result)
    }).catch((err)=>{
        console.log(err);
        next(err);
      });
    };

