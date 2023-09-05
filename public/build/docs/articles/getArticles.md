# Description

This will list all the current articles in the database.

# Request Queries

- topic: `String` - The user will be able to enter an existing topic and filter through all of the available topics that exist within the database.

- sort_by: `String` - The user will be able to sort the articles by any valid columns of: `author, title, article_id, topic, created_at, votes, comment_count`. Defaults to `created_at`.

- order: `String` - The user will be able to choose the order at which the articles are displayed: `DESC` for descending and `ASC` for ascending. Defaults to descending.

- limit: `Number` - The user will be able to limit the amount of articles displayed by providing a valid number. Defaults to 10.

- p: `Number` - The user will be able to navigate to a specified page. Defaults to 1.

# Example Response

```
{
    "articles": [
	                {
	            	    "article_id": 33,
                        "author": "weegembump",
                        "title": "Seafood substitutions are increasing",
                        "topic": "cooking",
                        "created_at": "2020-11-15T13:25:00.000Z",
                        "votes": 0,
                        "comment_count": 6,
                        "total_count": 12
	                },
	                {
	            	    "article_id": 12,
		                "title": "The battle for Node.js security has only begun",
		                "topic": "coding",
		                "author": "tickle122",
		                "body": "The founder of the Node Security Project says Node.js still has common vulnerabilities, but progress has been made to make it more secure. Appearing at the recent Node Community Convention in San Francisco, project founder Adam Baldwin, chief security officer at Web consulting company &yet, emphasized risks, protections, and progress. Baldwin sees four risks within the Node ecosystem pertinent to the enterprise: the code dependency tree, bugs, malicious actors, and people. I think of [the dependency tree] more as the dependency iceberg, to be honest, Baldwin said, where your code is the ship and your dependencies that you have with your packaged JSON is that little tiny iceberg at the top. But developers need to be aware of the massive iceberg underneath, he stressed.",
		                "created_at": "2020-11-15T13:25:00.000Z",
		                "votes": 0,
		                "comment_count": "7",
		                "total_count": 2
	                },
	                {
	            	    "article_id": 34,
		                "title": "The Notorious MSG’s Unlikely Formula For Success",
		                "topic": "cooking",
		                "author": "grumpy19",
		                "body": "The 'umami' craze has turned a much-maligned and misunderstood food additive into an object of obsession for the world’s most innovative chefs. But secret ingredient monosodium glutamate’s biggest secret may be that there was never anything wrong with it at all.",
		                "created_at": "2020-11-22T11:13:00.000Z",
		                "votes": 0,
	                	"comment_count": "11",
		                "total_count": 2
	                },
                    ...
              ]
}

```
