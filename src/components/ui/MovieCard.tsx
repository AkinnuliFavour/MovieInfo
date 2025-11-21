import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

interface MovieCardProps {
  id: number;
  title: string;
  posterPath: string;
  rating: number;
  year: string;
  genre?: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ id, title, posterPath, rating, year, genre }) => {
  const imageUrl = posterPath 
    ? `https://image.tmdb.org/t/p/w500${posterPath}` 
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <Link to={`/movie/${id}`} className="group relative block h-[400px] w-full overflow-hidden rounded-xl bg-card shadow-cinematic transition-all duration-500 hover:-translate-y-2 hover:shadow-glow">
      {/* Image */}
      <div className="absolute inset-0 h-full w-full">
        <img 
          src={imageUrl} 
          alt={title} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-4 translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
        <div className="mb-2 flex items-center gap-2 opacity-0 transition-opacity duration-300 delay-100 group-hover:opacity-100">
          <span className="inline-flex items-center gap-1 rounded-full bg-yellow-500/20 px-2 py-0.5 text-xs font-bold text-yellow-500 backdrop-blur-sm">
            <Star className="h-3 w-3 fill-yellow-500" />
            {rating.toFixed(1)}
          </span>
          <span className="text-xs font-medium text-gray-300">{year}</span>
        </div>
        
        <h3 className="line-clamp-2 text-lg font-bold text-white drop-shadow-md group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        
        {genre && (
          <p className="mt-1 text-xs text-gray-400 line-clamp-1 opacity-0 transition-opacity duration-300 delay-200 group-hover:opacity-100">
            {genre}
          </p>
        )}
      </div>
    </Link>
  );
};

export default MovieCard;
