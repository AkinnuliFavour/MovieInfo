import Logo from "../../../assets/logo-dark-text.png";
import { Link } from "react-router-dom";

const Nav = ({ showMenu }: { showMenu: boolean }) => {
  return (
    <nav
      className={`${
        showMenu ? "" : "hidden"
      } lg:block fixed left-0 top-0 bg-white bg-blend-multiply md:w-1/6 w-1/2 h-full z-1 border-r-0`}
    >
      <img src={Logo} alt="" className="mt-5 ml-6 hidden lg:block invisible" />

      <ul className="h-full flex flex-col justify-around">
        <Link to="/dashboard" className="px-6">
          {/* <img src="../../assets/Icons/Home.svg" alt="" /> */}
          <p className="py-4 rounded-md hover:text-center hover:bg-rose-600 hover:text-white hover:cursor-pointer">
            Dashboard
          </p>
        </Link>
        <Link to="/dashboard/watchlist" className="px-6">
          <img src="../../assets/Icons/Calendar.svg" alt="" />
          <p className="py-4 rounded-md hover:text-center hover:bg-rose-600 hover:text-white hover:cursor-pointer">
            Watchlist
          </p>
        </Link>
        <Link to="/dashboard/forums" className="px-6">
          {/* <img src="../../assets/Icons/Settings.svg" alt="" /> */}
          <p className="py-4 rounded-md hover:text-center hover:bg-rose-600 hover:text-white hover:cursor-pointer">
            Forums
          </p>
        </Link>
        <Link to="/dashboard/news" className="px-6">
          {/* <img src="../../assets/Icons/Settings.svg" alt="" /> */}
          <p className="py-4 rounded-md hover:text-center hover:bg-rose-600 hover:text-white hover:cursor-pointer">
            News
          </p>
        </Link>
        <Link to="/dashboard/settings" className="px-6">
          <p className="py-4 rounded-md hover:text-center hover:bg-rose-600 hover:text-white hover:cursor-pointer">
            Settings
          </p>
        </Link>
        <Link to="/logout" className="px-6">
          {/* <img src="../../assets/Icons/Settings.svg" alt="" /> */}
          <p className="py-4 rounded-md hover:text-center hover:bg-rose-600 hover:text-white hover:cursor-pointer">
            Logout
          </p>
        </Link>
        <li>{/* <p>Settings</p> */}</li>
      </ul>
    </nav>
  );
};

export default Nav;
