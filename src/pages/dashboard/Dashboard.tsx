import { useEffect, useState } from "react";
import axios from "axios";
import { GenreData, MoviesData } from "../home/Home";
import FilmCard from "../../components/FilmCard";
import Pagination from "../../components/Pagination";

const Dashboard = () => {
  const [moviesData, setMoviesData] = useState<MoviesData>();
  const [genreData, setGenreData] = useState<GenreData>();
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const getMovies = async () => {
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

      console.log(movies);
      console.log(genre);
      setMoviesData(movies);
      setGenreData(genre);
    };
    getMovies();
  }, [page]);

  return (
    <>
      <h1 className="text-center lg:text-left text-xl font-bold lg:ml-4">
        Recommended Movies
      </h1>
      <section className="flex justify-center lg:justify-between items-center gap-[60px] px-6 flex-wrap lg:mr-6 mt-11 h-full">
        {genreData &&
          moviesData?.data.results.map((movie) => (
            <FilmCard key={movie.id} movie={movie} genre={genreData} />
          ))}
      </section>
      <Pagination
        page={page}
        setPage={setPage}
        totalMovies={moviesData ? moviesData?.data.total_results : 0}
      />
    </>
  );
};

export default Dashboard;
