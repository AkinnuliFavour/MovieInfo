import { Movie } from "../types/movie";

export const getWatchlist = (): Movie[] => {
  const watchlist = localStorage.getItem("watchlist");
  return watchlist ? JSON.parse(watchlist) : [];
};

export const addToWatchlist = (movie: Movie) => {
  const watchlist = getWatchlist();
  if (!watchlist.find((m) => m.id === movie.id)) {
    watchlist.push(movie);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }
};

export const removeFromWatchlist = (id: number) => {
  const watchlist = getWatchlist();
  const newWatchlist = watchlist.filter((m) => m.id !== id);
  localStorage.setItem("watchlist", JSON.stringify(newWatchlist));
};

export const isInWatchlist = (id: number): boolean => {
  const watchlist = getWatchlist();
  return !!watchlist.find((m) => m.id === id);
};
