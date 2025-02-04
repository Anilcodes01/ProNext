"use client";
import { useState, useEffect } from "react";
import NoSession from "./skeletons/mainContentSkeleton/noSession";
import { Toaster } from "sonner";
import { usePosts } from "@/context/PostContext";
import PostSkeleton from "./skeletons/postSkeleton";
import PostCard from "./postCard";
import CreatePost from "./CreatePost";

export default function MainContent({
  onGeminiClick = () => {},
}: {
  onGeminiClick?: (postContent: string) => void;
}) {

  const [error] = useState<string | null>(null);
  const { posts, postLoading, postError, fetchPosts } = usePosts();

  useEffect(() => {
    fetchPosts();
  }, []);

  if (error) {
    return <NoSession />;
  }

  return (
    <div className="p-4 mt-12 overflow-x-hidden w-full">
      <Toaster />
      <CreatePost />
      <div>
        {postLoading ? (
          <div>
            <PostSkeleton />
          </div>
        ) : postError ? (
          <div className="text-center text-red-600 text-lg font-bold">
            {postError}
          </div>
        ) : (
          <div>
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onGeminiClick={onGeminiClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}