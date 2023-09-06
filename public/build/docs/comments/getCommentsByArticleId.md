# Description

This will respond with all the comments for the specified article.

# Request Queries

- limit: `Number` - The user will be able to limit the amount of comments displayed by providing a valid number. Defaults to 10.

- p: `Number` - The user will be able to navigate to a specified page. Defaults to 1.

# Example Response

```
{
    "comments": [
                 {
                     "article_id": 5,
                     "comment_id": 144,
                     "votes": 19,
                     "created_at": "2020-11-23 17:00:00",
                     "author": "grumpy19",
                     "body": "Placeat voluptatum consequatur ducimus et eum molestiae impedit eveniet. Recusandae rerum voluptas quia mollitia quam velit iusto. Eum eos similique minima necessitatibus nemo. Iure deleniti omnis enim animi iste delectus et consequuntur."
                 },
                 {
                    "article_id": 5,
                    "comment_id": 116,
                    "votes": 3,
                    "created_at": "2020-09-03 02:06:00",
                    "author": "weegembump",
                    "body": "Praesentium dolor doloribus sint. Quisquam molestiae dolorum asperiores animi omnis."
                 }
                ]
}

```
