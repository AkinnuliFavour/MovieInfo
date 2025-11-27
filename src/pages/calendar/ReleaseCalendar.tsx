import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Calendar as CalendarIcon,
  List,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Movie } from "../../types/movie";
// import Nav from '../../components/Nav';

const ReleaseCalendar = () => {
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [view, setView] = useState<"calendar" | "list">("calendar");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcoming = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=1`
        );
        setUpcomingMovies(res.data.results);
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUpcoming();
  }, []);

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const getMoviesForDate = (day: number) => {
    return upcomingMovies.filter((movie) => {
      const date = new Date(movie.release_date);
      return (
        date.getDate() === day &&
        date.getMonth() === currentMonth.getMonth() &&
        date.getFullYear() === currentMonth.getFullYear()
      );
    });
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  return (
    <main className="min-h-screen bg-background text-white font-sans selection:bg-primary/30">
      {/* <Nav /> */}

      <div className="container mx-auto px-6 pt-24 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 animate-fade-in-up">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <CalendarIcon className="h-8 w-8 text-primary" />
              Release Calendar
            </h1>
            <p className="text-gray-400 mt-1">Track upcoming movie releases</p>
          </div>

          <div className="flex bg-white/5 rounded-lg p-1 backdrop-blur-sm border border-white/10">
            <button
              onClick={() => setView("calendar")}
              className={`px-4 py-2 rounded-md transition-all flex items-center gap-2 ${
                view === "calendar"
                  ? "bg-primary text-white shadow-glow"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <CalendarIcon className="h-4 w-4" />
              Calendar
            </button>
            <button
              onClick={() => setView("list")}
              className={`px-4 py-2 rounded-md transition-all flex items-center gap-2 ${
                view === "list"
                  ? "bg-primary text-white shadow-glow"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <List className="h-4 w-4" />
              List
            </button>
          </div>
        </div>

        <div
          className="flex justify-between items-center mb-8 bg-white/5 p-4 rounded-2xl backdrop-blur-md border border-white/10 animate-fade-in-up"
          style={{ animationDelay: "100ms" }}
        >
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-primary"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h2 className="text-xl font-bold text-white">
            {currentMonth.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-primary"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {loading ? (
          <div className="h-96 w-full animate-pulse rounded-xl bg-white/5" />
        ) : view === "calendar" ? (
          <div
            className="grid grid-cols-7 gap-2 md:gap-4 animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="text-center font-medium text-gray-400 py-2 text-sm uppercase tracking-wider"
              >
                {day}
              </div>
            ))}

            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="h-24 md:h-32 bg-white/5 rounded-xl opacity-30 border border-white/5"
              ></div>
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const movies = getMoviesForDate(day);
              const isToday =
                new Date().getDate() === day &&
                new Date().getMonth() === currentMonth.getMonth() &&
                new Date().getFullYear() === currentMonth.getFullYear();

              return (
                <div
                  key={day}
                  className={`min-h-[96px] md:min-h-[128px] bg-white/5 rounded-xl p-2 border transition-all hover:bg-white/10 group relative overflow-hidden ${
                    isToday
                      ? "border-primary/50 shadow-glow-sm"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <span
                    className={`absolute top-2 right-2 text-sm font-bold ${isToday ? "text-primary" : "text-gray-500 group-hover:text-gray-300"}`}
                  >
                    {day}
                  </span>
                  <div className="mt-6 space-y-1.5 max-h-[80px] overflow-y-auto custom-scrollbar">
                    {movies.map((movie) => (
                      <Link
                        key={movie.id}
                        to={`/movie-details/${movie.id}`}
                        className="block text-xs bg-primary/20 text-primary-foreground px-2 py-1 rounded truncate hover:bg-primary/40 transition-colors border border-primary/10"
                        title={movie.title}
                      >
                        {movie.title}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div
            className="space-y-4 animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            {upcomingMovies
              .filter((m) => {
                const d = new Date(m.release_date);
                return (
                  d.getMonth() === currentMonth.getMonth() &&
                  d.getFullYear() === currentMonth.getFullYear()
                );
              })
              .sort(
                (a, b) =>
                  new Date(a.release_date).getTime() -
                  new Date(b.release_date).getTime()
              )
              .map((movie, idx) => (
                <div
                  key={movie.id}
                  className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="w-16 h-24 bg-gray-800 rounded-lg overflow-hidden shrink-0 shadow-lg">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-white group-hover:text-primary transition-colors">
                      {movie.title}
                    </h3>
                    <p className="text-gray-400 flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      {new Date(movie.release_date).toLocaleDateString(
                        undefined,
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                      {movie.overview}
                    </p>
                  </div>
                  <Link
                    to={`/movie-details/${movie.id}`}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all shadow-glow opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0"
                  >
                    Details
                  </Link>
                </div>
              ))}
            {upcomingMovies.filter((m) => {
              const d = new Date(m.release_date);
              return (
                d.getMonth() === currentMonth.getMonth() &&
                d.getFullYear() === currentMonth.getFullYear()
              );
            }).length === 0 && (
              <div className="text-center py-12 text-gray-400">
                No upcoming releases found for this month.
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default ReleaseCalendar;
