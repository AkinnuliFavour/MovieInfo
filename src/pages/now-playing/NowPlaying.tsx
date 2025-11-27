import { useEffect, useState } from "react";
import axios from "axios";
import { PlayCircle } from "lucide-react";
import Nav from "../../components/Nav";
import MovieCard from "../../components/ui/MovieCard";
import Pagination from "../../components/Pagination";
import { MoviesData, GenreData } from "../../types/movie";

const NowPlaying = () => {
  const [moviesData, setMoviesData] = useState<MoviesData>();
  const [genreData, setGenreData] = useState<GenreData>();
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      setIsLoading(true);
      try {
        const [moviesRes, genreRes] = await Promise.all([
          axios.get(
            `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`,
            {
              params: { api_key: import.meta.env.VITE_TMDB_API_KEY },
            }
          ),
          axios.get(
            "https://api.themoviedb.org/3/genre/movie/list?language=en",
            {
              params: { api_key: import.meta.env.VITE_TMDB_API_KEY },
            }
          ),
        ]);

        setMoviesData(moviesRes.data);
        setGenreData(genreRes.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getMovies();
  }, [page]);

  const getGenreName = (id: number) => {
    return genreData?.genres.find((g) => g.id === id)?.name;
  };

  return (
    <main className="min-h-screen bg-background text-white font-sans selection:bg-primary/30">
      <Nav />

      <div className="container mx-auto px-6 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
            <PlayCircle className="h-8 w-8 text-primary" />
            Now Playing
          </h1>
          <p className="text-gray-400">Movies currently in theaters.</p>
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
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mb-12">
              {moviesData?.results.map((movie, index) => (
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
                    genre={
                      movie.genre_ids
                        ? getGenreName(movie.genre_ids[0])
                        : undefined
                    }
                  />
                </div>
              ))}
            </div>
            <Pagination
              page={page}
              setPage={setPage}
              totalMovies={moviesData ? moviesData.total_results : 0}
            />
          </>
        )}
      </div>
    </main>
  );
};

export default NowPlaying;
