# MovieInfo Web App User Flow and Interactions

## Overview

MovieInfo is a movie discovery and information web application built with React, TypeScript, and Vite. It provides users with movie details, search functionality, personalized recommendations, and watchlist management. The app integrates with The Movie Database (TMDB) API for comprehensive movie data.

## Main User Flows

### 1. Movie Discovery (Unauthenticated Users)

#### Landing Page Flow

1. **Home Page (`/`)**: User lands on the homepage

   - Displays a featured movie from "Now Playing" with backdrop image
   - Shows movie title, rating, release year, genre, and overview
   - Provides "Watch Trailer" and "More Info" buttons (both lead to movie details)
   - Below: Grid of "Now Playing" movies with pagination option ("See All" link to `/now-playing`)

2. **Movie Card Interaction**
   - Hover effects reveal rating, year, and genre
   - Click on any movie card → Navigate to `/movie-details/:id`

#### Navigation and Search

3. **Search Functionality**
   - Search bar in navigation (desktop and mobile)
   - Enter movie title → Navigate to `/search/:title`
   - Search results page displays matching movies in grid format
   - No results: Shows empty state with suggestion to browse trending movies

#### Browse Categories

4. **Category Pages**
   - **Now Playing** (`/now-playing`): Current theatrical releases
   - **Top Rated** (`/top-rated`): Highest rated movies
   - **Upcoming** (`/upcoming`): Soon-to-be-released movies
   - All display movies in responsive grid with MovieCard components

#### Explore Page

5. **Advanced Discovery** (`/dashboard/explore` or `/explore`)
   - Filter by mood (Feel-good, Dark, Adrenaline, Heartwarming, Mind-bending)
   - Filter by genre (all TMDB genres available)
   - Default: Shows trending movies
   - Filters are mutually exclusive (selecting one clears the other)
   - Results update dynamically based on selection

### 2. Movie Details and Interaction

#### Single Movie Page (`/movie-details/:id`)

1. **Movie Information Display**

   - Hero section with backdrop, title, tagline, genres, rating, release year, runtime, director
   - "Watch Trailer" button: Opens YouTube trailer in new tab
   - "Add to Watchlist" button: Toggles movie in local storage watchlist
   - Share button (UI only, no functionality implemented)

2. **Content Sections**

   - **Storyline**: Full movie overview
   - **Top Cast**: Displays up to 6 cast members with profile images (not clickable)
   - **Reviews**: User reviews and ratings component
   - **Movie Info Sidebar**: Additional details (original title, status, language, budget/revenue - mostly N/A)
   - **Similar Movies**: Grid of recommended movies

3. **Cast Interaction**
   - Cast members displayed but not linked to individual actor pages
   - Actor profile route exists (`/actor/:id`) but not integrated in movie details

### 3. Authentication Flow

#### Sign Up/Login Process

1. **Access Authentication** (`/sign-up`, `/login`)

   - Clean form interfaces with email/password fields
   - Google sign-in button (UI only, not functional)
   - "Forgot password" link (leads to `/reset` - not implemented)
   - Successful login → Redirect to `/dashboard`

2. **Post-Authentication**
   - Navigation changes (login/signup buttons replaced)
   - Access to dashboard features

### 4. Dashboard Features (Authenticated Users)

#### Main Dashboard (`/dashboard`)

- Displays action movies by default
- Pagination for browsing more movies
- MovieCard interactions same as public pages

#### Watchlist Management (`/dashboard/watchlist`)

1. **View Watchlist**

   - Shows all saved movies in grid format
   - Displays count of saved movies
   - Empty state with call-to-action to discover movies

2. **Manage Watchlist**
   - Hover over movie card reveals remove button (trash icon)
   - Click remove → Movie deleted from watchlist and local storage
   - Real-time UI update

#### Additional Dashboard Pages

- **Forums** (`/dashboard/forums`): Community discussion (implementation details not visible)
- **News** (`/dashboard/news`): Movie news and articles
  - Single news page (`/dashboard/single-news/:url`)
- **Recommendations** (`/dashboard/recommendations`): Personalized movie suggestions
- **Release Calendar** (`/dashboard/calendar`): Upcoming movie releases

### 5. Technical Interactions

#### Data Management

- **API Integration**: TMDB API for all movie data
- **Local Storage**: Watchlist persistence using browser localStorage
- **State Management**: React Query for server state, local state for UI
- **Error Handling**: Basic error logging, loading states with skeletons

#### UI/UX Patterns

- **Responsive Design**: Mobile-first approach with breakpoints
- **Loading States**: Skeleton loaders for movie grids
- **Animations**: Fade-in animations with staggered delays
- **Navigation**: Fixed header with scroll effects, mobile hamburger menu
- **Theming**: Dark theme with primary color accents

#### Search and Navigation

- **URL-based Search**: Search terms in URL params
- **Client-side Routing**: React Router for SPA navigation
- **Back/Forward**: Browser navigation supported

## User Journey Examples

### Example 1: New User Discovery

1. Land on home page
2. Browse "Now Playing" movies
3. Click on interesting movie → View details
4. Add to watchlist
5. Sign up to access dashboard
6. View watchlist in dashboard

### Example 2: Targeted Search

1. Use search bar to find specific movie
2. Browse search results
3. Click movie → View details
4. Explore similar movies
5. Use explore page to find movies by mood/genre

### Example 3: Watchlist Management

1. Login to dashboard
2. Navigate to watchlist
3. Remove unwanted movies
4. Use explore to find new movies to add

## Current Limitations and Notes

- Actor profiles exist but not linked from movie details
- Google sign-in and password reset not implemented
- Reviews component exists but implementation details not visible
- Some dashboard features (forums, news, recommendations) have minimal visible implementation
- No user profiles or account management beyond login
- Watchlist is local storage only (not synced to server)</content>
  <parameter name="filePath">c:\Users\HP\Documents\movie-info\frontend\MovieInfo\USER_FLOW.md
