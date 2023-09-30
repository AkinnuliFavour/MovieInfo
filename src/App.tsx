// import { useState } from 'react'
import Home from "./pages/home/Home"
import SingleMovie from "./pages/single-movie/SingleMovie"
import { HashRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie-details/:id" element={<SingleMovie />} />
      </Routes>
    </HashRouter>
  )
}

export default App
