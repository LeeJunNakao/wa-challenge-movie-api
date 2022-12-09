import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import MovieService from "App/Services/Movie/MovieService";

export default class MoviesController {
  private service: MovieService;

  constructor() {
    this.service = new MovieService();
  }

  public async index(ctx: HttpContextContract) {
    const page = ctx.request.input("page");

    await this.service.populateMovies();
    const movies = await this.service.getPaginated(page);

    return movies;
  }
}
