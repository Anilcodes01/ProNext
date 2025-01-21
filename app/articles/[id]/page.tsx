"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import {
  FaUserCircle,
  FaRegBookmark,
  FaBookmark,
  FaArrowLeft,
} from "react-icons/fa";
import OneArticleSkeleton from "@/components/skeletons/oneArticleSkeleton";
import Sidebar from "@/components/Sidebar";
import FollowButton from "@/components/follow";
import LikeButton from "@/components/LikeButton";
import { Article } from "@/types/types";

interface User {
  id: string;
  name: string | null;
  avatarUrl: string | null;
}

interface Follow {
  followingId: string;
}

export default function FullArticlePage() {
  const [article, setArticle] = useState<Article | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [following, setFollowing] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialLiked, setInitialLiked] = useState(false);
  const [initialLikeCount, setInitialLikeCount] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const router = useRouter();
  const { id } = useParams();

  console.log(users);
  console.log(loading);

  useEffect(() => {
    async function fetchUsersAndFollowing() {
      try {
        const [usersResponse, followingResponse] = await Promise.all([
          axios.get("/api/users"),
          axios.get("/api/follow"),
        ]);
        setUsers(usersResponse.data.users);
        setFollowing(
          followingResponse.data.following.map(
            (follow: Follow) => follow.followingId
          )
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsersAndFollowing();
  }, []);

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
      const articleData = response.data.article;
      setArticle(articleData);
      setInitialLiked(articleData.liked);
      setInitialLikeCount(articleData.likeCount);
      setIsBookmarked(articleData.bookmarked);
    } catch (error) {
      console.error("Error fetching article", error);
      setError("Failed to fetch article. Please try again later.");
    }
  };

  const handleBookmark = async () => {
    if (!article) return;
    try {
      await axios.post(`/api/articles/bookmark`, { articleId: article.id });
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error("Error updating bookmark status:", error);
      setError("Failed to update bookmark status. Please try again later.");
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
    <div className="bg-white overflow-hidden min-h-screen">
      <div className="flex">
        <div className="hidden md:block fixed w-52 lg:w-80 h-full">
          <Sidebar />
        </div>
        <div className="w-full pt-20 md:pt-0   md:mt-16 ml-0 p-4 md:ml-52 lg:ml-80 border-l border-gray-200 overflow-y-auto hide-scrollbar h-screen">
          <div
            onClick={() => router.push("/articles")}
            className=" gap-4 cursor-pointer  mb-4 items-center hidden md:flex"
          >
            <div className="h-8 w-8 hover:bg-gray-200 flex items-center justify-center rounded-full">
              <FaArrowLeft size={20} className="text-black" />
            </div>
            <div className="text-xl text-black font-bold">Articles</div>
          </div>

          <div className="text-2xl lg:text-5xl font-bold text-black lg:mt-4">
            {article.title}
          </div>
          <div className="flex mt-4 items-center my-4">
            {article.user && article.user.avatarUrl ? (
              <Image
                src={article.user.avatarUrl}
                alt="User Profile"
                width={250}
                height={250}
                quality={75}
                className="rounded-full overflow-hidden h-10 w-10 object-cover cursor-pointer"
              />
            ) : (
              <FaUserCircle className="w-10 h-10 text-black" />
            )}
            <div className="lg:flex items-center">
              <div className="ml-4 lg:mb-1 text-xl text-black">
                {article.user.name}
              </div>
              <div className="text-sm text-black ml-4">
                {new Date(article.createdAt).toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>
            </div>

            <div className="ml-32 lg:ml-8 md:ml-8 lg:mb-1">
              <FollowButton
                isFollowing={following.includes(article.user.id)}
                followingId={article.user.id}
              />
            </div>
          </div>
          <div className="border-t flex justify-between border-b p-2 lg:ml-8 lg:mr-16">
            <LikeButton
              articleId={article.id || ""}
              initialLiked={initialLiked}
              initialLikeCount={initialLikeCount}
            />
            <div onClick={handleBookmark} className="cursor-pointer">
              {isBookmarked ? (
                <FaBookmark className="text-green-500" />
              ) : (
                <FaRegBookmark className="text-black" />
              )}
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
            <p className="whitespace-pre-wrap">{article.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
