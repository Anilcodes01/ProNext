"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "./postCard";
import { Post } from "@/types/types";

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/post/fetchPost", {
          headers: {
            "Cache-Control": "no-store, no-cache, max-age=0, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        });

        const fetchedPosts = Array.isArray(response.data.posts)
          ? response.data.posts
          : [];
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts", error);
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (loading) {
    return (
      <div className="text-gray-500">
        <div className="animate-pulse w-full ">
          <div className="h-28 w-full mt-6 bg-gray-200 rounded-lg dark:bg-gray-300"></div>
          <div className="h-28 w-full mt-6 bg-gray-200 rounded-lg dark:bg-gray-300"></div>
          <div className="h-28 w-full mt-6 bg-gray-200 rounded-lg dark:bg-gray-300"></div>
          <div className="h-28 w-full mt-6 bg-gray-200 rounded-lg dark:bg-gray-300"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      {posts.map((post, index) => (
        <PostCard key={post.id ?? `post-${index}`} post={post} />
      ))}
    </div>
  );
}
