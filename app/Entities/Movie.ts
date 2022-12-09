export type Movie = {
  id: number;
  externalId: string;
  title: string;
  description: string;
  director: string;
  producer: string;
  banner: string;
  releaseDate: number;
  score: number;
};
export type CreateMovieDto = Omit<Movie, "id">;
