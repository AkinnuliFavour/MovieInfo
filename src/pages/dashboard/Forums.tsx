import { ReactComponent as Search } from "../../assets/Icons/Search.svg";

const Forums = () => {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search the Community ..."
            name=""
            id=""
            className="lg:w-96 px-5 py-5  rounded-md outline-none bg-white border border-black"
          />
          <Search className="absolute top-1/2 transform -translate-y-1/2 right-5 h-5 w-5 text-black" />
        </div>
      </div>
    </>
  );
};

export default Forums;
