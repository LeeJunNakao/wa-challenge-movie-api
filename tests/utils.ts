import { test, Group } from "@japa/runner";
import { faker } from "@faker-js/faker";
import { MoviesPayload } from "App/Services/Movie/movie-service";
import Database from "@ioc:Adonis/Lucid/Database";

type Tests = (group: Group) => void;

export const describe = (description: string, tests: Tests) =>
  test.group(description, (group) => {
    group.each.setup(async () => {
      await Database.beginGlobalTransaction();
      return () => Database.rollbackGlobalTransaction();
    });

    tests(group);
  });

export const createMoviePayload = (quantity: number) => {
  const arr = Array.from(new Array(quantity).keys());
  const movies = arr.map(
    (): MoviesPayload => ({
      id: faker.database.mongodbObjectId(),
      title: faker.name.fullName(),
      original_title: faker.name.fullName(),
      original_title_romanised: faker.name.fullName(),
      description: faker.lorem.text(),
      director: faker.name.fullName(),
      producer: faker.name.fullName(),
      movie_banner: faker.internet.domainName(),
      image: faker.internet.domainName(),
      running_time: String(faker.datatype.number({ min: 40, max: 120 })),
      release_date: String(faker.datatype.number({ min: 1960, max: 2020 })),
      rt_score: String(faker.datatype.number({ min: 70, max: 100 })),
    })
  );
  return movies;
};
