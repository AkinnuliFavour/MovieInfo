// import { useState } from 'react'
import Home from "./pages/home/Home";
import TopRated from "./pages/top-rated/TopRated";
import SingleMovie from "./pages/single-movie/SingleMovie";
import NowPlaying from "./pages/now-playing/NowPlaying";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Upcoming from "./pages/upcoming/Upcoming";
import Search from "./pages/search/Search";
import Signup from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardLayout from "./pages/dashboard/layouts/DashboardLayout";
import Forums from "./pages/dashboard/Forums";
import News from "./pages/dashboard/News/News";
// import Settings from "./pages/settings/Settings";
import Watchlist from "./pages/dashboard/Watchlist";
import Recommendations from "./pages/recommendations/Recommendations";
import ActorProfile from "./pages/actor/ActorProfile";
import ReleaseCalendar from "./pages/calendar/ReleaseCalendar";
import Explore from "./pages/explore/Explore";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastProvider } from "./contexts/ToastContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicOnlyRoute from "./components/PublicOnlyRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/top-rated" element={<TopRated />} />
              <Route path="/now-playing" element={<NowPlaying />} />
              <Route path="/upcoming" element={<Upcoming />} />
              <Route path="/search/:title" element={<Search />} />
              <Route path="/movie-details/:id" element={<SingleMovie />} />
              <Route path="/actor/:id" element={<ActorProfile />} />
              <Route
                path="/sign-up"
                element={
                  <PublicOnlyRoute>
                    <Signup />
                  </PublicOnlyRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <PublicOnlyRoute>
                    <Login />
                  </PublicOnlyRoute>
                }
              />
              {/* <Route path="/settings" element={<Settings />} /> */}

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="forums" element={<Forums />} />
                <Route path="news" element={<News />} />
                <Route path="single-news/:url" element={<News />} />
                <Route path="watchlist" element={<Watchlist />} />
                <Route path="recommendations" element={<Recommendations />} />
                <Route path="calendar" element={<ReleaseCalendar />} />
                <Route path="explore" element={<Explore />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
