import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import MovieService from "App/Services/Movie/MovieService";

export default class MoviesController {
  private service: MovieService;

  constructor() {
    this.service = new MovieService();
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

  public async refresh() {
    try {
      await this.service.populateMovies();
    } catch (error) {}
  }
}
