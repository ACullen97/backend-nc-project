const { promises } = require("supertest/lib/test.js");
const db = require("../connection.js");

exports.selectUsers = () => {
  
    let queryStr = `SELECT * FROM users`;
  
    return db.query(queryStr).then((result) => {
      return result.rows;
    });
  };