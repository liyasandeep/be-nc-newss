const db = require("../db/connection");
const removeCommentByCommentId = (comment_id) => {
  let queryStr = ` DELETE FROM comments WHERE comment_id = $1;`;
  return db.query(queryStr, [comment_id]).then(({ rowCount }) => {
    console.log(rowCount, comment_id);
    if (rowCount === 0) {
      console.log("hai");
      return Promise.reject({ status: 404, message: "Id not found" });
    }
    return;
  });
};

module.exports = removeCommentByCommentId;
