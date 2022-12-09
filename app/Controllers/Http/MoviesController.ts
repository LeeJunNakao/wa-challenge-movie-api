import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { mountService } from "App/Services/Movie";
import MovieService from "App/Services/Movie/movie-service";

export default class MoviesController {
  private service: MovieService;

  constructor() {
    const { service } = mountService();
    this.service = service;
  }

  public async index(ctx: HttpContextContract) {
    try {
      const page = ctx.request.input("page");

      const movies = await this.service.getPaginated(page);

      return movies;
    } catch (error) {
      ctx.response
        .status(400)
        .send({ message: "Failed to get movies, please try again later" });
    }
  }

  public async populate(ctx: HttpContextContract) {
    try {
      await this.service.populateMovies();

      ctx.response.status(201).send({ message: "Movies add successfully" });
    } catch (error) {
      ctx.response
        .status(400)
        .send({ message: "Failed to get movies, please try again later" });
    }
  }
}
