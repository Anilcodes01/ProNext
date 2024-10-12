"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "./postCard";
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

export default function BookmarkComponent() {
  const { data: session } = useSession();
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarkedPosts = async () => {
      try {
        const response = await axios.get("/api/users/bookmarks");
        setBookmarkedPosts(response.data.posts);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch bookmarked posts:", error);
        setLoading(false);
      }
    };

    if (session?.user?.id) {
      fetchBookmarkedPosts();
    }
  }, [session]);

  if (loading) {
    return (
      <div role="status" className="animate-pulse pt-4 pl-4">
        <div className="text-4xl font-bold text-gray-600">
          Your Bookmarked Post
        </div>
        <div className="bg-gray-300 mt-8 rounded-xl h-32 w-full"></div>
      </div>
    );
  }

  if (bookmarkedPosts.length === 0) {
    return <div>No bookmarks yet.</div>;
  }

  return (
    <div className="container mx-auto min-h-screen mt-4">
      <h1 className="text-3xl text-gray-600 font-bold mb-4">
        Your Bookmarked Posts
      </h1>
      <div className="grid grid-cols-1 gap-2">
        {bookmarkedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
