import { CreateMovieDto } from "App/Entities/Movie";
import Movie from "App/Models/Movie";
import axios from "axios";

const PAGE_LIMIT = 10;

type MoviesPayload = {
  id: string;
  title: string;
  original_title: string;
  original_title_romanised: string;
  image: string;
  movie_banner: string;
  description: string;
  director: string;
  producer: string;
  release_date: string;
  running_time: string;
  rt_score: string;
};

class MovieService {
  public async getPaginated(page: number) {
    const movies = await Movie.query().paginate(page, PAGE_LIMIT);

    return movies;
  }

  public async populateMovies() {
    const [count] = await Movie.query().count("* as total");

    const movies = await axios.get<MoviesPayload[]>(
      `${process.env.SEARCH_MOVIE_API_URL}/films?limit=100`
    );

    if (!count.$extras.total) {
      const externalMovies = await axios.get<MoviesPayload[]>(
        `${process.env.SEARCH_MOVIE_API_URL}/films`
      );

      const moviesDto: CreateMovieDto[] = externalMovies.data.map((m) => ({
        externalId: m.id,
        title: m.title,
        description: m.description,
        director: m.director,
        producer: m.producer,
        banner: m.movie_banner,
        releaseDate: Number(m.release_date),
        score: Number(m.rt_score),
      }));

      await Movie.createMany(moviesDto);
    }
  }
}

export default MovieService;
