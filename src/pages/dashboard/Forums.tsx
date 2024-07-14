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
            className="w-72 lg:w-96 px-5 py-5 rounded-md outline-none bg-white border border-black"
          />
          <Search className="absolute top-1/2 transform -translate-y-1/2 right-5 h-5 w-5 text-black" />
        </div>
      </div>
      <div className="flex justify-center items-center">
        <h1 className="text-2xl font-bold mt-10">Forums</h1>
      </div>
      <div>
        <div className="flex justify-center items-center mt-10">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-5 px-2 lg:px-0 py-2 border-t border-b border-black">
              <h2 className="text-lg font-bold">General Discussion</h2>
              <p className="text-sm">
                Talk about anything and everything in this board.
              </p>
            </div>
            <div className="flex flex-col gap-5 px-2 lg:px-0 py-2 border-t border-b border-black">
              <h2 className="text-lg font-bold">Movie Discussions</h2>
              <p className="text-sm">
                Talk about movies in this board. Share your thoughts on the
                latest movies.
              </p>
            </div>
            <div className="flex flex-col gap-5 px-2 lg:px-0 py-2 border-t border-b border-black">
              <h2 className="text-lg font-bold">TV Show Discussions</h2>
              <p className="text-sm">
                Talk about TV Shows in this board. Share your thoughts on the
                latest TV Shows.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forums;
