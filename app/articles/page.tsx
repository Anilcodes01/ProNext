"use client";

import Appbar from "@/components/appbar";
import ArticleCard from '@/components/articleCard';
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import AllArticleSkeleton from '@/components/allArticleSkeleton';

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

export default function Articles() {
  const [error, setError] = useState<string | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true)
    try {
      const response = await axios.get("/api/articles/fetchArticle");
      console.log("Fetch Posts Response:", response.data);
      if (
        response.data.getArticles &&
        Array.isArray(response.data.getArticles)
      ) {
        setArticles(response.data.getArticles);
      } else {
        console.error("Unexpected data structure:", response.data);
        setError("Unexpected data structure received from server");
      }
    } catch (error) {
      console.error("Error fetching posts", error);
      setError("Failed to fetch posts. Please try again later.");
    } finally {
      setLoading(false)
    }
  };

  if(loading) {
    return <div>
      <AllArticleSkeleton />
    </div>
  }

  return (
    <div className="bg-gray-800 min-h-screen">
      <div>
        <Appbar />
      </div>
      <div className="p-8">
        <div className="text-4xl font-bold">All Articles</div>
        <div>
          <div className="mt-8">
            {error && <p className="text-red-500">{error}</p>}
            {articles.length > 0 ? (
              articles.map((article) => (
                <Link key={article.id} href={`/articles/${article.id}`}>
              
                  <ArticleCard article={article} />
                
              </Link>
              ))
            ) : (
              <p className="text-gray-500">No posts available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
