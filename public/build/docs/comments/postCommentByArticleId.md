# Description

This will create a new comment for the specified article upon sucessful post request.

# Request Body

Accepts the following keys:

- username: `String` required
- body: `String` required

```
 {
    "username": "grumpy19",
    "body": "new comment added"
 }

```

# Example Response

```
{
    "comment": {
                "comment_id": 302,
                "author": "grumpy19",
                "article_id": 2,
                "votes": 0,
                "created_at": "2020-10-13 14:07:00",
                "body": "new comment added"
                "comment_count": 0
            }

}

```
