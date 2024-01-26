import {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import SideNav from '../../components/SideNav'

interface MovieDetails {
  data: {
    adult: boolean
    backdrop_path: string
    genres: {
      id: number
      name: string
    }[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    runtime: number
    title: string
    video: boolean
    vote_average: number
    vote_count: number
  }
}

interface MovieVideos {
  data: {
    id: number
    results: {
      id: string
      iso_639_1: string
      iso_3166_1: string
      key: string
      name: string
      official: boolean
      published_at: string
      site: string
      size: number
      type: string
    }[]
  }
}

interface MovieCredits {
  data:{
    cast: {
      adult: boolean
      cast_id: number
      character: string
      credit_id: string
      gender: number
      id: number
      known_for_department: string
      name: string
      order: number
      original_name: string
      popularity: number
      profile_path: string
    }[]
    crew:{
      adult: boolean
      credit_id: string 
      department: string
      gender: number
      id: number
      job: string
      known_for_department: string
      name: string
      original_name: string
      popularity: number
      profile_path: string
    }[]
  }
}

const SingleMovie = () => {
  const {id} = useParams()
  const [movieDetails, setMovieDetails] = useState<MovieDetails>()
  const [movieVideos, setMovieVideos] = useState<MovieVideos>()
  const [movieCredits, setMovieCredits] = useState<MovieCredits>()
  console.log(id)

  useEffect(() => {
    const getMovieDetails = async() => {
      const movie = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
        params:{
          api_key: import.meta.env.VITE_TMDB_API_KEY
        }
      })
      console.log(movie)
      setMovieDetails(movie)
    }
    getMovieDetails()
  }, [id])

  useEffect(() => {
    const getMovieVideos = async() => {
      const videos = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, {
        params:{
          api_key: import.meta.env.VITE_TMDB_API_KEY
        }
      })
      console.log(videos)
      setMovieVideos(videos)
    }
    getMovieVideos()
  }, [id])

  useEffect(() => {
    const getMovieCredits = async() => {
      const credits = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, {
        params:{
          api_key: import.meta.env.VITE_TMDB_API_KEY
        }
      })
      console.log(credits)
      setMovieCredits(credits)
    }
    getMovieCredits()
  }, [id])

  const releaseDate = movieDetails ? movieDetails?.data.release_date : ''
  const date = new Date(releaseDate)

  const Pg = movieDetails?.data.adult ? 'PG-18' : 'PG-13'

  const runtime = movieDetails ? movieDetails?.data.runtime : 0
  const hours = Math.floor(runtime / 60)
  const minutes = runtime % 60

  const trailer = movieVideos ? movieVideos?.data.results.find(result => result.type === 'Trailer') : ''
  const trailerKey = trailer ? trailer.key : ''

  const stars = movieCredits ? movieCredits?.data.cast.filter(actor => actor.popularity > 60) : ''
  const starNames = stars ? stars.map(star => star.name) : null
  const actorNames = movieCredits ? movieCredits?.data.cast.map(actor => actor.name) : ''
  const mainActors = actorNames ? actorNames.slice(0, 3) : null
  const director = movieCredits?.data.crew.find(crew => crew.job === 'Director')
  console.log(director)

  return (
    <main className="flex h-screen max-w-screen">
      <SideNav />
      <section className='flex flex-col px-4 lg:ml-[263px] lg:mr-6 mt-[38px] w-full h-full lg:w-5/6'>
        {/* <video src={`https://www.youtube.com/watch?v=${trailerKey}`} className="w-full h-[449px] xl:h-full bg-no-repeat bg-contain bg-center rounded-[30px]" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w780/${movieDetails?.data.backdrop_path})`}}/> */}
        {/* <video src={`https://www.youtube.com/watch?v=${trailerKey}`} width={400} controls></video> */}
        <iframe width="420" height="315" src={`https://www.youtube.com/embed/${trailerKey}`} className="w-full h-[449px] bg-no-repeat bg-contain bg-center rounded-[30px]"></iframe>
          <div className='flex gap-4 px-[18px] mt-[31px]'>
              <span data-testid = 'movie-title' className='text-[#404040] font-medium text-[23px]'>{movieDetails?.data.original_title} • {date.getFullYear()} • {Pg} • {`${hours}h ${minutes}m`}</span>
              {
                movieDetails?.data.genres.map((genre) => (
                  <p 
                    className='text-center text-[15px] text-[#B91C1C] font-medium place-self-center rounded-[15px] px-2 py border border-[#F8E7EB]'
                    key={genre.id}
                  >
                    {genre.name}
                  </p>
                ))
              }
              {/* <p className='text-center text-[15px] text-[#B91C1C] font-medium place-self-center rounded-[15px] px-2 py border border-[#F8E7EB]'>Drama</p> */}
          </div>
        <p className='mt-4 px-[18px] font-normal' data-testid = 'movie-overview'>{movieDetails?.data.overview}</p>
        <p className='mt-4 px-[18px]' data-testid = 'movie-release-date'>Director: <span className='text-[#BE123C]'>{director?.name}</span></p>
        <p className='mt-4 px-[18px]' data-testid = 'movie-runtime'>Stars:  <span className='text-[#BE123C]'>{starNames?.join(', ') || mainActors?.join(', ')}</span></p>
        <p className='mt-4 px-[18px]'>Rating:   <span className='text-[#BE123C]'>⭐ {movieDetails?.data.vote_average.toFixed(1)}</span></p>
        <p className='mt-4 pb-4 px-[18px]'></p>
      </section>
    </main>
  )
}

export default SingleMovie
