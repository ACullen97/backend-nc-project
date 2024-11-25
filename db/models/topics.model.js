const db = require('../connection.js');

exports.selectTopics = () => {
  
  let queryStr = `SELECT description, slug FROM topics`;

  return db.query(queryStr).then((result) => {
    return result.rows;
  });
};