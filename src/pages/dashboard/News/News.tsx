import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
        "https://newsapi.org/v2/everything?q=Movie&from=2024-07-01&sortBy=popularity&apiKey=75e98f479be948cebad68ba962e010fe"
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
    <main>
      {showNewsDetails && (
        <button className="relative top-2 bg-red-400" onClick={handleBackClick}>
          Back
        </button>
      )}
      {showNewsDetails && clickedNews ? (
        <SingleNewsPage news={clickedNews} showNewsDetails={showNewsDetails} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {firstPage?.map((news, index) => (
            <NewsCard
              key={index}
              news={news}
              handleNewsClick={handleNewsClick}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default News;
