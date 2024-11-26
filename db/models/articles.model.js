const db = require('../connection.js');

exports.selectArticleById = (articleId) => {

    if(isNaN(articleId)){
        return Promise.reject({status: 400, msg: "Bad request"})
    }

    console.log(articleId, "<<<--articleId");

    let queryStr = `SELECT * FROM articles WHERE article_id = $1`; 
    let queryValue = [articleId];

   

    return db.query(queryStr, queryValue).then((response) => {
      

        if(response.rows.length === 0){
            return Promise.reject({status: 404, msg: "Not found"})
           }
           else{
             return response.rows[0];
           }
        
    });
  };
  