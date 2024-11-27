const { promises } = require("supertest/lib/test.js");
const db = require("../connection.js");

exports.removeComment = (comment_id) => {
    console.log(comment_id);
    let queryStr = `DELETE FROM comments WHERE comment_id = $1 RETURNING *;`;
    let queryValue = [comment_id];
  
    return db.query(queryStr, queryValue)
    .then((response) => {
  
      console.log(response.rows[0], "response.rows");
    
      if (response.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      } else {
        
        return response.rows[0];
      }
    });
  };
  