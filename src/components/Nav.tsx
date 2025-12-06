import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Button from "./ui/Button";
import Input from "./ui/Input";
import {
  Search,
  Menu,
  X,
  LayoutGrid,
  Bookmark,
  // MessageSquare,
  Newspaper,
  LogOut,
  User,
  ChevronDown,
  SearchIcon,
  Sparkles,
  Calendar,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { getUserInitials, getDisplayName } from "../lib/auth";

const Nav = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
    setShowProfileMenu(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-black/80 backdrop-blur-md shadow-cinematic"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-display font-bold text-white drop-shadow-lg"
          >
            Movie<span className="text-primary">Info</span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden flex-1 max-w-md mx-8 lg:block">
            <Input
              type="search"
              placeholder="Search movies..."
              className="bg-white/10 border-white/10 text-white placeholder:text-white/50 focus:bg-white/20 focus:border-primary/50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<Search className="h-4 w-4 text-white/50" />}
            />
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-4 lg:flex">
            {user ? (
              <>
                {/* Dashboard Links */}
                <Link
                  to="/dashboard"
                  className="text-white/80 hover:text-white transition-colors flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10"
                >
                  <LayoutGrid className="h-4 w-4" />
                  <span className="text-sm font-medium">Dashboard</span>
                </Link>
                <Link
                  to="/dashboard/watchlist"
                  className="text-white/80 hover:text-white transition-colors flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10"
                >
                  <Bookmark className="h-4 w-4" />
                  <span className="text-sm font-medium">Watchlist</span>
                </Link>
                <Link
                  to="/dashboard/explore"
                  className="text-white/80 hover:text-white transition-colors flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10"
                >
                  <SearchIcon className="h-4 w-4" />
                  <span className="text-sm font-medium">Explore</span>
                </Link>
                <Link
                  to="/dashboard/news"
                  className="text-white/80 hover:text-white transition-colors flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10"
                >
                  <Newspaper className="h-4 w-4" />
                  <span className="text-sm font-medium">News</span>
                </Link>

                {/* User Profile Dropdown */}
                <div className="relative" ref={profileMenuRef}>
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm">
                      {getUserInitials(user?.email)}
                    </div>
                    <span className="text-white text-sm font-medium">
                      {getDisplayName(user?.email)}
                    </span>
                    <ChevronDown className="h-4 w-4 text-white/60" />
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-gray-900 rounded-lg shadow-xl border border-white/10 py-2 z-50 backdrop-blur-xl">
                      <div className="px-4 py-3 border-b border-white/10">
                        <p className="text-sm font-medium text-white">
                          {getDisplayName(user?.email)}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {user?.email}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          navigate("/dashboard");
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-white/5 transition-colors"
                      >
                        <User className="h-4 w-4" />
                        Profile
                      </button>
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          navigate("/dashboard/recommendations");
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-white/5 transition-colors"
                      >
                        <Sparkles className="h-4 w-4" />
                        Recommendations
                      </button>
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          navigate("/dashboard/calendar");
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-white/5 transition-colors"
                      >
                        <Calendar className="h-4 w-4" />
                        Release Calendar
                      </button>
                      <div className="h-px bg-white/10 my-2"></div>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-white/10"
                  >
                    Log in
                  </Button>
                </Link>
                <Link to="/sign-up">
                  <Button variant="primary" className="shadow-glow">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl lg:hidden pt-24 px-6">
          <div className="flex flex-col gap-6">
            <Input
              type="search"
              placeholder="Search movies..."
              className="bg-white/10 border-white/10 text-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<Search className="h-4 w-4 text-white/50" />}
            />
            <div className="flex flex-col gap-4">
              {user ? (
                <>
                  {/* Mobile Dashboard Links */}
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <LayoutGrid className="h-5 w-5 text-primary" />
                    <span className="text-white font-medium">Dashboard</span>
                  </Link>
                  <Link
                    to="/dashboard/watchlist"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <Bookmark className="h-5 w-5 text-primary" />
                    <span className="text-white font-medium">Watchlist</span>
                  </Link>
                  <Link
                    to="/dashboard/explore"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <Search className="h-5 w-5 text-primary" />
                    <span className="text-white font-medium">Explore</span>
                  </Link>
                  <Link
                    to="/dashboard/news"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <Newspaper className="h-5 w-5 text-primary" />
                    <span className="text-white font-medium">News</span>
                  </Link>
                  <Link
                    to="/dashboard/recommendations"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <Sparkles className="h-5 w-5 text-primary" />
                    <span className="text-white font-medium">
                      Recommendations
                    </span>
                  </Link>
                  <Link
                    to="/dashboard/calendar"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <Calendar className="h-5 w-5 text-primary" />
                    <span className="text-white font-medium">
                      Release Calendar
                    </span>
                  </Link>

                  {/* Mobile User Profile */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 mb-3">
                      <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                        {getUserInitials(user?.email)}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium text-sm">
                          {getDisplayName(user?.email)}
                        </p>
                        <p className="text-gray-400 text-xs truncate">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors text-red-400"
                    >
                      <LogOut className="h-5 w-5" />
                      <span className="font-medium">Sign Out</span>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      variant="ghost"
                      className="w-full text-white justify-start"
                    >
                      Log in
                    </Button>
                  </Link>
                  <Link
                    to="/sign-up"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button
                      variant="primary"
                      className="w-full justify-start shadow-glow"
                    >
                      Sign up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
