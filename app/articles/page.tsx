"use client";
import { Suspense } from "react";
import ArticleList from "@/components/articleList";
import Appbar from "@/components/appbar";
import AllArticleSkeleton from "@/components/allArticleSkeleton";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";

export default function Articles() {
  const router = useRouter();
  return (
    <div className="bg-white text-black min-h-screen">
      <div className="h-16">
        <Appbar />
      </div>
      <div className="flex ">
        <div className="hidden md:block  fixed w-52 lg:w-80 h-full">
          <Sidebar />
        </div>
        <div className="w-full ml-0 p-4 md:ml-52 lg:ml-80 border-l border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-4xl font-bold ">All Articles</div>
            <button
              onClick={() => {
                router.push("/articles/publish");
              }}
              className="text-black  hover:bg-slate-100 text-xl border rounded py-1 px-4"
            >
              Write{" "}
            </button>
          </div>
          <Suspense fallback={<AllArticleSkeleton />}>
            <ArticleList />
          </Suspense>
        </div>
      </div>
      
    </div>
  );
}
