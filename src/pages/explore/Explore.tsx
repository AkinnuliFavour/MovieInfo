import { useState, useEffect } from 'react';
import axios from 'axios';
import { Compass, Smile, Moon, Flame, Heart, Zap } from 'lucide-react';
import Nav from '../../components/Nav';
import MovieCard from '../../components/ui/MovieCard';
import { GenreData, Movie } from '../../types/movie';

const MOODS = [
    { name: "Feel-good", genres: [35, 10751, 16], icon: <Smile className="h-5 w-5" />, color: "from-yellow-400 to-orange-500" },
    { name: "Dark", genres: [27, 53, 9648], icon: <Moon className="h-5 w-5" />, color: "from-gray-700 to-black" },
    { name: "Adrenaline", genres: [28, 12], icon: <Flame className="h-5 w-5" />, color: "from-red-500 to-orange-600" },
    { name: "Heartwarming", genres: [10749, 18], icon: <Heart className="h-5 w-5" />, color: "from-pink-500 to-rose-500" },
    { name: "Mind-bending", genres: [878, 9648], icon: <Zap className="h-5 w-5" />, color: "from-purple-500 to-indigo-600" },
];

const Explore = () => {
    const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
    const [selectedMood, setSelectedMood] = useState<string | null>(null);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [genreData, setGenreData] = useState<GenreData>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const res = await axios.get(
                    `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en`
                );
                setGenreData(res.data);
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };
        fetchGenres();
    }, []);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                let genreIds = selectedGenre ? [selectedGenre] : [];
                
                if (selectedMood) {
                    const mood = MOODS.find(m => m.name === selectedMood);
                    if (mood) {
                        genreIds = [...genreIds, ...mood.genres];
                    }
                }

                const withGenres = genreIds.join(',');
                const endpoint = (selectedGenre || selectedMood) 
                    ? `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&page=1&with_genres=${withGenres}`
                    : `https://api.themoviedb.org/3/trending/movie/week?api_key=${import.meta.env.VITE_TMDB_API_KEY}`;

                const res = await axios.get(endpoint);
                setMovies(res.data.results);
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [selectedGenre, selectedMood]);

    const handleGenreClick = (id: number) => {
        setSelectedGenre(prev => prev === id ? null : id);
        setSelectedMood(null);
    };

    const handleMoodClick = (name: string) => {
        setSelectedMood(prev => prev === name ? null : name);
        setSelectedGenre(null);
    };

    const getGenreName = (id: number) => {
        return genreData?.data.genres.find(g => g.id === id)?.name;
    };

    return (
        <main className="min-h-screen bg-background text-white font-sans selection:bg-primary/30">
            <Nav />
            
            <div className="container mx-auto px-6 pt-24 pb-12">
                {/* Hero Banner */}
                <div className="relative h-[300px] rounded-3xl overflow-hidden mb-12 flex items-center justify-center text-center px-4 shadow-glow-lg animate-fade-in-up">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 z-10 opacity-90" />
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 z-10" />
                    <div className="relative z-20 max-w-2xl">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg flex items-center justify-center gap-4">
                            <Compass className="h-10 w-10 md:h-12 md:w-12" />
                            Explore Cinema
                        </h1>
                        <p className="text-xl text-white/90 font-light">Find your next favorite movie by genre or mood.</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="mb-12 space-y-10 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                    {/* Moods */}
                    <div>
                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-gray-200">
                            <span>🎭</span> How are you feeling?
                        </h2>
                        <div className="flex flex-wrap gap-4">
                            {MOODS.map((mood) => (
                                <button
                                    key={mood.name}
                                    onClick={() => handleMoodClick(mood.name)}
                                    className={`group relative px-6 py-3 rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                                        selectedMood === mood.name
                                            ? 'ring-2 ring-white shadow-glow'
                                            : 'hover:shadow-lg'
                                    }`}
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${mood.color} opacity-80 group-hover:opacity-100 transition-opacity`} />
                                    <div className="relative z-10 flex items-center gap-2 font-bold text-white">
                                        {mood.icon}
                                        {mood.name}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Genres */}
                    <div>
                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-gray-200">
                            <span>🎬</span> Browse by Genre
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {genreData?.data.genres.map((genre) => (
                                <button
                                    key={genre.id}
                                    onClick={() => handleGenreClick(genre.id)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border ${
                                        selectedGenre === genre.id
                                            ? 'bg-primary border-primary text-white shadow-glow'
                                            : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
                                    }`}
                                >
                                    {genre.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                        <div className="h-8 w-1 bg-primary rounded-full"></div>
                        {selectedMood ? `${selectedMood} Movies` : selectedGenre && genreData ? `${genreData.data.genres.find(g => g.id === selectedGenre)?.name} Movies` : 'Trending Now'}
                    </h2>
                    
                    {loading ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                            {Array.from({ length: 10 }).map((_, i) => (
                                <div key={i} className="h-[400px] w-full animate-pulse rounded-xl bg-white/5" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                            {movies.map((movie, index) => (
                                <div key={movie.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
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
                    )}
                    
                    {!loading && movies.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="text-6xl mb-4">😕</div>
                            <h3 className="text-2xl font-bold mb-2">No movies found</h3>
                            <p className="text-gray-400">Try selecting a different mood or genre!</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Explore;
