import React from "react";
import { News } from "../components/NewsCard";
import { formatDate, breakIntoParagraphs } from "../../../lib/utils";
import { getFullArticle } from "../../../lib/getArticle";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api/api";
import { useQuery } from "@tanstack/react-query";

const SingleNewsPage = ({
  news,
  showNewsDetails,
}: {
  news: News;
  showNewsDetails: boolean;
}) => {
  const fetchArticle = async (): Promise<string> => {
    const response = await api.get(`/article/${news.url}`);
    return response.data;
  };

  const { data, isLoading, error } = useQuery<string, Error>({
    queryKey: ["article"],
    queryFn: fetchArticle,
  });

  const paragraphs = data && breakIntoParagraphs(data);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  console.log(data);

  return (
    <div className="px-4 lg:px-52 font-serif">
      <h1 className="text-center font-bold text-xl lg:text-5xl lg:text-left">
        {news.title}
      </h1>
      <div className="">
        <img src={news.urlToImage} alt="" className="mt-8" />
      </div>
      <div className="mt-8">
        <hr className="border-t-2 border-t-black mb-2" />
        <h3 className="text-lg font-bold">{news.title}</h3>
        <div className="flex gap-4">
          <p className="text-rose-500">
            <span className="text-black">Author:</span> {news.author}
          </p>
          <p className="text-rose-500">
            <span className="text-black">Date of Publish:</span>{" "}
            {formatDate(news.publishedAt)}
          </p>
          {/* <p>Source: {news.news.source.name}</p> */}
        </div>
        <hr className="border-t-2 border-t-black mt-2" />
      </div>
      <article className="mt-4 text-xl leading-relaxed">
        {paragraphs &&
          showNewsDetails &&
          paragraphs.map((paragraph, index) => (
            <p key={index} className="mt-6">
              {paragraph}
            </p>
          ))}
      </article>
    </div>
  );
};

export default SingleNewsPage;
