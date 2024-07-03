import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Slider from "../components/Slider";
import TopBar from "../components/TopBar";
import { useState } from "react";

const DashboardLayout = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <main className="bg-[#F5F6FA] min-h-screen max-w-screen z-10">
      <TopBar toggleMenu={toggleMenu} />
      <Nav showMenu={showMenu} />
      <section className="relative lg:ml-[17%] mt-8">
        <Outlet />
      </section>
      {showMenu ? <Slider showMenu={showMenu} toggleMenu={toggleMenu} /> : null}
    </main>
  );
};

export default DashboardLayout;
