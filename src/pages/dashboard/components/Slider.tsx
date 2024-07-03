import Nav from "./Nav";

const Slider = ({
  showMenu,
  toggleMenu,
}: {
  showMenu: boolean;
  toggleMenu: () => void;
}) => {
  return (
    <main
      className="bg-black absolute top-0 left-0 opacity-90 z-2 w-screen h-screen"
      onClick={toggleMenu}
    >
      <Nav showMenu={showMenu} />
    </main>
  );
};

export default Slider;
