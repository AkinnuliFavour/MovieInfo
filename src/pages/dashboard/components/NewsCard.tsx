import { Link } from "react-router-dom";
import { formatDate } from "../../../lib/utils";

export interface News {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

const NewsCard = ({
  news,
  handleNewsClick,
}: {
  news: News;
  handleNewsClick: (url: string) => void;
}) => {
  return (
    <section
      className="hover:cursor-pointer w-[250px] h-[460px] bg-white shadow-black shadow-sm rounded-lg"
      onClick={() => handleNewsClick(news.url)}
    >
      <div
        className="w-full h-[370px] bg-red-400 bg-no-repeat bg-cover bg-center rounded-lg"
        style={{
          backgroundImage: `url(${news.urlToImage})`,
        }}
      >
        <div className="lg:hidden bg-black bg-opacity-50 h-full w-full rounded-lg">
          <div className="lg:hidden flex justify-center items-center h-full w-full">
            <p className="lg:hidden text-white text-center">{news.title}</p>
          </div>
        </div>

        <div className="lg:hover:bg-black lg:hover:bg-opacity-50 h-full w-full rounded-lg">
          <div className="opacity-0 hover:opacity-100 flex justify-center items-center h-full w-full px-2">
            <p className="text-white text-center">{news.title}</p>
          </div>
        </div>
      </div>
      <div className="p-2">
        <p className="text-gray-400" data-testid="movie-release-date">
          Date of release: {formatDate(news.publishedAt)}
        </p>
        <p className="text-gray-900 line-clamp-1" data-testid="movie-title">
          {news.title}
        </p>
        <p className="text-gray-400 line-clamp-1">Author: {news.author}</p>
      </div>
    </section>
  );
};

export default NewsCard;
