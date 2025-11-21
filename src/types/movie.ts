export interface Movie {
  id: number;
  title: string;
  original_title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  video: boolean;
  original_language: string;
  genre_ids: number[];
}

export interface MoviesData {
  data: {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  };
}

export interface GenreData {
  data: {
    genres: {
      id: number;
      name: string;
    }[];
  };
}
