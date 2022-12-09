import { test } from "@japa/runner";
import nock from "nock";
import MovieFactory from "Database/factories/MovieFactory";
import { describe, createMoviePayload } from "../utils";

describe("Movie Controller", () => {
  test("Get paginated movies", async ({ client, assert }) => {
    await MovieFactory.createMany(50);

    const response = await client.get("/movies").qs({ page: 1 });

    response.assertStatus(200);
    const body = response.body();

    const meta = body.meta;
    const movies = body.data;

    assert.properties(meta, ["total", "per_page", "current_page", "last_page"]);
    assert.isArray(movies);
    assert.properties(movies[0], [
      "id",
      "external_id",
      "title",
      "description",
      "director",
      "producer",
      "banner",
      "release_date",
      "score"
    ]);
    assert.equal(movies.length, 10);
  });

  test("Populate if database is no populated", async ({ client, assert }) => {
    const moviesPayload = createMoviePayload(30);

    nock(`${process.env.SEARCH_MOVIE_API_URL}`)
      .get("/films")
      .reply(200, (_, _requestBody) => {
        return moviesPayload;
      });

    const response = await client.post("/movies/populate");
    const body = response.body();

    response.assertStatus(201);
    assert.deepEqual(body, { message: "Movies add successfully" });
  });
});
