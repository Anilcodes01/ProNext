"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../PostComponent/postCard";
import ArticleCard from "../ArticleComponents/articleCard";
import { useSession } from "next-auth/react";
import { Post } from "@/types/types";
import { Article } from "@/types/types";

interface PostListProps {
  onGeminiClick?: (postContent: string) => void;
}

export default function BookmarkComponent({
  onGeminiClick = () => {},
}: PostListProps) {
  const { data: session } = useSession();
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Post[]>([]);
  const [bookmarkedArticles, setBookmarkedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"posts" | "articles">("posts");

  useEffect(() => {
    const fetchBookmarkedItems = async () => {
      setLoading(true);
      try {
        if (view === "posts") {
          const response = await axios.get("/api/users/bookmarks");
          setBookmarkedPosts(response.data.posts);
        } else {
          const response = await axios.get("/api/users/articleBookmarks");
          setBookmarkedArticles(response.data.articles);
        }
      } catch (error) {
        console.error("Failed to fetch bookmarked items:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.id) {
      fetchBookmarkedItems();
    }
  }, [session, view]);

  if (loading) {
    return (
      <div className="pt-4  ">
        <div className="flex bg-gray-200 p-1 rounded-xl   mb-4">
          <button
            className={`px-4 py-2 w-full rounded-xl ${
              view === "posts" ? "bg-gray-300 text-black" : "text-black"
            }`}
            onClick={() => setView("posts")}
          >
            Posts
          </button>
          <button
            className={`px-4 w-full py-2 ml-2 rounded-xl ${
              view === "articles" ? "bg-gray-300 text-black" : "text-black"
            }`}
            onClick={() => setView("articles")}
          >
            Articles
          </button>
        </div>
        <div role="status" className="animate-pulse ">
          <div className="bg-gray-300 mt-8 rounded-xl h-32 w-full"></div>
          <div className="bg-gray-300 mt-6 rounded-xl h-32 w-full"></div>
        </div>
      </div>
    );
  }

  const bookmarksToDisplay =
    view === "posts" ? bookmarkedPosts : bookmarkedArticles;

  if (bookmarksToDisplay.length === 0) {
    return <div className="text-gray-800">No bookmarks yet...!</div>;
  }

  return (
    <div className="container mx-auto mt-4">
      <div className="flex bg-gray-200 p-1 rounded-xl   mb-4">
        <button
          className={`px-4 py-2 w-full rounded-xl ${
            view === "posts" ? "bg-gray-300 text-black" : "text-black"
          }`}
          onClick={() => setView("posts")}
        >
          Posts
        </button>
        <button
          className={`px-4 w-full py-2 ml-2 rounded-xl ${
            view === "articles" ? "bg-gray-300 text-black" : "text-black"
          }`}
          onClick={() => setView("articles")}
        >
          Articles
        </button>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {bookmarksToDisplay.map((item) =>
          view === "posts" ? (
            <PostCard
              onGeminiClick={onGeminiClick}
              key={item.id}
              post={item as Post}
            />
          ) : (
            <ArticleCard key={item.id} article={item as Article} />
          )
        )}
      </div>
    </div>
  );
}
