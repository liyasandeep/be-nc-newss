# Description

This will update the comment's vote count by what the user passes if the patch request is successfull.

# Request Body

Accepts the following keys:

- inc_votes: `Number` required

```
 { "inc_votes": -1 }

```

# Example Response

```
{
    comment: {
                "comment_id": 302,
                "body": "new comment added",
                "votes": -1,
                "author": "grumpy19",
                "article_id": 2,
                "created_at": "2020-10-13 14:07:00"
             }
}


```
