import { useState, useEffect } from "react";
import Nav from "../../components/Nav";
import { useParams } from "react-router-dom";
import axios from "axios";
import { GenreData, MoviesData } from "../../types/movie";
import MovieCard from "../../components/ui/MovieCard";
import { Search as SearchIcon } from "lucide-react";

const Search = () => {
  const { title } = useParams();
  const [moviesData, setMoviesData] = useState<MoviesData>();
  const [genreData, setGenreData] = useState<GenreData>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      setIsLoading(true);
      try {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&query=${title}&page=1&include_adult=false`;
        const movies = await axios.get<MoviesData>(url);

        const genre = await axios.get<GenreData>(
          "https://api.themoviedb.org/3/genre/movie/list?language=en",
          {
            params: {
              api_key: import.meta.env.VITE_TMDB_API_KEY,
            },
          }
        );

        setMoviesData(movies.data);
        setGenreData(genre.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (title) getMovies();
  }, [title]);

  const getGenreName = (id: number) => {
    return genreData?.genres.find((g) => g.id === id)?.name;
  };

  return (
    <main className="min-h-screen bg-background text-white font-sans selection:bg-primary/30">
      <Nav />

      <div className="container mx-auto px-6 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <SearchIcon className="h-8 w-8 text-primary" />
            Search Results for <span className="text-primary">"{title}"</span>
          </h1>
          <p className="text-gray-400 mt-2">
            Found {moviesData?.total_results || 0} movies
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="h-[400px] w-full animate-pulse rounded-xl bg-white/5"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {moviesData?.results.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                <div className="rounded-full bg-white/5 p-6 mb-4">
                  <SearchIcon className="h-12 w-12 text-gray-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">No results found</h3>
                <p className="text-gray-400">
                  Try adjusting your search terms or browse trending movies.
                </p>
              </div>
            ) : (
              moviesData?.results.map((movie, index) => (
                <div
                  key={movie.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <MovieCard
                    id={movie.id}
                    title={movie.title}
                    posterPath={movie.poster_path}
                    rating={movie.vote_average}
                    year={movie.release_date?.split("-")[0] || "N/A"}
                    genre={getGenreName(movie.genre_ids[0])}
                  />
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Search;
