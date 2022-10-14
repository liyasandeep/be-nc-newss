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
        });
      });
  });

  test("200:articles are sorted by created_at in descending order by default", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles).toBeSortedBy("created_at", { descending: true });
      });
  });
  test("200:articles are filtered by the passed query 'topic'", () => {
    return request(app)
      .get("/api/articles?topic=mitch")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles).toHaveLength(11);
        articles.forEach((article) => {
          expect(article.topic).toBe("mitch");
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

describe("GET/api/users", () => {
  test("200:responds with an array of user objects each of which should have the following properties", () => {
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
});
