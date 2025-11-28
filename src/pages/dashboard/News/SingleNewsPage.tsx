import { News } from "../components/NewsCard";
import { formatDate, breakIntoParagraphs } from "../../../lib/utils";
import { AlertCircle } from "lucide-react";
import Button from "../../../components/ui/Button";
import api from "../../../api/api";
import { useQuery } from "@tanstack/react-query";

interface ArticleContent {
  title: string;
  content: string;
  description?: string;
  url: string;
  author?: string;
  publishedAt?: string;
  image?: string;
  siteName?: string;
}

const SingleNewsPage = ({
  news,
  showNewsDetails,
}: {
  news: News;
  showNewsDetails: boolean;
}) => {
  const { data, isLoading, error, refetch } = useQuery<ArticleContent, Error>({
    queryKey: ["article", news.url],
    queryFn: async () => {
      const response = await api.get("/api/news/article", {
        params: { url: news.url },
      });
      return response.data;
    },
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 24 * 60 * 60 * 1000, // 24 hours (formerly cacheTime)
    enabled: showNewsDetails,
  });

  const paragraphs = data?.content ? breakIntoParagraphs(data.content) : [];

  if (isLoading) {
    return (
      <div className="px-4 lg:px-52 animate-pulse">
        <div className="h-12 bg-white/10 rounded w-3/4 mb-8" />
        <div className="h-[400px] bg-white/10 rounded mb-8" />
        <div className="space-y-4">
          <div className="h-4 bg-white/10 rounded w-full" />
          <div className="h-4 bg-white/10 rounded w-5/6" />
          <div className="h-4 bg-white/10 rounded w-4/5" />
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <AlertCircle className="h-16 w-16 text-primary mb-4" />
        <h3 className="text-2xl font-bold mb-2 text-white">
          Unable to load article
        </h3>
        <p className="text-gray-400 mb-6">{error.message}</p>
        <Button
          onClick={() => refetch()}
          className="bg-primary hover:bg-primary/90"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="px-4 lg:px-52 font-serif">
      {error && data && (
        <div className="mb-6 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-yellow-500" />
          <p className="text-yellow-200 text-sm">
            Showing cached article. Unable to load latest version.
          </p>
          <Button
            variant="ghost"
            onClick={() => refetch()}
            className="ml-auto text-yellow-200 hover:text-yellow-100"
          >
            Retry
          </Button>
        </div>
      )}

      <h1 className="text-center font-bold text-xl lg:text-5xl lg:text-left text-white">
        {data?.title || news.title}
      </h1>
      <div className="">
        <img
          src={data?.image || news.urlToImage || ""}
          alt=""
          className="mt-8 rounded-xl"
        />
      </div>
      <div className="mt-8">
        <hr className="border-t-2 border-t-white/20 mb-2" />
        <h3 className="text-lg font-bold text-white">
          {data?.title || news.title}
        </h3>
        <div className="flex gap-4">
          <p className="text-primary">
            <span className="text-gray-400">Author:</span>{" "}
            {data?.author || news.author || "Unknown"}
          </p>
          <p className="text-primary">
            <span className="text-gray-400">Date of Publish:</span>{" "}
            {formatDate(data?.publishedAt || news.publishedAt)}
          </p>
          {data?.siteName && (
            <p className="text-primary">
              <span className="text-gray-400">Source:</span> {data.siteName}
            </p>
          )}
        </div>
        <hr className="border-t-2 border-t-white/20 mt-2" />
      </div>
      <article className="mt-4 text-xl leading-relaxed text-gray-300">
        {paragraphs &&
          showNewsDetails &&
          paragraphs.map((paragraph: string, index: number) => (
            <p key={index} className="mt-6">
              {paragraph}
            </p>
          ))}
      </article>
    </div>
  );
};

export default SingleNewsPage;
