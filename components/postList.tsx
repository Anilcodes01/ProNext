"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "./postCard";

interface Post {
  id: string;
  title?: string;
  content: string;
  image?: string; // Make sure to allow null for optional images
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: {
    name: string;
    avatarUrl?: string ; // Allow null for optional avatars
  };
  isLiked: boolean; // This field is based on your backend response
  likeCount: number; // Ensure this is passed correctly from the backend
}

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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
        console.log('Fetched posts:', response.data); // Log the entire response for debugging
        const fetchedPosts = Array.isArray(response.data.posts) ? response.data.posts : [];
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts", error);
        setError("Failed to fetch posts");
      } finally {
        setLoading(false); // Set loading to false after fetch is complete
      }
    };

    fetchPosts();
  }, []); // Run once on component mount

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
