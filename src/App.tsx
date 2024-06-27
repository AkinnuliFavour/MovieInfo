// import { useState } from 'react'
import Home from "./pages/home/Home";
import TopRated from "./pages/top-rated/TopRated";
import SingleMovie from "./pages/single-movie/SingleMovie";
import NowPlaying from "./pages/now-playing/NowPlaying";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import Upcoming from "./pages/upcoming/Upcoming";
import Search from "./pages/search/Search";
import Signup from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/top-rated" element={<TopRated />} />
          <Route path="/now-playing" element={<NowPlaying />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/search/:title" element={<Search />} />
          <Route path="/movie-details/:id" element={<SingleMovie />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
