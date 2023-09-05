# Description

This will create a new article upon sucessful post request.

# Request Body

Accepts the following keys:

- author: `String` required
- title: `String` required
- body: `String` required
- topic: `String` required

Where the `author` property refers to the username from the database.

```
 {
    "author": "grumpy19",
    "title": "TitleOfArticle",
    "body": "BodyOfArticle",
    "topic": "Topic"
 }

```

# Example Response

```
{
    "article": {
                "author": "grumpy19",
                "title": "TitleOfArticle",
                "body": "BodyOfArticle",
                "topic": "Topic",
                "article_id": 1,
                "created_at": "2020-07-09T20:11:00.000Z",
                "votes": 0,
                "comment_count": 0
            }

}

```
