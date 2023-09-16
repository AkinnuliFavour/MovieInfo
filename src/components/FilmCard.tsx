import { Link } from "react-router-dom"

export interface Movie {
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
}

interface GenreData {
  data:{
    genres:{
      id: number
      name: string
    }[]
  }
}

const FilmCard = ({movie, genre}: {movie: Movie, genre: GenreData}) => {
  const [genre1, genre2] = movie.genre_ids
  
  return (
    <Link to={`/movie-details/${movie.id}`} className="hover:cursor-pointer" data-testid = 'movie-card'>
      <div className="w-[250px] h-[350px] mt-12 bg-red-400 bg-no-repeat bg-cover bg-center" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.poster_path})`}} data-testid = 'movie-poster'>
      </div>
      <p className="text-gray-400" data-testid = 'movie-release-date'>Date of release: {movie.release_date}</p>
      <p className="text-gray-900" data-testid = 'movie-title'>{movie.original_title}</p>
      <div>
        <p></p>
        <p></p>
      </div>
      <p className="text-gray-400">{genre.data.genres.map(genre => genre.id === genre1 ? genre.name : '')}, {genre.data.genres.map(genre => genre.id === genre2 ? genre.name : '')}</p>
    </Link>
  )
}

export default FilmCard
