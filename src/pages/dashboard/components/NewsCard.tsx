import { formatDate } from "../../../lib/utils";

export interface News {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

const NewsCard = ({
  news,
  handleNewsClick,
}: {
  news: News;
  handleNewsClick: (url: string) => void;
}) => {
  return (
    <article
      className="group cursor-pointer w-full h-[420px] bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-glow hover:border-primary/50 animate-fade-in-up"
      onClick={() => handleNewsClick(news.url)}
    >
      <div className="relative w-full h-[260px] bg-gray-800 overflow-hidden">
        <div
          className="absolute inset-0 bg-no-repeat bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{
            backgroundImage: `url(${news.urlToImage})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />

        {/* Source Badge */}
        {news.source?.name && (
          <div className="absolute top-3 right-3 px-3 py-1 bg-primary/90 backdrop-blur-sm rounded-full">
            <p className="text-xs font-semibold text-white">
              {news.source.name}
            </p>
          </div>
        )}
      </div>

      <div className="p-4 space-y-2">
        <h3
          className="text-white font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors"
          data-testid="movie-title"
        >
          {news.title}
        </h3>

        {news.description && (
          <p className="text-gray-400 text-sm line-clamp-2">
            {news.description}
          </p>
        )}

        <div className="flex items-center justify-between pt-2 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {formatDate(news.publishedAt)}
          </span>
          {news.author && (
            <span className="line-clamp-1 max-w-[120px]" title={news.author}>
              {news.author}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
