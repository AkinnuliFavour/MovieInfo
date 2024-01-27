import { useState, useEffect } from 'react'
import Nav from '../../components/Nav'
import SideNav from '../../components/SideNav'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { GenreData, MoviesData } from '../home/Home'
import FilmCard from '../../components/FilmCard'


const Search = () => {
    const { title } = useParams()

    console.log(typeof(title))

    const [moviesData, setMoviesData] = useState<MoviesData>()
    const [genreData, setGenreData] = useState<GenreData>()

    useEffect(() => {
        const getMovies = async() => {
            const url = `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&query=${title}&page=1&include_adult=false`
            const movies = await axios.get(url)

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
    }, [title])

  return (
    <main className="">
        <Nav hidden={true} />
        <section className="flex">
            <SideNav />
            <section className='w-full flex justify-center lg:justify-between items-center gap-[80px] px-6 flex-wrap pb-6 lg:ml-[17%] lg:mr-6 mt-[38px] h-full'>
                {
                    genreData && moviesData?.data.results.map(movie => <FilmCard key={movie.id} movie={movie} genre={genreData}/>)
                }
            </section>
        </section>
        {/* <Pagination page={page} setPage={setPage} totalMovies={moviesData ? moviesData?.data.total_results : 0} /> */}
    </main>
  )
}

export default Search
