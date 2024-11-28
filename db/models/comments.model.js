const { promises } = require("supertest/lib/test.js");
const db = require("../connection.js");

exports.removeComment = (comment_id) => {
  return db
    .query("SELECT * FROM comments WHERE comment_id = $1;", [comment_id])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      } else if (isNaN(comment_id)) {
        return Promise.reject({ status: 400, msg: "Bad request" });
      } else {
        return db.query("DELETE FROM comments WHERE comment_id = $1;", [
          comment_id,
        ]);
      }
    });
};
