import axios from "axios";

export default axios.create({
  baseURL: "https://api.themoviedb.org/3/genre/movie/list?language=en",
});