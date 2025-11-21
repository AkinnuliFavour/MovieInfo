import { useEffect, useState } from "react";
import axios from "axios";
import { LayoutGrid } from "lucide-react";
import { GenreData, MoviesData } from "../../types/movie";
import Nav from "../../components/Nav";
import MovieCard from "../../components/ui/MovieCard";
import Pagination from "../../components/Pagination";

const Dashboard = () => {
  const [moviesData, setMoviesData] = useState<MoviesData>();
  const [genreData, setGenreData] = useState<GenreData>();
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const movies: MoviesData = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=28`,
          {
            params: {
              api_key: import.meta.env.VITE_TMDB_API_KEY,
            },
          }
        );

        const genre: GenreData = await axios.get(
          "https://api.themoviedb.org/3/genre/movie/list?language=en",
          {
            params: {
              api_key: import.meta.env.VITE_TMDB_API_KEY,
            },
          }
        );

        setMoviesData(movies);
        setGenreData(genre);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, [page]);

  const getGenreName = (id: number) => {
    return genreData?.data.genres.find((g) => g.id === id)?.name;
  };

  return (
    <main className="min-h-screen bg-background text-white font-sans selection:bg-primary/30">
      <Nav />
      
      <div className="container mx-auto px-6 pt-24 pb-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 animate-fade-in-up">
          <div className="p-3 rounded-xl bg-primary/10 text-primary shadow-glow">
            <LayoutGrid className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Action Movies</h1>
            <p className="text-gray-400 mt-1">Top recommended action movies for you</p>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="h-[400px] w-full animate-pulse rounded-xl bg-white/5" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            {moviesData?.data.results.map((movie, index) => (
              <div key={movie.id} style={{ animationDelay: `${index * 50}ms` }} className="animate-fade-in-up">
                <MovieCard
                  id={movie.id}
                  title={movie.title}
                  posterPath={movie.poster_path}
                  rating={movie.vote_average}
                  year={movie.release_date?.split('-')[0] || 'N/A'}
                  genre={movie.genre_ids ? getGenreName(movie.genre_ids[0]) : undefined}
                />
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && moviesData && (
          <div className="mt-12">
            <Pagination
              page={page}
              setPage={setPage}
              totalMovies={moviesData.data.total_results}
            />
          </div>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
