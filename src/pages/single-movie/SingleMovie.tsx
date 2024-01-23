import { Link } from 'react-router-dom'
import Logo from '../../assets/logo-dark-text.png'
import { linkStyle } from '../../lib/utils'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

interface MovieDetails {
  data: {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
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

const SingleMovie = () => {
  const [movieDetails, setMovieDetails] = useState<MovieDetails>()
  const {id} = useParams()
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

  const releaseDate = movieDetails ? movieDetails?.data.release_date : ''
  const date = new Date(releaseDate)

  const Pg = movieDetails?.data.adult ? 'PG-18' : 'PG-13'

  const runtime = movieDetails ? movieDetails?.data.runtime : 0
  const hours = Math.floor(runtime / 60)
  const minutes = runtime % 60
  return (
    <main className="flex h-screen max-w-screen">
      <nav className="border-r min-h-screen border-black border-opacity-30 rounded-r-3xl w-1/6 py-10 flex flex-col justify-between fixed top-0 left-0">
        <div className='px-[20px]'>
          <img src={Logo} alt="" className='w-[186px] h-[50px]'/>
        </div>
        <ul className='h-[300px] w-full flex flex-col justify-between'>
            <li className=''><Link to='' className={linkStyle}>Home</Link></li>
            <li><Link to='' className={linkStyle}>Movies</Link></li>
            <li><Link to='' className={linkStyle}>TV series</Link></li>
            <li><Link to='' className={linkStyle}>Upcoming</Link></li>
        </ul>
        <div>
            <p></p>
        </div>
        <p className='px-[20px]'>Log out</p>
      </nav>
      <section className='ml-[263px] mr-6 w-5/6'>
        <section className="w-full h-[90%] xl:h-full bg-no-repeat bg-contain bg-center rounded-[30px]" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieDetails?.data.backdrop_path})`}}/>
          <div className='flex gap-4 px-[18px]'>
              <span data-testid = 'movie-title' className='text-[#404040] font-medium text-[23px]'>{movieDetails?.data.original_title} • {date.getFullYear()} • {Pg} • {`${hours}h ${minutes}m`}</span>
              <p className='text-center text-[15px] text-[#B91C1C] font-medium place-self-center rounded-[15px] px-2 py border border-[#F8E7EB]'>Action</p>
              <p className='text-center text-[15px] text-[#B91C1C] font-medium place-self-center rounded-[15px] px-2 py border border-[#F8E7EB]'>Drama</p>
          </div>
        <p className='mt-4 px-[18px] text-[20px]' data-testid = 'movie-overview'>{movieDetails?.data.overview}</p>
        <p className='mt-4 px-[18px]' data-testid = 'movie-release-date'>Release Date: {movieDetails?.data.release_date}</p>
        <p className='mt-4 px-[18px]' data-testid = 'movie-runtime'>Runtime:  {movieDetails?.data.runtime} mins</p>
        <p className='mt-4 pb-4 px-[18px]'></p>
      </section>
    </main>
  )
}

export default SingleMovie
