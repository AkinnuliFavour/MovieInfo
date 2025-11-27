import {
  MessageSquare,
  Search,
  TrendingUp,
  Film,
  Award,
  Lightbulb,
  Star,
  MessageCircle,
  ArrowUp,
  Clock,
  Eye,
} from "lucide-react";
import Input from "../../components/ui/Input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";

// Mock data - replace with real API calls
const CATEGORIES = [
  {
    id: "latest-releases",
    name: "Latest Releases",
    description: "Discuss the newest movies hitting theaters and streaming",
    icon: Film,
    color: "from-blue-500 to-cyan-500",
    posts: 1247,
    activeUsers: 234,
  },
  {
    id: "genre-discussion",
    name: "Genre Deep Dives",
    description: "Explore your favorite genres from horror to rom-coms",
    icon: Star,
    color: "from-purple-500 to-pink-500",
    posts: 2156,
    activeUsers: 189,
  },
  {
    id: "awards-season",
    name: "Awards & Festivals",
    description: "Oscars, Golden Globes, Cannes, and more",
    icon: Award,
    color: "from-yellow-500 to-orange-500",
    posts: 834,
    activeUsers: 156,
  },
  {
    id: "fan-theories",
    name: "Fan Theories",
    description: "Share your wildest theories and plot analyses",
    icon: Lightbulb,
    color: "from-green-500 to-emerald-500",
    posts: 1678,
    activeUsers: 267,
  },
];

const TRENDING_DISCUSSIONS = [
  {
    id: "1",
    title: "Dune: Part Two - Visual Masterpiece or Overrated?",
    movieTitle: "Dune: Part Two",
    moviePoster: "/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
    category: "Latest Releases",
    author: "CinemaFan92",
    upvotes: 342,
    replies: 89,
    views: 1247,
    timeAgo: "2 hours ago",
    hasSpoilers: true,
  },
  {
    id: "2",
    title: "The ending of Inception explained - My theory",
    movieTitle: "Inception",
    moviePoster: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    category: "Fan Theories",
    author: "NolanFanatic",
    upvotes: 567,
    replies: 234,
    views: 3421,
    timeAgo: "5 hours ago",
    hasSpoilers: true,
  },
  {
    id: "3",
    title: "Best Horror Movies of 2024 - Let's discuss",
    movieTitle: "Various",
    moviePoster: null,
    category: "Genre Discussion",
    author: "HorrorLover",
    upvotes: 198,
    replies: 67,
    views: 892,
    timeAgo: "1 day ago",
    hasSpoilers: false,
  },
  {
    id: "4",
    title: "Oscar Predictions: Who will win Best Picture?",
    movieTitle: "Various",
    moviePoster: null,
    category: "Awards Season",
    author: "FilmCritic",
    upvotes: 421,
    replies: 156,
    views: 2134,
    timeAgo: "3 hours ago",
    hasSpoilers: false,
  },
];

const Forums = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  const filteredDiscussions = selectedCategory
    ? TRENDING_DISCUSSIONS.filter(
        (d) => d.category.toLowerCase().replace(/\s/g, "-") === selectedCategory
      )
    : TRENDING_DISCUSSIONS;

  return (
    <>
      {/* Header */}
      <div className="mb-8 animate-fade-in-up">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-xl bg-primary/10 text-primary shadow-glow">
            <MessageSquare className="h-8 w-8" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white">Movie Forums</h1>
            <p className="text-gray-400 mt-1">
              Join the conversation with fellow movie enthusiasts
            </p>
          </div>
          <Button variant="primary" className="hidden sm:flex">
            Start Discussion
          </Button>
        </div>
      </div>

      {/* Search */}
      <div
        className="mb-8 animate-fade-in-up"
        style={{ animationDelay: "100ms" }}
      >
        <Input
          type="search"
          placeholder="Search movies, discussions, or topics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          icon={<Search className="h-4 w-4" />}
        />
      </div>

      {/* Categories Grid */}
      <div
        className="mb-12 animate-fade-in-up"
        style={{ animationDelay: "200ms" }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <div className="h-8 w-1 bg-primary rounded-full"></div>
            Browse by Category
          </h2>
          {selectedCategory && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className="text-gray-400 hover:text-white"
            >
              Clear Filter
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((category, index) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() =>
                  setSelectedCategory(isSelected ? null : category.id)
                }
                className={`group relative p-6 rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                  isSelected
                    ? "ring-2 ring-primary shadow-glow"
                    : "hover:shadow-lg"
                } animate-fade-in-up`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10 group-hover:opacity-20 transition-opacity`}
                ></div>
                <div className="relative">
                  <div
                    className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${category.color} mb-4 text-white shadow-lg`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" />
                      {category.posts.toLocaleString()} posts
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {category.activeUsers} active
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Trending Discussions */}
      <div className="animate-fade-in-up" style={{ animationDelay: "300ms" }}>
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-white">
            {selectedCategory ? "Filtered Discussions" : "Trending Discussions"}
          </h2>
        </div>

        <div className="space-y-4">
          {filteredDiscussions.map((discussion, index) => (
            <div
              key={discussion.id}
              onClick={() => navigate(`/forums/thread/${discussion.id}`)}
              className="group cursor-pointer p-6 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-300 hover:shadow-glow backdrop-blur-sm animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex gap-4">
                {/* Movie Poster Thumbnail */}
                {discussion.moviePoster && (
                  <div className="hidden sm:block flex-shrink-0">
                    <div className="w-16 h-24 rounded-lg overflow-hidden bg-white/5">
                      <img
                        src={`https://image.tmdb.org/t/p/w200${discussion.moviePoster}`}
                        alt={discussion.movieTitle}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors mb-1 line-clamp-2">
                        {discussion.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400">
                        <span className="font-medium text-gray-300">
                          {discussion.author}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {discussion.timeAgo}
                        </span>
                        <span>•</span>
                        <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs">
                          {discussion.category}
                        </span>
                        {discussion.hasSpoilers && (
                          <>
                            <span>•</span>
                            <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-xs">
                              Spoilers
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6 text-sm text-gray-500 mt-4">
                    <span className="flex items-center gap-2 hover:text-primary transition-colors">
                      <ArrowUp className="h-4 w-4" />
                      {discussion.upvotes}
                    </span>
                    <span className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      {discussion.replies} replies
                    </span>
                    <span className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      {discussion.views.toLocaleString()} views
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDiscussions.length === 0 && (
          <div className="text-center py-16">
            <MessageSquare className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              No discussions found
            </h3>
            <p className="text-gray-400">
              Try selecting a different category or start a new discussion
            </p>
          </div>
        )}
      </div>

      {/* Mobile FAB */}
      <Button
        variant="primary"
        className="sm:hidden fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-glow-lg z-50"
        size="icon"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    </>
  );
};

export default Forums;
