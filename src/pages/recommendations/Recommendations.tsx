import { useEffect, useState } from "react";
import axios from "axios";
import { Sparkles } from "lucide-react";
import Nav from "../../components/Nav";
import MovieCard from "../../components/ui/MovieCard";
import { GenreData, Movie } from "../../types/movie";


const MovieCarousel = ({ title, movies, genreData }: { title: string, movies: Movie[], genreData: GenreData }) => {
    const getGenreName = (id: number) => {
        return genreData?.data.genres.find(g => g.id === id)?.name;
    };

    return (
        <div className="mb-12 animate-fade-in-up">
            <h2 className="text-2xl font-bold mb-6 px-6 text-white flex items-center gap-2">
                <div className="h-8 w-1 bg-primary rounded-full"></div>
                {title}
            </h2>
            <div className="flex overflow-x-auto pb-8 px-6 gap-6 scrollbar-hide snap-x">
                {movies.map((movie, index) => (
                    <div key={movie.id} className="snap-start shrink-0 w-[200px]" style={{ animationDelay: `${index * 50}ms` }}>
                        <MovieCard 
                            id={movie.id}
                            title={movie.title}
                            posterPath={movie.poster_path}
                            rating={movie.vote_average}
                            year={movie.release_date?.split('-')[0] || 'N/A'}
                            genre={movie.genre_ids ? getGenreName(movie.genre_ids[0]) : undefined}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

const Recommendations = () => {
    const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
    const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
    const [actionMovies, setActionMovies] = useState<Movie[]>([]);
    const [genreData, setGenreData] = useState<GenreData>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const apiKey = import.meta.env.VITE_TMDB_API_KEY;
            
            try {
                const [trendingRes, topRatedRes, actionRes, genreRes] = await Promise.all([
                    axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`),
                    axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`),
                    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=28&sort_by=popularity.desc`),
                    axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en`)
                ]);

                setTrendingMovies(trendingRes.data.results);
                setTopRatedMovies(topRatedRes.data.results);
                setActionMovies(actionRes.data.results);
                setGenreData(genreRes.data);
            } catch (error) {
                console.error("Error fetching recommendations:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading || !genreData) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-background text-white font-sans selection:bg-primary/30">
            <Nav />
            
            <div className="container mx-auto pt-24 pb-12">
                <div className="px-6 mb-12 text-center">
                    <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3 text-glow">
                        <Sparkles className="h-8 w-8 text-primary" />
                        For You
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Personalized picks based on what's trending, top rated classics, and high-octane action.
                    </p>
                </div>
                
                <MovieCarousel title="Trending This Week" movies={trendingMovies} genreData={genreData} />
                <MovieCarousel title="Top Rated Classics" movies={topRatedMovies} genreData={genreData} />
                <MovieCarousel title="High Octane Action" movies={actionMovies} genreData={genreData} />
            </div>
        </main>
    );
};

export default Recommendations;
