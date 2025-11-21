import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ChevronRight, Play, Info } from 'lucide-react'
import Nav from '../../components/Nav'
import MovieCard from '../../components/ui/MovieCard'
import Button from '../../components/ui/Button'

import { MoviesData, GenreData } from '../../types/movie'

const Home = () => {
  const navigate = useNavigate()
  const [moviesData, setMoviesData] = useState<MoviesData>()
  const [genreData, setGenreData] = useState<GenreData>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getMovies = async () => {
      try {
        const movies: MoviesData = await axios.get('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', {
          params: {
            api_key: import.meta.env.VITE_TMDB_API_KEY
          }
        })

        const genre: GenreData = await axios.get('https://api.themoviedb.org/3/genre/movie/list?language=en', {
          params: {
            api_key: import.meta.env.VITE_TMDB_API_KEY
          }
        })

        setMoviesData(movies)
        setGenreData(genre)
      } catch (error) {
        console.error("Failed to fetch movies:", error)
      } finally {
        setIsLoading(false)
      }
    }
    getMovies()
  }, [])

  const featuredMovie = moviesData?.data.results[0]
  const imageUrl = featuredMovie ? `https://image.tmdb.org/t/p/original/${featuredMovie.backdrop_path}` : ''

  const getGenreName = (id: number) => {
    return genreData?.data.genres.find(g => g.id === id)?.name
  }

  return (
    <main className="min-h-screen bg-background text-white font-sans selection:bg-primary/30">
      <Nav />
      
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0">
          {imageUrl && (
            <img 
              src={imageUrl} 
              alt="Hero Background" 
              className="h-full w-full object-cover object-center"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="container relative mx-auto flex h-full flex-col justify-center px-6 pt-20">
          <div className="max-w-2xl animate-fade-in-up">
            {featuredMovie && (
              <>
                <h1 className="mb-4 font-display text-5xl font-bold leading-tight tracking-tight md:text-7xl text-glow">
                  {featuredMovie.title}
                </h1>
                
                <div className="mb-6 flex items-center gap-4 text-sm font-medium text-gray-300">
                  <span className="rounded-md bg-yellow-500/20 px-2 py-1 text-yellow-500 backdrop-blur-sm">
                    IMDb {featuredMovie.vote_average.toFixed(1)}
                  </span>
                  <span>{featuredMovie.release_date.split('-')[0]}</span>
                  <span>{getGenreName(featuredMovie.genre_ids[0])}</span>
                </div>

                <p className="mb-8 text-lg text-gray-300 line-clamp-3 md:text-xl">
                  {featuredMovie.overview}
                </p>

                <div className="flex flex-wrap gap-4">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="gap-2 shadow-glow hover:shadow-glow-lg"
                    onClick={() => navigate(`/movie-details/${featuredMovie.id}`)}
                  >
                    <Play className="h-5 w-5 fill-current" />
                    Watch Trailer
                  </Button>
                  <Button 
                    variant="glass" 
                    size="lg" 
                    className="gap-2"
                    onClick={() => navigate(`/movie-details/${featuredMovie.id}`)}
                  >
                    <Info className="h-5 w-5" />
                    More Info
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Featured Movies Grid */}
      <section className="container mx-auto px-6 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white md:text-4xl">Now Playing</h2>
            <div className="mt-2 h-1 w-20 rounded-full bg-primary shadow-glow" />
          </div>
          <Link to='/now-playing' className="group flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80">
            See All <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {isLoading ? (
            // Skeleton Loading
            Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="h-[400px] w-full animate-pulse rounded-xl bg-white/5" />
            ))
          ) : (
            moviesData?.data.results.map((movie, index) => (
              <div key={movie.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                <MovieCard 
                  id={movie.id}
                  title={movie.title}
                  posterPath={movie.poster_path}
                  rating={movie.vote_average}
                  year={movie.release_date?.split('-')[0] || 'N/A'}
                  genre={getGenreName(movie.genre_ids[0])}
                />
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  )
}

export default Home
