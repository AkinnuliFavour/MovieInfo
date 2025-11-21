import { ReactComponent as Search } from "../../../assets/Icons/Search.svg";
import { ReactComponent as Menu } from "../../../assets/Icons/Menu alt 4.svg";
import Logo from "../../../assets/logo-dark-text.png";
import { useAuth } from "../../../contexts/AuthContext";
import { getDisplayName, getUserInitials } from "../../../lib/auth";
import { LogOut, User } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const TopBar = ({ toggleMenu }: { toggleMenu: () => void }) => {
  const { user, signOut } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <section className="bg-white/90 backdrop-blur-xl sticky top-0 flex justify-between items-center h-20 px-3 z-20">
      <img src={Logo} alt="" className="hidden lg:block" />
      <Menu
        className="w-[36px] h-[36px] text-black lg:hidden"
        onClick={toggleMenu}
      />
      <div className="relative hidden lg:block">
        <input
          type="text"
          placeholder="Search for Movies"
          name=""
          id=""
          className="lg:w-96 px-2 py-2 pl-10 rounded-full outline-none bg-[#F5F6FA]"
        />
        <Search className="absolute top-1/2 transform -translate-y-1/2 left-2 h-5 w-5 text-black" />
      </div>
      <div className="flex items-center gap-4">
        <img
          src="../../assets/Icons/Bell.svg"
          alt=""
          className="hidden lg:block"
        />
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
              {getUserInitials(user?.email)}
            </div>
            <p className="hidden lg:block text-sm font-medium text-gray-700">
              {getDisplayName(user?.email)}
            </p>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-30">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">
                  {getDisplayName(user?.email)}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  // Navigate to profile or settings if needed
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <User className="h-4 w-4" />
                Profile
              </button>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TopBar;
