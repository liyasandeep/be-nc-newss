# Northcoders News API Reference

Welcome to Northcoders News API Reference page! This API provides access to a database for a news aggregation site, which allows users to read articles related to different topics, comment on articles, post new articles, like or dislike comments and more.

Below are the list of all currently available endpoints on the [API](https://be-nc-newss.cyclic.app/api) which can be found on the `/api` endpoint of this site. Feel free to click on the links below or check the side navigation bar to access information about each endpoint with example responses, accepted request bodies and relevant queries(where applicable).

# Topics

- [GET /api/topics](../topics/getTopics.md) - List all the current topics in the database.
- [POST /api/topics](../topics/postTopic.md) - Adds a new topic to the database.

# Articles

- [GET /api/articles](../articles/getArticles.md) - List all the current articles in the database.
- [POST /api/articles](../articles/postArticles.md) - Adds a new article to the database.
- [GET /api/articles/:article_id](../articles/getArticleById.md) - Retrieves the article specified by the ID from the database.
- [PATCH /api/articles/:article_id](../articles/patchArticleById.md) - Update the Specified article's vote count.
- [DELETE /api/articles/:article_id](../articles/deleteArticleById.md) - Deletes the article specified by the ID from the database.

# Users

- [GET /api/users](../users/getUsers.md) - List all the current users in the database.
- [GET /api/users/:username](../users/getUserByUsername.md) - Retrieves the specific users information from the database.

# Comments

- [GET /api/articles/:article_id/comments](../comments/getCommentsByAticleId.md) - Retrieves all the comments for the specified article.
- [POST /api/articles/:article_id/comments](../comments/postCommentByArticleId.md) - Adds a new comment for the specified article.
- [PATCH /api/comments/:comment_id ](../comments/patchCommentByCommentId.md) - Update the Specified comment's vote count.
- [DELETE /api/comments/:comment_id](../comments/deleteCommentByCommentId.md) - Deletes the comment specified by the ID from the database.
