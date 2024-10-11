"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import Appbar from "@/components/appbar";
import OneArticleSkeleton from "@/components/oneArticleSkeleton";
import Sidebar from "@/components/Sidebar";
import { FaArrowLeft } from "react-icons/fa6";

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

export default function FullArticlePage() {
  const [article, setArticle] = useState<Article | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchArticle(id as string);
    }
  }, [id]);

  const fetchArticle = async (articleId: string) => {
    try {
      const response = await axios.get(
        `/api/articles/fetchOneArticle/${articleId}`
      );
      setArticle(response.data.article);
    } catch (error) {
      console.error("Error fetching article", error);
      setError("Failed to fetch article. Please try again later.");
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!article) {
    return (
      <div>
        <OneArticleSkeleton />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="h-16">
        <Appbar />
      </div>
      <div className="flex">
        <div className="hidden md:block fixed w-52 lg:w-80 h-full">
          <Sidebar />
        </div>
        <div className="w-full ml-0 p-4 md:ml-52 lg:ml-80 border-l border-gray-200">
          <div
            onClick={() => {
              router.push("/articles");
            }}
            className="flex gap-4    cursor-pointer items-center"
          >
            <div className="h-8 w-8 hover:bg-gray-200 flex items-center justify-center  rounded-full ">
              <FaArrowLeft
                size={20}
                className="text-black rounded-full cursor-pointer"
              />
            </div>
            <div className="text-xl text-black font-bold">Articles</div>
          </div>
          <div className="  text-5xl font-bold text-black mt-4">
            {article.title}
          </div>
          <div className="flex mt-4 items-center my-4">
            {article.user && article.user.avatarUrl ? (
              <Image
                src={article.user.avatarUrl}
                alt="User Profile"
                width={28}
                height={28}
                className="rounded-full object-cover"
              />
            ) : (
              <FaUserCircle className="w-8 h-8 text-black" />
            )}
            <div className="ml-4 text-xl text-black">{article.user.name}</div>
            <div className="text-sm text-black ml-2 mt-1">
            {" . "}
            {new Date(article.createdAt).toLocaleDateString(undefined, {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
          </div>
          {article.image && (
            <Image
              src={article.image}
              alt={article.title}
              width={1000}
              height={500}
              className="my-8 rounded-lg lg:ml-16 border object-cover"
            />
          )}
          <div className="text-black text-lg mt-8">
            <p className="whitespace-pre-wrap ">{article.content}</p>
          </div>
        </div>
      </div>
      <div className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-200">
        <Sidebar isMobile={true} />
      </div>
    </div>
  );
}
