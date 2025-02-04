"use client";
import { useEffect } from "react";
import AllArticleSkeleton from "@/components/skeletons/allArticleSkeleton";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { BsPencilSquare } from "react-icons/bs";
import { useArticles } from "@/context/ArticleContext";
import ArticleCard from "@/components/articleCard";
import { Article } from "@/types/types";

export default function Articles() {
  const { articles, loading, error, fetchArticles, setSelectedArticle } =
    useArticles();
  const router = useRouter();

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    router.push(`/articles/${article.id}`);
  };

  return (
    <div className="bg-white text-black min-h-screen overflow-hidden">
      <div className="flex">
        <div className="hidden md:block fixed w-52 lg:w-80 h-screen">
          <Sidebar />
        </div>

        <div className="w-full md:ml-52 lg:ml-80 h-screen overflow-y-auto hide-scrollbar">
          <div className="md:mt-16 lg:mr-52 border-r border-l border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold">All Articles</div>
              <button
                onClick={() => {
                  router.push("/articles/publish");
                }}
                className="text-black hover:bg-slate-100 text-xl rounded py-1 px-2"
              >
                <BsPencilSquare />
              </button>
            </div>

            <div>
              {loading ? (
                <div>
                  <AllArticleSkeleton />
                </div>
              ) : error ? (
                <div className="text-center text-red-600 text-lg font-bold">
                  {error}
                </div>
              ) : (
                <div>
                  {articles.map((article) => (
                    <div
                      key={article.id}
                      onClick={() => handleArticleClick(article)}
                    >
                      <ArticleCard key={article.id} article={article} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
