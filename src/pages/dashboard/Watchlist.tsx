
import { useEffect, useState } from "react";
import axios from "axios";

import { Bookmark, Trash2, Film } from "lucide-react";
import Nav from "../../components/Nav";
import MovieCard from "../../components/ui/MovieCard";
import Button from "../../components/ui/Button";
import { GenreData, Movie } from "../../types/movie";
import { getWatchlist, removeFromWatchlist } from "../../lib/storage";


const Watchlist = () => {
    const [watchlist, setWatchlist] = useState<Movie[]>([]);
    const [genreData, setGenreData] = useState<GenreData>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            setWatchlist(getWatchlist());

            try {
                const genre: GenreData = await axios.get(
                    "https://api.themoviedb.org/3/genre/movie/list?language=en",
                    {
                        params: {
                            api_key: import.meta.env.VITE_TMDB_API_KEY,
                        },
                    }
                );
                setGenreData(genre);
            } catch (error) {
                console.error("Error fetching genres:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    const handleRemove = (id: number) => {
        removeFromWatchlist(id);
        setWatchlist(getWatchlist());
    };

    const getGenreName = (id: number) => {
        return genreData?.data.genres.find(g => g.id === id)?.name;
    };

    return (
        <main className="min-h-screen bg-background text-white font-sans selection:bg-primary/30">
            <Nav />
            
            <div className="container mx-auto px-6 pt-24 pb-12">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-3">
                            <Bookmark className="h-8 w-8 text-primary" />
                            My Watchlist
                        </h1>
                        <p className="text-gray-400 mt-2">
                            {watchlist.length} {watchlist.length === 1 ? 'movie' : 'movies'} saved
                        </p>
                    </div>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="h-[400px] w-full animate-pulse rounded-xl bg-white/5" />
                        ))}
                    </div>
                ) : watchlist.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in-up">
                        <div className="rounded-full bg-white/5 p-8 mb-6">
                            <Film className="h-16 w-16 text-gray-500" />
                        </div>
                        <h2 className="text-2xl font-bold mb-3">Your watchlist is empty</h2>
                        <p className="text-gray-400 mb-8 max-w-md">
                            Start exploring movies and save them here to watch later.
                        </p>
                        <Button 
                            variant="primary" 
                            size="lg" 
                            to="/"
                            className="shadow-glow"
                        >
                            Discover Movies
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {watchlist.map((movie, index) => (
                            <div key={movie.id} className="group relative animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                                <MovieCard 
                                    id={movie.id}
                                    title={movie.title}
                                    posterPath={movie.poster_path}
                                    rating={movie.vote_average}
                                    year={movie.release_date?.split('-')[0] || 'N/A'}
                                    genre={movie.genre_ids ? getGenreName(movie.genre_ids[0]) : undefined}
                                />
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleRemove(movie.id);
                                    }}
                                    className="absolute top-3 right-3 p-2 rounded-full bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 hover:scale-110 shadow-lg backdrop-blur-sm"
                                    title="Remove from Watchlist"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default Watchlist;
