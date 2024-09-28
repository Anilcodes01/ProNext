"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import ArticleCard from "@/components/articleCard";
import AllArticleSkeleton from "./allArticleSkeleton";

interface Article {
  id: string;
  title: string;
  content: string;
  description: string;
  image?: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: {
    name: string;
    avatarUrl?: string | null;
  };
}

export default function ArticleList() {
  const [error, setError] = useState<string | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get("/api/articles/fetchArticle");
      if (
        response.data.getArticles &&
        Array.isArray(response.data.getArticles)
      ) {
        setArticles(response.data.getArticles);
      } else {
        setError("Unexpected data structure received from server");
      }
    } catch (error) {
      console.log("Failed to fetch articles. Please try again later.", error);
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="mt-8">
      {articles.length > 0 ? (
        articles.map((article) => (
          <Link key={article.id} href={`/articles/${article.id}`}>
            <ArticleCard article={article} />
          </Link>
        ))
      ) : (
        <div className="w-full">
          
          <AllArticleSkeleton />
        </div>
      )}
    </div>
  );
}
