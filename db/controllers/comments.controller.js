const {
  removeComment
  } = require("../models/comments.model.js");

  exports.deleteComment = (req, res, next) => {
    const comment_id = req.params.comment_id;
    removeComment(comment_id)
      .then(() => {
        res.status(204).send();
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  };
  