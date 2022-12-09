import MovieModel from "App/Models/Movie";
import MovieService from "./movie-service";

export const mountService = () => {
  const service = new MovieService(MovieModel);

  return { service };
};
