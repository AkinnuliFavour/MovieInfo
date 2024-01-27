// import { useState } from 'react'
import Home from "./pages/home/Home"
import TopRated from "./pages/top-rated/TopRated"
import SingleMovie from "./pages/single-movie/SingleMovie"
import NowPlaying from "./pages/now-playing/NowPlaying"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Upcoming from "./pages/upcoming/Upcoming"
import Search from "./pages/search/Search"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/top-rated" element={<TopRated />} />
        <Route path="/now-playing" element={<NowPlaying />} />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/search/:title" element={<Search />} />
        <Route path="/movie-details/:id" element={<SingleMovie />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
