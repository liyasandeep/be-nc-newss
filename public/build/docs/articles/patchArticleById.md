# Description

This will update the article's vote count by what the user passes if the patch request is successfull.

# Request Body

Accepts the following keys:

- inc_votes: `Number` required

```
 { "inc_votes": 1 }

```

# Example Response

```
{
    "article": {
                "article_id": 1,
                "author": "jessjelly",
                "title": "Running a Node App",
                "body": "This is part two of a series on how to get up and running with Systemd and Node.js.  This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
                "topic": "coding",
                "created_at": 1604728980000,
                "votes": 1,
                "comment_count": 8
            }

}

```
