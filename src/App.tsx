// import { useState } from 'react'
import Home from "./pages/home/Home"
import Movies from "./pages/top-rated/TopRated"
import SingleMovie from "./pages/single-movie/SingleMovie"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Upcoming from "./pages/upcoming/Upcoming"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/movie-details/:id" element={<SingleMovie />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
