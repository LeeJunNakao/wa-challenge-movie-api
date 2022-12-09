import { test } from "@japa/runner";
import sinon from "sinon";
import nock from "nock";
import MovieService from "App/Services/Movie/movie-service";
import { describe, createMoviePayload } from "../utils";
import MovieModel from "App/Models/Movie";
import { ModelQueryBuilderContract } from "@ioc:Adonis/Lucid/Orm";

describe("Movie Service - populate", () => {
  test("Get external data if database is not populated", async ({ assert }) => {
    const modeStub = sinon.stub(MovieModel, "createMany");
    const queryStub = MovieModel.query();

    const moviesPayload = createMoviePayload(30);

    nock(`${process.env.SEARCH_MOVIE_API_URL}`)
      .get("/films")
      .reply(200, (_, _requestBody) => {
        return moviesPayload;
      });

    sinon.stub(queryStub, "count").callsFake(
      () =>
        ({
          $extras: {
            total: 0,
          },
        } as unknown as ModelQueryBuilderContract<
          typeof MovieModel,
          MovieModel
        >)
    );

    const service = new MovieService(MovieModel);

    await service.populateMovies();

    const parsedMoviesPayload = moviesPayload.map((m) => ({
      externalId: m.id,
      title: m.title,
      description: m.description,
      director: m.director,
      producer: m.producer,
      banner: m.movie_banner,
      releaseDate: Number(m.release_date),
      score: Number(m.rt_score),
    }));

    assert.deepEqual(modeStub.getCall(0).args[0], parsedMoviesPayload);

    sinon.restore();
  });

  test("Does not get external data if database is already provided", async ({
    assert,
  }) => {
    const modelStub = sinon.stub(MovieModel, "createMany");
    const countStub = sinon.stub().callsFake(() => [
      {
        $extras: {
          total: 1000,
        },
      } as unknown as ModelQueryBuilderContract<typeof MovieModel, MovieModel>
    ]);

    sinon.stub(MovieModel, "query").callsFake(
      () =>
        ({
          count: countStub,
        } as unknown as ModelQueryBuilderContract<any, any>)
    );

    const moviesPayload = createMoviePayload(30);

    nock(`${process.env.SEARCH_MOVIE_API_URL}`)
      .get("/films")
      .reply(200, (_, _requestBody) => {
        return moviesPayload;
      });

    const service = new MovieService(MovieModel);

    await service.populateMovies();

    assert.deepEqual(modelStub.getCall(0), null);
    sinon.restore();
  });
});
