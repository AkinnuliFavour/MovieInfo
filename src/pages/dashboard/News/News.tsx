import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Newspaper, ArrowLeft, AlertCircle } from "lucide-react";
import Button from "../../../components/ui/Button";
import Pagination from "../../../components/Pagination";
import api from "../../../api/api";

import NewsCard from "../components/NewsCard";
import SingleNewsPage from "./SingleNewsPage";

export interface NewsData {
  status: string;
  totalResults: number;
  articles: {
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
  }[];
}

const News = () => {
  const [showNewsDetails, setShowNewsDetails] = useState(false);
  const [NewsUrl, setNewsUrl] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 16;

  const {
    data: newsData,
    isLoading,
    error,
    refetch,
  } = useQuery<NewsData>({
    queryKey: ["movie-news"],
    queryFn: async () => {
      const response = await api.get("/api/news/movies");
      return response.data;
    },
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 24 * 60 * 60 * 1000, // 24 hours (formerly cacheTime)
  });

  function handleNewsClick(url: string) {
    setNewsUrl(url);
    setShowNewsDetails(true);
  }

  function handleBackClick() {
    setShowNewsDetails(false);
    setNewsUrl("");
  }

  const latestNews = newsData?.articles?.sort((a, b) => {
    return (
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  });

  const totalArticles = latestNews?.length || 0;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageArticles = latestNews?.slice(startIndex, endIndex);

  const clickedNews = newsData?.articles.find((news) => news.url === NewsUrl);

  return (
    <>
      {!showNewsDetails && (
        <div className="mb-8 flex items-center gap-4 animate-fade-in-up">
          <div className="p-3 rounded-xl bg-primary/10 text-primary shadow-glow">
            <Newspaper className="h-8 w-8" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white">Movie News</h1>
            <p className="text-gray-400 mt-1">
              Stay updated with the latest in cinema
            </p>
          </div>
          {error && (
            <Button
              variant="outline"
              onClick={() => refetch()}
              icon={<AlertCircle className="h-4 w-4" />}
              className="border-primary text-primary hover:bg-primary/10"
            >
              Retry
            </Button>
          )}
        </div>
      )}

      {error && newsData && (
        <div className="mb-6 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-yellow-500" />
          <p className="text-yellow-200 text-sm">
            Showing cached data. Unable to load latest news.
          </p>
        </div>
      )}

      {showNewsDetails && clickedNews ? (
        <div className="animate-fade-in-up">
          <Button
            variant="ghost"
            onClick={handleBackClick}
            icon={<ArrowLeft className="h-4 w-4" />}
            className="mb-6 text-white hover:bg-white/10"
          >
            Back to News
          </Button>
          <SingleNewsPage
            news={clickedNews}
            showNewsDetails={showNewsDetails}
          />
        </div>
      ) : isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="w-full h-[420px] bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden animate-pulse"
            >
              <div className="w-full h-[260px] bg-white/10" />
              <div className="p-4 space-y-3">
                <div className="h-6 bg-white/10 rounded w-3/4" />
                <div className="h-4 bg-white/10 rounded w-full" />
                <div className="h-4 bg-white/10 rounded w-5/6" />
              </div>
            </div>
          ))}
        </div>
      ) : error && !newsData ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <AlertCircle className="h-16 w-16 text-primary mb-4" />
          <h3 className="text-2xl font-bold mb-2 text-white">
            Unable to load news
          </h3>
          <p className="text-gray-400 mb-6">
            Please check your connection and try again
          </p>
          <Button
            onClick={() => refetch()}
            className="bg-primary hover:bg-primary/90"
          >
            Retry
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {currentPageArticles?.map(
              (news: NewsData["articles"][0], index: number) => (
                <div
                  key={index}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <NewsCard news={news} handleNewsClick={handleNewsClick} />
                </div>
              )
            )}
          </div>

          {totalArticles > itemsPerPage && (
            <Pagination
              page={page}
              setPage={setPage}
              totalMovies={totalArticles}
            />
          )}
        </>
      )}
    </>
  );
};

export default News;
