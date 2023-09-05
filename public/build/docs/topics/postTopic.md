# Description

This will create a new topic upon sucessful post request.

# Request Body

Accepts the following keys:

- slug: `String` required
- description: `String` required

The `slug` property refers to the topic name and the `description` refers to the description of the topic.

```
 {
    "slug": "Gardening",
    "description": "Gardening tools"
 }

```

# Example Response

```
{
    "topic": {
                 "slug": "Gardening",
                 "description": "Gardening tools"
            }

}

```
