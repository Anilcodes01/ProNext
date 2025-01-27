"use client";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import PostCard from "./postCard";
import { Post } from "@/types/types";
import PostListSkeleton from "./skeletons/mainContentSkeleton/postlistSkeleton";

interface PostListProps {
  newPost?: Post | null;
  onGeminiClick?: (postContent: string) => void
}

export default function PostList({ newPost, onGeminiClick = () => {} }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    if (newPost) {
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    }
  }, [newPost]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (loading) {
    return <PostListSkeleton />;
  }

  return (
    <div className="mt-8">
      {posts.map((post, index) => (
        <PostCard key={post.id ?? `post-${index}`} post={post}   onGeminiClick={onGeminiClick} />
      ))}
    </div>
  );
}


