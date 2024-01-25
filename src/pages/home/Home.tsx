import Logo from '../../assets/logo.png'
// import Menu from '../../assets/Icons/Menu.svg'
import FilmCard from '../../components/FilmCard'
import { useEffect, useState } from 'react'
// import api from '../../api/movie'
import axios from 'axios'
import { ReactComponent as Menu } from '../../assets/Icons/Menu alt 4-1.svg'
import { ReactComponent as Chevron} from '../../assets/Icons/Chevron right-1.svg'

export interface MoviesData {
  data:{
    results: {
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
      title: string
      video: boolean
      vote_average: number
      vote_count: number
    }[]
  }
}

export interface GenreData {
  data:{
    genres:{
      id: number
      name: string
    }[]
  }
}

const Home = () => {
  const [moviesData, setMoviesData] = useState<MoviesData>()
  const [genreData, setGenreData] = useState<GenreData>()
  useEffect(() => {
    const getMovies = async() => {
      const movies: MoviesData = await axios.get('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', {
        params:{
          api_key: import.meta.env.VITE_TMDB_API_KEY
        }
      })

      const genre: GenreData= await axios.get('https://api.themoviedb.org/3/genre/movie/list?language=en', {
        params:{
          api_key: import.meta.env.VITE_TMDB_API_KEY
        }
      })

      console.log(movies)
      console.log(genre)
      setMoviesData(movies)
      setGenreData(genre)
    }
    getMovies()
  }, [])
  const imageUrl = moviesData ? `https://image.tmdb.org/t/p/original/${moviesData.data.results[1].backdrop_path}` : '1E5baAaEse26fej7uHcjOgEE2t2.jpg'
  console.log(imageUrl)
  
  return (
    <main className="max-w-screen h-screen text-white">
      <section className={`w-full h-[600px] lg:h-full bg-zinc-800 bg-no-repeat bg-cover bg-center flex flex-col justify-between pb-8`} style={{backgroundImage: `url(${imageUrl})`}}>
        <nav className='px-8 lg:px-[95px] pt-[15px] flex flex-col md:flex-row justify-between'>
          <img src={Logo} alt="" className=''/>
          <input type="search" name="" id="" className='md:w-1/3 w-full h-[36px] mt-[7px] px-2 hidden md:block bg-transparent border border-white outline-none rounded-lg'/>
          <div className='md:flex justify-center items-center gap-4 mt-[7px] w-28 hidden'>
            <p className=''>Sign In </p>
            {/* <img src={Menu} alt=""/> */}
            <Menu className='bg-[#BE123C] rounded-full p-2 w-[36px] h-[36px]'/>
          </div>
        </nav>
        <section className='px-8 lg:px-[98px] mt-2 md:mt-4 lg:mt-16'>
          <p className='text-[48px] font-bold'>{moviesData && moviesData.data.results[1].original_title}</p>
          <p className='text-ellipsis text-[14px] md:w-5/12 font-bold text-base'>{moviesData && moviesData.data.results[1].overview}</p>
          <button className='bg-[#BE123C] w-40 p-2 mt-4 rounded-lg'>Watch Trailer</button>
        </section>
      </section>
      <section className='mt-8 px-8 lg:px-[95px] w-full'>
        <div className='flex justify-between items-center'>
          <p className='text-black text-[36px] font-semibold'>Featured Movie</p>
          <div className='flex justify-center items-center text-center gap-1 w-28'>
            <p className='text-[#BE123C] text-sm'>See More</p>
            <Chevron className='w-[20px] h-[20px]'/>
          </div>
        </div>
        <section className='grid grid-cols-1 justify-items-center xl:justify-items-start md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-[80px] gap-y-[44px] pb-6'>
          {
            genreData && moviesData?.data.results.slice(0,12).map(movie => <FilmCard movie={movie} genre={genreData}/>)
          }
        </section>
      </section>
    </main>
  )
}

export default Home
