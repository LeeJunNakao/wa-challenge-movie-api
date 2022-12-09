import Movie from "App/Models/Movie";
import Factory from "@ioc:Adonis/Lucid/Factory";

export default Factory.define(Movie, ({ faker }) => {
  return {
    externalId: faker.database.mongodbObjectId(),
    title: faker.name.fullName(),
    description: faker.lorem.text(),
    director: faker.name.fullName(),
    producer: faker.name.fullName(),
    banner: faker.internet.domainName(),
    releaseDate: faker.datatype.number({ min: 1960, max: 2020 }),
    score: faker.datatype.number({ min: 70, max: 100 }),
  };
}).build();
