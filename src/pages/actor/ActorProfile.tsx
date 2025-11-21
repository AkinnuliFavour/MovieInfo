import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Movie } from "../../types/movie";
import Nav from "../../components/Nav";
import MovieCard from "../../components/ui/MovieCard";
import { Calendar, MapPin, User } from "lucide-react";

interface ActorDetails {
  id: number;
  name: string;
  biography: string;
  birthday: string;
  place_of_birth: string;
  profile_path: string;
  known_for_department: string;
}

interface ActorCredits {
  cast: (Movie & { character: string })[];
}

const ActorProfile = () => {
  const { id } = useParams();
  const [actor, setActor] = useState<ActorDetails>();
  const [credits, setCredits] = useState<ActorCredits>();
  const [activeTab, setActiveTab] = useState<"bio" | "filmography">("bio");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [actorRes, creditsRes] = await Promise.all([
          axios.get(
            `https://api.themoviedb.org/3/person/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`
          ),
          axios.get(
            `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`
          ),
        ]);
        setActor(actorRes.data);
        setCredits(creditsRes.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!actor) return null;

  return (
    <main className="min-h-screen bg-background text-white font-sans pb-20">
      <Nav />
      
      {/* Hero Section */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-background z-10" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 z-0" />
        
        <div className="container mx-auto px-6 relative z-20 h-full flex flex-col justify-end pb-12">
          <div className="flex flex-col md:flex-row items-end gap-8 animate-fade-in-up">
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white/10 shadow-glow shrink-0">
              <img
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt={actor.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mb-4">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-glow">{actor.name}</h1>
              <div className="flex flex-wrap gap-4 text-gray-300">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  <span>{actor.known_for_department}</span>
                </div>
                {actor.birthday && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>Born {actor.birthday}</span>
                  </div>
                )}
                {actor.place_of_birth && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{actor.place_of_birth}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 mt-8">
        <div className="flex gap-6 mb-8 border-b border-white/10">
          <button
            onClick={() => setActiveTab("bio")}
            className={`pb-4 px-2 font-medium text-lg transition-all relative ${
              activeTab === "bio" ? "text-primary" : "text-gray-400 hover:text-white"
            }`}
          >
            Biography
            {activeTab === "bio" && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary shadow-glow" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("filmography")}
            className={`pb-4 px-2 font-medium text-lg transition-all relative ${
              activeTab === "filmography" ? "text-primary" : "text-gray-400 hover:text-white"
            }`}
          >
            Filmography
            {activeTab === "filmography" && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary shadow-glow" />
            )}
          </button>
        </div>

        {activeTab === "bio" ? (
          <div className="max-w-4xl animate-fade-in-up">
            <h2 className="text-2xl font-bold mb-6 text-primary">About</h2>
            <p className="text-lg leading-relaxed text-gray-300 whitespace-pre-line">
              {actor.biography || "No biography available."}
            </p>
          </div>
        ) : (
          <div className="animate-fade-in-up">
            <h2 className="text-2xl font-bold mb-6 text-primary">Known For</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {credits?.cast
                .sort((a, b) => b.popularity - a.popularity)
                .slice(0, 20)
                .map((movie, index) => (
                  <div key={movie.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                    <MovieCard 
                        id={movie.id}
                        title={movie.title}
                        posterPath={movie.poster_path}
                        rating={movie.vote_average}
                        year={movie.release_date?.split('-')[0] || 'N/A'}
                    />
                    <p className="mt-2 text-sm text-gray-400 text-center">
                      as <span className="text-white">{movie.character}</span>
                    </p>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ActorProfile;

