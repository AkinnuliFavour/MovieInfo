import { useEffect, useState } from "react"
import axios from "axios"
import SideNav from "../../components/SideNav"
import FilmCard from '../../components/FilmCard'
import { MoviesData, GenreData } from "../home/Home"

const Upcoming = () => {
    const [moviesData, setMoviesData] = useState<MoviesData>()
    const [genreData, setGenreData] = useState<GenreData>()

    useEffect(() => {
        const getMovies = async() => {
            const movies: MoviesData = await axios.get('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', {
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
  return (
    <main className="flex">
        <SideNav />
        <section className='w-full flex justify-center lg:justify-between items-center gap-[80px] px-6 flex-wrap pb-6 lg:ml-[17%] lg:mr-6 mt-[38px] h-full'>
            {
                genreData && moviesData?.data.results.map(movie => <FilmCard movie={movie} genre={genreData}/>)
            }
        </section>
    </main>
  )
}

export default Upcoming
