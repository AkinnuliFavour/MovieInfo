import axios from "axios";
import { useEffect, useState } from "react";
import { Newspaper, ArrowLeft } from "lucide-react";
import Button from "../../../components/ui/Button";

import NewsCard from "../components/NewsCard";
import SingleNewsPage from "./SingleNewsPage";

export interface NewsData {
  status: string;
  totalResults: number;
  articles: {
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
  }[];
}

const News = () => {
  const [newsData, setNewsData] = useState<NewsData | null>(null);
  const [showNewsDetails, setShowNewsDetails] = useState(false);
  const [NewsUrl, setNewsUrl] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      const response = await axios.get(
        "https://newsapi.org/v2/everything?q=Movie&from=2024&sortBy=popularity&apiKey=75e98f479be948cebad68ba962e010fe"
      );
      console.log(response.data);
      setNewsData(response.data);
    };
    fetchNews();
  }, []);

  function handleNewsClick(url: string) {
    setNewsUrl(url);
    setShowNewsDetails(true);
  }

  function handleBackClick() {
    setShowNewsDetails(false);
    setNewsUrl("");
  }

  const latestNews = newsData?.articles.sort((a, b) => {
    return (
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  });

  const firstPage = latestNews?.slice(0, 16);

  const clickedNews = newsData?.articles.find((news) => news.url === NewsUrl);

  // const firstPage = newsData?.articles.slice(0, 16);

  return (
    <>
      {!showNewsDetails && (
        <div className="mb-8 flex items-center gap-4 animate-fade-in-up">
          <div className="p-3 rounded-xl bg-primary/10 text-primary shadow-glow">
            <Newspaper className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Movie News</h1>
            <p className="text-gray-400 mt-1">
              Stay updated with the latest in cinema
            </p>
          </div>
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
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {firstPage?.map((news, index) => (
            <div
              key={index}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <NewsCard news={news} handleNewsClick={handleNewsClick} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default News;
