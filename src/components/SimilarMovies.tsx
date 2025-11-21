import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from './ui/MovieCard';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    genre_ids: number[];
}

const SimilarMovies = ({ movieId }: { movieId: number }) => {
    const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchSimilar = async () => {
            try {
                const res = await axios.get(
                    `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=1`
                );
                setSimilarMovies(res.data.results);
            } catch (error) {
                console.error("Error fetching similar movies:", error);
            }
        };
        if (movieId) fetchSimilar();
    }, [movieId]);

    if (similarMovies.length === 0) return null;

    return (
        <div className="mt-12">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {similarMovies.slice(0, 4).map((movie, index) => (
                    <div key={movie.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                        <MovieCard 
                            id={movie.id}
                            title={movie.title}
                            posterPath={movie.poster_path}
                            rating={movie.vote_average}
                            year={movie.release_date?.split('-')[0] || 'N/A'}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SimilarMovies;
