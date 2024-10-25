"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "./postCard";
import ArticleCard from "./articleCard";
import { useSession } from "next-auth/react";

interface Post {
  id: string;
  content: string;
  createdAt: string | Date;
  image?: string;
  user: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  isLiked: boolean;
  isBookmarked: boolean;
  likeCount: number;
  commentCount: number;
}

interface Article {
  id: string;
  title: string;
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

export default function BookmarkComponent() {
  const { data: session } = useSession();
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Post[]>([]);
  const [bookmarkedArticles, setBookmarkedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"posts" | "articles">("posts");

  useEffect(() => {
    const fetchBookmarkedItems = async () => {
      setLoading(true); // Start loading
      try {
        if (view === "posts") {
          const response = await axios.get("/api/users/bookmarks");
          setBookmarkedPosts(response.data.posts);
        } else {
          const response = await axios.get("/api/users/articleBookmarks"); // Adjust the API endpoint for articles
          setBookmarkedArticles(response.data.articles);
        }
      } catch (error) {
        console.error("Failed to fetch bookmarked items:", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    if (session?.user?.id) {
      fetchBookmarkedItems();
    }
  }, [session, view]);

  if (loading) {
    return (
      <div role="status" className="animate-pulse pt-4 ">
        
        <div className="bg-gray-300 mt-8 rounded-xl h-32 w-full"></div>
      </div>
    );
  }

  const bookmarksToDisplay = view === "posts" ? bookmarkedPosts : bookmarkedArticles;

  if (bookmarksToDisplay.length === 0) {
    return <div className="text-gray-800">No bookmarks yet...!</div>;
  }

  return (
    <div className="container mx-auto min-h-screen mt-4">
      
      <div className="flex bg-gray-300 rounded-lg   mb-4">
        <button
          className={`px-4 py-2 w-full rounded-xl ${view === "posts" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          onClick={() => setView("posts")}
        >
          Posts
        </button>
        <button
          className={`px-4 w-full py-2 ml-2 rounded-xl ${view === "articles" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          onClick={() => setView("articles")}
        >
          Articles
        </button>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {bookmarksToDisplay.map((item) => 
          view === "posts" ? (
            <PostCard key={item.id} post={item as Post} /> // Assert type for clarity
          ) : (
            <ArticleCard key={item.id} article={item as Article} /> // Assert type for clarity
          )
        )}
      </div>
    </div>
  );
}
