const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const db = require("../db/connection");
const app = require("../app.js");
const request = require("supertest");

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(testData);
});

describe("GET/api", () => {
  test("200:responds with a json representation of all the available endpoints of the api", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        const { endpoints } = body;
        expect(endpoints).toBeInstanceOf(Object);
      });
  });
});

describe("TOPIC TESTS", () => {
  describe("GET/api/topics", () => {
    test("200 and responds with an array of topic objects each of which should have the following properties slug and description", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          const { topics } = body;
          expect(topics).toBeInstanceOf(Array);
          expect(topics).toHaveLength(3);
          topics.forEach((topic) => {
            expect(topic).toEqual(
              expect.objectContaining({
                slug: expect.any(String),
                description: expect.any(String),
              })
            );
          });
        });
    });
  });

  describe("POST/api/topics", () => {
    test("201:responds with the newly added topic object", () => {
      return request(app)
        .post("/api/topics")
        .send({
          slug: "coding",
          description: "Learning MERN Stack",
        })
        .expect(201)

        .then(({ body }) => {
          const { topic } = body;
          expect(topic).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
          expect(topic.slug).toBe("coding");
          expect(topic.description).toBe("Learning MERN Stack");
        });
    });
    test("400:responds with error when required fields(keys) are missing", () => {
      return request(app)
        .post("/api/topics")
        .expect(400)
        .send({
          description: "Learning MERN Stack",
        })
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe("Invalid Input");
        });
    });
    test("400:responds with error when required field data is empty", () => {
      return request(app)
        .post("/api/topics")
        .expect(400)
        .send({
          slug: "",
          description: "new comment added",
        })
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe("Invalid Input");
        });
    });

    test("400:responds with error when extra keys are passed in request body", () => {
      return request(app)
        .post("/api/topics")
        .send({
          slug: "coding",
          description: "new comment added",
          author: "rogersop",
        })
        .expect(400)
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe("Invalid Input");
        });
    });
  });
});

describe("ARTICLE TESTS", () => {
  describe("GET/api/articles", () => {
    test("200:responds with an array of articles object", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          expect(articles).toBeInstanceOf(Array);
          articles.forEach((article) => {
            expect(article).toEqual(
              expect.objectContaining({
                article_id: expect.any(Number),
                title: expect.any(String),
                topic: expect.any(String),
                author: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                comment_count: expect.any(Number),
              })
            );
            expect(article.created_at).toBeDateString();
          });
        });
    });

    test("200:articles are sorted by created_at(date) in descending order and limit to 10 results by default", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          expect(articles).toBeSortedBy("created_at", { descending: true });
          expect(articles).toHaveLength(10);
        });
    });
    test("200:articles are filtered by the passed query 'topic'", () => {
      return request(app)
        .get("/api/articles?topic=mitch")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          expect(articles).toHaveLength(10);
          articles.forEach((article) => {
            expect(article.topic).toBe("mitch");
          });
        });
    });

    test("200:articles are sort by the value of query sort_by", () => {
      return request(app)
        .get("/api/articles?sort_by=author")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          expect(articles).toBeSortedBy("author", { descending: true });
        });
    });

    test("200:articles are orderd by the value of query order ", () => {
      return request(app)
        .get("/api/articles?order=asc")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          expect(articles).toBeSortedBy("created_at", { ascending: true });
        });
    });

    test("200:articles are limited by the value of query limit ", () => {
      return request(app)
        .get("/api/articles?limit=12")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          expect(articles).toHaveLength(12);
        });
    });

    test("200:articles are displayed correctly using the page(p) query which specifies the range of enteries to be displayed ", () => {
      return request(app)
        .get("/api/articles?p=2&sort_by=author")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          expect(articles).toBeInstanceOf(Array);
          expect(articles).toHaveLength(2);
          expect(articles[0].author).toBe("butter_bridge");
        });
    });
    test("200:articles are retrieved correctly when all the three queries are given", () => {
      return request(app)
        .get("/api/articles?order=asc&sort_by=author&topic=mitch")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          expect(articles).toBeSortedBy("author", { ascending: true });
          articles.forEach((article) => {
            expect(article.topic).toBe("mitch");
          });
        });
    });

    test("200: articles are retrieved correctly when both page and limit query are given", () => {
      return request(app)
        .get("/api/articles?limit=4&p=3")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          expect(articles).toBeInstanceOf(Array);
          expect(articles).toHaveLength(4);
        });
    });

    test("200: responds with an article object with total_count property which displays the total number of articles with any filters applied, discounting the limit", () => {
      return request(app)
        .get("/api/articles?limit=4&p=2&topic=mitch")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          expect(articles).toBeInstanceOf(Array);
          expect(articles).toHaveLength(4);
          articles.forEach((article) => {
            expect(article.total_count).toBe(11);
          });
        });
    });

    test("404:responds with error when passed a topic of valid type but not present in database", () => {
      return request(app)
        .get("/api/articles?topic=abc")
        .expect(404)
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe("Topic not found");
        });
    });
    test("200:responds with an empty array when passed a topic present in database but has no associated article", () => {
      return request(app)
        .get("/api/articles?topic=paper")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          expect(articles).toHaveLength(0);
        });
    });

    test("400:responds with error when sort_by has invalid value", () => {
      return request(app)
        .get("/api/articles?sort_by=not-a-column")
        .expect(400)
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe("Invalid column");
        });
    });

    test("400:responds with error when order has invalid value", () => {
      return request(app)
        .get("/api/articles?order=not-an-order")
        .expect(400)
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe("Invalid order");
        });
    });

    test("400: responds with error when limit query has invalid value(not a valid number)", () => {
      return request(app)
        .get("/api/articles?limit=not-a-number")
        .expect(400)
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe("invalid limit query");
        });
    });

    test("400: responds with error when page query(p) has invalid value(not a valid number)", () => {
      return request(app)
        .get("/api/articles?p=not-a-number")
        .expect(400)
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe("invalid page query");
        });
    });
  });

  describe("GET/api/articles/:article_id", () => {
    test("200:responds with an article object with the specified article id ", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          const { article } = body;
          expect(article).toBeInstanceOf(Object);
          expect(article).toEqual(
            expect.objectContaining({
              article_id: expect.any(Number),
              title: expect.any(String),
              topic: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              comment_count: expect.any(Number),
            })
          );
          expect(article).toEqual({
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: 100,
            comment_count: 11,
          });
        });
    });

    test("400:responds with error when passed with an id of incorrect type", () => {
      return request(app)
        .get("/api/articles/not-an-id")
        .expect(400)
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe("Invalid type");
        });
    });

    test("404:responds with error when passed an id not present in database", () => {
      return request(app)
        .get("/api/articles/99999")
        .expect(404)
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe("Article Id does not exist");
        });
    });
  });

  describe("GET/api/articles/:article_id/comments", () => {
    test("200:responds with an array of 10 comments for the given article_id by default", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body }) => {
          const { comments } = body;
          expect(comments).toBeInstanceOf(Array);
          expect(comments).toHaveLength(10);

          comments.forEach((comment) => {
            expect(comment).toEqual(
              expect.objectContaining({
                comment_id: expect.any(Number),
                votes: expect.any(Number),
                created_at: expect.any(String),
                author: expect.any(String),
                body: expect.any(String),
              })
            );
          });
        });
    });
    test("200:comments are sorted by created_at in descending order by default", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body }) => {
          const { comments } = body;
          expect(comments).toBeSortedBy("created_at", { descending: true });
        });
    });

    test("200:comments are limited by the limit query", () => {
      return request(app)
        .get("/api/articles/1/comments?limit=5")
        .expect(200)
        .then(({ body }) => {
          const { comments } = body;
          expect(comments).toBeInstanceOf(Array);
          expect(comments).toHaveLength(5);
        });
    });

    test("200:commets are displayed correctly using the page(p) query which specifies the range of enteries to be displayed ", () => {
      return request(app)
        .get("/api/articles/1/comments?p=2")
        .expect(200)
        .then(({ body }) => {
          const { comments } = body;

          expect(comments).toBeInstanceOf(Array);
          expect(comments).toHaveLength(1);
        });
    });

    test("200: comments are retrieved correctly when both page and limit query are given", () => {
      return request(app)
        .get("/api/articles/1/comments?p=3&limit=4")
        .expect(200)
        .then(({ body }) => {
          const { comments } = body;
          expect(comments).toBeInstanceOf(Array);
          expect(comments).toHaveLength(3);
        });
    });

    test("400: responds with error when limit query has invalid value(not a valid number)", () => {
      return request(app)
        .get("/api/articles/1/comments?limit=not-a-number")
        .expect(400)
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe("invalid limit query");
        });
    });

    test("400: responds with error when page query(p) has invalid value(not a valid number)", () => {
      return request(app)
        .get("/api/articles/1/comments?p=not-a-number")
        .expect(400)
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe("invalid page query");
        });
    });
    test("400:responds with error when article_id is invalid", () => {
      return request(app)
        .get("/api/articles/not-an-id/comments")
        .expect(400)
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe("Invalid type");
        });
    });
    test("404:responds with error when article_id doesnot exit in database", () => {
      return request(app)
        .get("/api/articles/99999/comments")
        .expect(404)
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe("Article Id does not exist");
        });
    });

    test("200:responds with an empty array when article_id exists but has no associated comments with it", () => {
      return request(app)
        .get("/api/articles/2/comments")
        .expect(200)
        .then(({ body }) => {
          const { comments } = body;
          expect(comments).toEqual([]);
        });
    });
  });

  describe("PATCH/api/articles/:article_id", () => {
    test("200:responds with the updated aricle,with the vote property being updated", () => {
      return request(app)
        .patch("/api/articles/3")
        .expect(200)
        .send({ inc_votes: 1 })
        .then(({ body }) => {
          const { article } = body;
          expect(article).toBeInstanceOf(Object);
          expect(article).toEqual(
            expect.objectContaining({
              article_id: expect.any(Number),
              title: expect.any(String),
              topic: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
            })
          );

          expect(article.article_id).toBe(3);
          expect(article.votes).toBe(1);
        });
    });

    test("400:responds with error when passed with an id of incorrect type", () => {
      return request(app)
        .patch("/api/articles/not-an-id")
        .expect(400)
        .send({ inc_votes: 1 })
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe("Invalid type");
        });
    });

    test("404:responds with error when passed an id not present in database", () => {
      return request(app)
        .patch("/api/articles/99999")
        .expect(404)
        .send({ inc_votes: 1 })
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe("Article Id does not exist");
        });
    });
    test("400:responds with error when passed object has invalid value type  like {inc_votes : 'abc'}", () => {
      return request(app)
        .patch("/api/articles/3")
        .expect(400)
        .send({ inc_votes: "abc" })
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe("Invalid type");
        });
    });

    test("400:responds with error when passed object has invalid key like '{inc_vote : 4}'", () => {
      return request(app)
        .patch("/api/articles/3")
        .expect(400)
        .send({ inc_vote: 4 })
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe("Invalid key");
        });
    });
  });

  describe("POST/api/articles/:article_id/comments", () => {
    test("201:adds a comment to the article specified by article id and responds with the added comment", () => {
      return request(app)
        .post("/api/articles/2/comments")
        .expect(201)
        .send({ username: "rogersop", body: "new comment added" })
        .then(({ body }) => {
          const { comment } = body;
          expect(comment).toEqual(
            expect.objectContaining({
              comment_id: expect.any(Number),
              body: expect.any(String),
              article_id: expect.any(Number),
              author: expect.any(String),
              votes: expect.any(Number),
              created_at: expect.any(String),
            })
          );
          expect(comment.article_id).toBe(2);
          expect(comment.author).toBe("rogersop");
          expect(comment.body).toBe("new comment added");
        });
    });
    test("400:responds with error when article id is invalid", () => {
      return request(app)
        .post("/api/articles/not-an-id/comments")
        .expect(400)
        .send({ username: "rogersop", body: "new comment added" })
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe("Invalid type");
        });
    });
    test("404:responds with error when passed an id not present in database", () => {
      return request(app)
        .post("/api/articles/99999/comments")
        .expect(404)
        .send({ username: "rogersop", body: "new comment added" })
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe("Article Id does not exist");
        });
    });

    test("404:responds with error when passed username not in database", () => {
      return request(app)
        .post("/api/articles/2/comments")
        .expect(404)
        .send({ username: "not-a-username-in-db", body: "new comment added" })
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe("Username not found");
        });
    });
    test("400:responds with error when required fields are missing(body)", () => {
      return request(app)
        .post("/api/articles/2/comments")
        .expect(400)
        .send({ username: "rogersop" })
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe("Missing body");
        });
    });
    test("400:responds with error when required fields are missing(username)", () => {
      return request(app)
        .post("/api/articles/2/comments")
        .expect(400)
        .send({ body: "new comment added" })
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe("Missing username");
        });
    });

    //empty body gets handled with missing username case

    test("400:responds with error when extra keys are passed in request body", () => {
      return request(app)
        .post("/api/articles/2/comments")
        .send({
          username: "rogersop",
          body: "This is the body content",
          topic: "cats",
          votes: 100,
        })
        .expect(400)
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe("Invalid Input");
        });
    });
  });

  describe("POST/api/articles", () => {
    test("201:responds with the newly added article", () => {
      return request(app)
        .post("/api/articles")
        .send({
          author: "rogersop",
          title: "new article added",
          body: "Its nice",
          topic: "cats",
        })
        .expect(201)

        .then(({ body }) => {
          const { article } = body;
          expect(article).toEqual(
            expect.objectContaining({
              article_id: expect.any(Number),
              body: expect.any(String),
              topic: expect.any(String),
              author: expect.any(String),
              votes: expect.any(Number),
              created_at: expect.any(String),
              title: expect.any(String),
              comment_count: expect.any(Number),
            })
          );
          expect(article.title).toBe("new article added");
          expect(article.topic).toBe("cats");
          expect(article.author).toBe("rogersop");
          expect(article.body).toBe("Its nice");
        });
    });

    test("404:responds with error when passed username not in database", () => {
      return request(app)
        .post("/api/articles")
        .expect(404)
        .send({
          author: "not-a-username-in-db",
          title: "new article added",
          body: "Its nice",
          topic: "cats",
        })
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe("Username not found");
        });
    });

    test("404:responds with error when passed topic not in database ", () => {
      return request(app)
        .post("/api/articles")
        .send({
          author: "rogersop",
          title: "new article added",
          body: "Its nice",
          topic: "NotATopic",
        })
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("Topic not found");
        });
    });
    test("400:responds with error when required fields(keys) are missing", () => {
      return request(app)
        .post("/api/articles")
        .expect(400)
        .send({
          author: "rogersop",
          title: "new article added",
          topic: "cats",
        })
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe("Invalid Input");
        });
    });
    test("400:responds with error when required field data is empty", () => {
      return request(app)
        .post("/api/articles")
        .expect(400)
        .send({
          title: "new article added",
          topic: "cats",
          author: "",
          body: "It's nice",
        })
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe("Invalid Input");
        });
    });

    test("400:responds with error when extra keys are passed in request body", () => {
      return request(app)
        .post("/api/articles")
        .send({
          author: "rogersop",
          title: "Title here",
          body: "This is the body content",
          topic: "cats",
          votes: 100,
        })
        .expect(400)
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe("Invalid Input");
        });
    });
  });

  describe("DELETE/api/articles/:article_id", () => {
    test("204:deletes an article by article_id", () => {
      return request(app).delete("/api/articles/1").expect(204);
    });
    test("400:responds with error when article id is inavlid", () => {
      return request(app)
        .delete("/api/articles/not-an-id")
        .expect(400)
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe("Invalid type");
        });
    });

    test("404:responds with error when article id is not in database", () => {
      return request(app)
        .delete("/api/articles/99999")
        .expect(404)
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe("Article Id not found");
        });
    });
  });
});

describe("USER TESTS", () => {
  describe("GET/api/users", () => {
    test("200:responds with an array of user objects each of which should have 'username','name' and 'avatar_url'", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          const { users } = body;
          expect(users).toBeInstanceOf(Array);
          expect(users).toHaveLength(4);
          users.forEach((user) => {
            expect(user).toEqual(
              expect.objectContaining({
                username: expect.any(String),
                name: expect.any(String),
                avatar_url: expect.any(String),
              })
            );
          });
        });
    });
  });

  describe("GET/api/users/:username", () => {
    test("200:responds with an user object with the specified username ", () => {
      return request(app)
        .get("/api/users/rogersop")
        .expect(200)
        .then(({ body }) => {
          const { user } = body;
          expect(user).toBeInstanceOf(Object);
          expect(user).toEqual(
            expect.objectContaining({
              username: expect.any(String),
              name: expect.any(String),
              avatar_url: expect.any(String),
            })
          );
          expect(user).toEqual({
            username: "rogersop",
            name: "paul",
            avatar_url:
              "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
          });
        });
    });

    test("404:responds with error when passed an id not present in database", () => {
      return request(app)
        .get("/api/users/grumpy19")
        .expect(404)
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe("Username not found");
        });
    });
  });
});

describe("COMMENT TESTS", () => {
  describe("DELETE/api/comments/:comment_id", () => {
    test("204:deletes a comment by comment_id", () => {
      return request(app).delete("/api/comments/3").expect(204);
    });
    test("400:responds with error when comment id is inavlid", () => {
      return request(app)
        .delete("/api/comments/not-an-id")
        .expect(400)
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe("Invalid type");
        });
    });

    test("404:responds with error when comment id is not in database", () => {
      return request(app)
        .delete("/api/comments/99999")
        .expect(404)
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe("Id not found");
        });
    });
  });

  describe("PATCH/api/comments/:comment_id", () => {
    test("200:Responds with the updated comment, with the vote property being updated", () => {
      return request(app)
        .patch("/api/comments/2")
        .expect(200)
        .send({ inc_votes: 1 })
        .then(({ body }) => {
          const { comment } = body;
          expect(comment).toBeInstanceOf(Object);
          expect(comment).toEqual(
            expect.objectContaining({
              comment_id: expect.any(Number),
              body: expect.any(String),
              votes: expect.any(Number),
              author: expect.any(String),
              article_id: expect.any(Number),
              created_at: expect.any(String),
            })
          );

          expect(comment.comment_id).toBe(2);
          expect(comment.votes).toBe(15);
        });
    });
    test("400:responds with error when comment id is inavlid", () => {
      return request(app)
        .patch("/api/comments/not-an-id")
        .expect(400)
        .send({ inc_votes: 1 })
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe("Invalid type");
        });
    });

    test("404:responds with error when comment id is not in database", () => {
      return request(app)
        .patch("/api/comments/99999")
        .expect(404)
        .send({ inc_votes: 1 })
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe("Comment Id does not exist");
        });
    });

    test("400:responds with error when passed object has invalid value type  like {inc_votes : 'abc'}", () => {
      return request(app)
        .patch("/api/comments/2")
        .expect(400)
        .send({ inc_votes: "abc" })
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe("Invalid type");
        });
    });

    test("400:responds with error when passed object has invalid key like '{inc_vote : 4}'", () => {
      return request(app)
        .patch("/api/comments/2")
        .expect(400)
        .send({ inc_vote: 4 })
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe("Invalid key");
        });
    });
  });
});

describe("404:Invalid Route Endpoint", () => {
  test("404:responds with error when passed a route that doesnot exist", () => {
    return request(app)
      .get("/api/not-a-route")
      .expect(404)
      .then(({ body }) => {
        const { message } = body;
        expect(message).toBe("Invalid Route!");
      });
  });

  test("PATCH 404:responds with error when passed a route that doesnot exist", () => {
    return request(app)
      .patch("/api/not-a-route/2")
      .expect(404)
      .send({ inc_votes: 2 })
      .then(({ body }) => {
        const { message } = body;
        expect(message).toBe("Invalid Route!");
      });
  });

  test("POST 404:responds with error when passed a route that doesnot exist", () => {
    return request(app)
      .post("/api/not-a-route/2/comments")
      .expect(404)
      .send({ username: "rogersop", body: "new comment added" })
      .then(({ body }) => {
        const { message } = body;
        expect(message).toBe("Invalid Route!");
      });
  });
});
