import { ReactComponent as Search } from "../../../assets/Icons/Search.svg";
import { ReactComponent as Menu } from "../../../assets/Icons/Menu alt 4.svg";
import Logo from "../../../assets/logo-dark-text.png";

const TopBar = ({ toggleMenu }: { toggleMenu: () => void }) => {
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
      <div>
        <img src="../../assets/Icons/Bell.svg" alt="" />
        <div className="">
          <img src="../../assets/Icons/Profile.svg" alt="" />
          <p>John Doe</p>
        </div>
      </div>
    </section>
  );
};

export default TopBar;
