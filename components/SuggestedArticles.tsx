"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import SuggesstionbarSkeleton from "./skeletons/SuggestionbarSkeleton";

interface Article {
  id: string;
  title: string;
  description: string;
  user: {
    id: string;
    name: string;
    avatarUrl: string;
  };
}

export default function SuggestedArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestedArticles = async () => {
      try {
        const response = await axios.get("/api/articles/suggestedArticles");
        const articlesData = response.data?.articles || [];
        setArticles(articlesData);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSuggestedArticles();
  }, []);

  if (loading) {
    return (
      <div>
        <SuggesstionbarSkeleton />
      </div>
    );
  }

  return (
    <div className=" text-black flex border border-gray-100 rounded-lg flex-col p-4  h-auto">
      <div className="flex gap-2">
        <span className="text-base font-medium"> Trending Articles</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {articles.length > 0 ? (
          articles.map((article) => (
            <div key={article.id}>
              <h2 className="mt-2  text-base font-medium hover:text-green-500 ">
                {article.title}
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                {article.description.slice(0, 80)}...
              </p>

              <div className="flex mt-2 gap-1">
                <button
                  onClick={() => {
                    router.push(`/articles/${article.id}`);
                  }}
                  className="text-sm text-green-600 hover:underline"
                >
                  Read more
                </button>
                <MoveRight size={20} className="text-green-600" />
              </div>
            </div>
          ))
        ) : (
          <div className="flex text-center justify-center text-xl text-black font-bold">
            Oops...!, No articles found...!
          </div>
        )}
      </div>
    </div>
  );
}
