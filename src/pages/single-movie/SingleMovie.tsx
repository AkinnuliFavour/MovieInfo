import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Play,
  Star,
  Calendar,
  Clock,
  Bookmark,
  Share2,
  MessageCircle,
} from "lucide-react";
import Nav from "../../components/Nav";
import Button from "../../components/ui/Button";
import Chip from "../../components/ui/Chip";
// import RatingsReviews from "../../components/RatingsReviews";
import SimilarMovies from "../../components/SimilarMovies";
import {
  addToWatchlist,
  isInWatchlist,
  removeFromWatchlist,
} from "../../lib/storage";
import { Movie } from "../../types/movie";

interface MovieDetails {
  data: {
    adult: boolean;
    backdrop_path: string;
    genres: {
      id: number;
      name: string;
    }[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    runtime: number;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    tagline: string;
  };
}

interface MovieVideos {
  data: {
    id: number;
    results: {
      key: string;
      name: string;
      type: string;
      site: string;
    }[];
  };
}

interface MovieCredits {
  data: {
    cast: {
      id: number;
      name: string;
      character: string;
      profile_path: string;
    }[];
    crew: {
      id: number;
      name: string;
      job: string;
    }[];
  };
}

const SingleMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movieDetails, setMovieDetails] = useState<MovieDetails>();
  const [movieVideos, setMovieVideos] = useState<MovieVideos>();
  const [movieCredits, setMovieCredits] = useState<MovieCredits>();
  const [isInWatchlistState, setIsInWatchlistState] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [details, videos, credits] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
            params: { api_key: import.meta.env.VITE_TMDB_API_KEY },
          }),
          axios.get(
            `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
            {
              params: { api_key: import.meta.env.VITE_TMDB_API_KEY },
            }
          ),
          axios.get(
            `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
            {
              params: { api_key: import.meta.env.VITE_TMDB_API_KEY },
            }
          ),
        ]);

        setMovieDetails(details);
        setMovieVideos(videos);
        setMovieCredits(credits);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
      setIsInWatchlistState(isInWatchlist(Number(id)));
    }
  }, [id]);

  const toggleWatchlist = () => {
    if (!movieDetails || !id) return;

    if (isInWatchlistState) {
      removeFromWatchlist(Number(id));
    } else {
      const movie: Movie = {
        id: movieDetails.data.id,
        title: movieDetails.data.title,
        original_title: movieDetails.data.original_title,
        poster_path: movieDetails.data.poster_path,
        backdrop_path: movieDetails.data.backdrop_path,
        overview: movieDetails.data.overview,
        release_date: movieDetails.data.release_date,
        vote_average: movieDetails.data.vote_average,
        vote_count: movieDetails.data.vote_count,
        popularity: movieDetails.data.popularity,
        adult: movieDetails.data.adult,
        video: movieDetails.data.video,
        original_language: movieDetails.data.original_language,
        genre_ids: movieDetails.data.genres.map((g) => g.id),
      };
      addToWatchlist(movie);
    }
    setIsInWatchlistState(!isInWatchlistState);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const trailer = movieVideos?.data.results.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );
  const director = movieCredits?.data.crew.find((c) => c.job === "Director");
  const cast = movieCredits?.data.cast.slice(0, 6);
  const runtime = movieDetails?.data.runtime || 0;
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  return (
    <main className="min-h-screen bg-background text-white font-sans pb-20">
      <Nav />

      {/* Cinematic Header */}
      <div className="relative h-[70vh] w-full">
        <div className="absolute inset-0">
          <img
            src={`https://image.tmdb.org/t/p/original/${movieDetails?.data.backdrop_path}`}
            alt={movieDetails?.data.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
        </div>

        <div className="container relative mx-auto h-full flex flex-col justify-end px-6 pb-12">
          <div className="max-w-4xl animate-fade-in-up">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              {movieDetails?.data.genres.map((genre) => (
                <Chip key={genre.id} label={genre.name} variant="glass" />
              ))}
              <span className="flex items-center gap-1 text-sm font-medium text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-md backdrop-blur-md">
                <Star className="h-4 w-4 fill-current" />
                {movieDetails?.data.vote_average.toFixed(1)}
              </span>
            </div>

            <h1 className="mb-2 font-display text-5xl font-bold leading-tight md:text-7xl text-glow">
              {movieDetails?.data.title}
            </h1>

            {movieDetails?.data.tagline && (
              <p className="mb-6 text-xl text-gray-300 italic font-light">
                "{movieDetails.data.tagline}"
              </p>
            )}

            <div className="flex flex-wrap items-center gap-6 text-gray-300 mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{movieDetails?.data.release_date.split("-")[0]}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>
                  {hours}h {minutes}m
                </span>
              </div>
              {director && (
                <div className="text-sm">
                  Directed by{" "}
                  <span className="text-white font-semibold">
                    {director.name}
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-4">
              {trailer && (
                <Button
                  variant="primary"
                  size="lg"
                  className="gap-2 shadow-glow"
                  onClick={() =>
                    window.open(
                      `https://www.youtube.com/watch?v=${trailer.key}`,
                      "_blank"
                    )
                  }
                >
                  <Play className="h-5 w-5 fill-current" />
                  Watch Trailer
                </Button>
              )}
              <Button
                variant={isInWatchlistState ? "secondary" : "glass"}
                size="lg"
                className="gap-2"
                onClick={toggleWatchlist}
              >
                <Bookmark
                  className={`h-5 w-5 ${isInWatchlistState ? "fill-current" : ""}`}
                />
                {isInWatchlistState ? "In Watchlist" : "Add to Watchlist"}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="gap-2 border-primary/50 text-primary hover:bg-primary/10"
                onClick={() => navigate(`/forums/movie/${id}`)}
              >
                <MessageCircle className="h-5 w-5" />
                Discuss this Movie
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white/5 hover:bg-white/10"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          {/* Overview */}
          <section
            className="animate-fade-in-up"
            style={{ animationDelay: "100ms" }}
          >
            <h2 className="text-2xl font-bold mb-4">Storyline</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              {movieDetails?.data.overview}
            </p>
          </section>

          {/* Cast */}
          <section
            className="animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            <h2 className="text-2xl font-bold mb-6">Top Cast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {cast?.map((actor) => (
                <div key={actor.id} className="group text-center">
                  <div className="relative mb-3 overflow-hidden rounded-xl aspect-[2/3]">
                    {actor.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                        alt={actor.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="h-full w-full bg-white/5 flex items-center justify-center text-gray-500">
                        No Image
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-white group-hover:text-primary transition-colors">
                    {actor.name}
                  </h3>
                  <p className="text-sm text-gray-400">{actor.character}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Reviews */}
          {/* <section
            className="animate-fade-in-up"
            style={{ animationDelay: "300ms" }}
          >
            <h2 className="text-2xl font-bold mb-6">Reviews</h2>
            {id && movieDetails && (
              <RatingsReviews
                movieId={Number(id)}
                movieTitle={movieDetails.data.title}
              />
            )}
          </section> */}
        </div>

        {/* Sidebar */}
        <div
          className="space-y-8 animate-fade-in-up"
          style={{ animationDelay: "400ms" }}
        >
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-4">Movie Info</h3>
            <div className="space-y-4 text-sm">
              <div>
                <span className="block text-gray-400 mb-1">Original Title</span>
                <span className="font-medium">
                  {movieDetails?.data.original_title}
                </span>
              </div>
              <div>
                <span className="block text-gray-400 mb-1">Status</span>
                <span className="font-medium">Released</span>
              </div>
              <div>
                <span className="block text-gray-400 mb-1">
                  Original Language
                </span>
                <span className="font-medium uppercase">
                  {movieDetails?.data.original_language}
                </span>
              </div>
              <div>
                <span className="block text-gray-400 mb-1">Budget</span>
                <span className="font-medium">N/A</span>{" "}
                {/* API doesn't always provide budget in this endpoint */}
              </div>
              <div>
                <span className="block text-gray-400 mb-1">Revenue</span>
                <span className="font-medium">N/A</span>
              </div>
            </div>
          </div>

          {/* Similar Movies */}
          <div>
            <h3 className="text-xl font-bold mb-4">You May Also Like</h3>
            {id && <SimilarMovies movieId={Number(id)} />}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SingleMovie;
