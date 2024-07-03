import Logo from "../../../assets/logo-dark-text.png";

const Nav = ({ showMenu }: { showMenu: boolean }) => {
  return (
    <nav
      className={`${
        showMenu ? "" : "hidden"
      } lg:block fixed left-0 top-0 bg-white md:w-1/6 w-1/2 h-full z-1`}
    >
      <img src={Logo} alt="" className="mt-5 ml-6 hidden lg:block" />

      <ul className="h-full flex flex-col justify-around">
        <li className="px-6">
          {/* <img src="../../assets/Icons/Home.svg" alt="" /> */}
          <p className="py-4 rounded-md hover:text-center hover:bg-rose-600 hover:text-white hover:cursor-pointer">
            Dashboard
          </p>
        </li>
        <li className="px-6">
          <img src="../../assets/Icons/Calendar.svg" alt="" />
          <p className="py-4 rounded-md hover:text-center hover:bg-rose-600 hover:text-white hover:cursor-pointer">
            Watchlist
          </p>
        </li>
        <li className="px-6">
          {/* <img src="../../assets/Icons/Settings.svg" alt="" /> */}
          <p className="py-4 rounded-md hover:text-center hover:bg-rose-600 hover:text-white hover:cursor-pointer">
            Forums
          </p>
        </li>
        <li className="px-6">
          {/* <img src="../../assets/Icons/Settings.svg" alt="" /> */}
          <p className="py-4 rounded-md hover:text-center hover:bg-rose-600 hover:text-white hover:cursor-pointer">
            News
          </p>
        </li>
        <li className="px-6">
          {/* <img src="../../assets/Icons/Settings.svg" alt="" /> */}
          <p className="py-4 rounded-md hover:text-center hover:bg-rose-600 hover:text-white hover:cursor-pointer">
            Stream
          </p>
        </li>
        <li className="px-6">
          <p className="py-4 rounded-md hover:text-center hover:bg-rose-600 hover:text-white hover:cursor-pointer">
            Settings
          </p>
        </li>
        <li>{/* <p>Settings</p> */}</li>
      </ul>
    </nav>
  );
};

export default Nav;
