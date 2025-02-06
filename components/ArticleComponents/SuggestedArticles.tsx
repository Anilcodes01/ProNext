"use client";
import { useEffect } from "react";
import { MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import SuggesstionbarSkeleton from "../skeletons/SuggestionbarSkeleton";
import { Article } from "@/types/types";
import { useArticles } from "@/context/ArticleContext";

const getRandomArticles = (articles: Article[], count: number) => {
  const shuffled = [...articles].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default function SuggestedArticles() {
  const { articles, loading, error, fetchArticles } = useArticles();
  const router = useRouter();

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  if (loading) {
    return (
      <div>
        <SuggesstionbarSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        Error loading suggested articles
      </div>
    );
  }

  const suggestedArticles = getRandomArticles(articles, 2);

  return (
    <div className=" text-black flex border border-gray-100 rounded-lg flex-col p-4  h-auto">
      <div className="flex gap-2">
        <span className="text-base font-medium"> Trending Articles</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {suggestedArticles.map((article) => (
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
        ))}
      </div>
    </div>
  );
}
