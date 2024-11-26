const db = require('../connection.js');

function selectArticleById(articleId){

    return  fs.readFile(`${__dirname}/../data/owners/${articleId}.json`, "utf-8").then(
          (fileContents) => {
            return fileContents;
          }
        );
  }
  