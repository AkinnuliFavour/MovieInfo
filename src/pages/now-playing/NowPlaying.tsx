import { useEffect, useState } from "react"
import axios from "axios"
import { MoviesData, GenreData } from "../home/Home"
import FilmCard from '../../components/FilmCard'
import SideNav from "../../components/SideNav"
import Pagination from '../../components/Pagination'
import Nav from "../../components/Nav"

const NowPlaying = () => {
  const [moviesData, setMoviesData] = useState<MoviesData>()
  const [genreData, setGenreData] = useState<GenreData>()
  const [page, setPage] = useState<number>(1)

  useEffect(() => {
      const getMovies = async() => {
          const movies: MoviesData = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`, {
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
  }, [page])
  return (
    <main className="">
      <Nav />
      <section className="flex">
        <SideNav />
        <section className='w-full flex justify-center lg:justify-between items-center gap-[80px] px-6 flex-wrap pb-6 lg:ml-[17%] lg:mr-6 mt-[38px] h-full'>
            {
                genreData && moviesData?.data.results.map(movie => <FilmCard key={movie.id} movie={movie} genre={genreData}/>)
            }
        </section>
      </section>
      <Pagination page={page} setPage={setPage} totalMovies={moviesData ? moviesData?.data.total_results : 0} />
    </main>
  )
}

export default NowPlaying
