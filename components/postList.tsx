// components/PostList.tsx
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "./postCard";

interface Post {
  id: string;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: {
    name: string;
    avatarUrl?: string;
  };
}

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch posts using useEffect
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
        setPosts(response.data.getPosts);
      } catch (error) {
        console.error("Failed to fetch posts", error);
        setError("Failed to fetch posts");
      }
    };

    fetchPosts();
  }, []); // Run once on component mount

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (posts.length === 0) {
    return <p className="text-gray-500">No posts available</p>;
  }

  return (
    <div className="mt-8">
      {posts.map((post, index) => (
        <PostCard key={post.id ?? `post-${index}`} post={post} />
      ))}
    </div>
  );
}
