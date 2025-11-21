import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "./ui/Button";
import Input from "./ui/Input";
import { Search, Menu, X } from "lucide-react";

const Nav = () => {
  const [search, setSearch] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? "bg-black/80 backdrop-blur-md shadow-cinematic" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
          {/* Logo */}
          <Link to="/" className="text-2xl font-display font-bold text-white drop-shadow-lg">
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
            <Link to="/login">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                Log in
              </Button>
            </Link>
            <Link to="/sign-up">
              <Button variant="primary" className="shadow-glow">
                Sign up
              </Button>
            </Link>
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
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full text-white justify-start">
                  Log in
                </Button>
              </Link>
              <Link to="/sign-up" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="primary" className="w-full justify-start shadow-glow">
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
