'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "./postCard";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "next/navigation";

interface Post {
  id: string;
  title?: string;
  content: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: {
    name: string;
    avatarUrl?: string;
  };
  isLiked: boolean;
  likeCount: number;
  commentCount: number;
  isBookmarked: boolean;
}

export default function UserProfilePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [userProfile, setUserProfile] = useState<{ name: string; image?: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const { userId } = useParams(); // Use useParams to get the dynamic userId from the URL

  // Fetch posts and user profile using useEffect
  useEffect(() => {
    if (!userId) return; // Ensure userId is available before fetching

    const fetchUserData = async () => {
      try {
        // Fetch the user's posts
        const response = await axios.get(`/api/post/fetchUserPost/${userId}`, {
          headers: {
            "Cache-Control": "no-store, no-cache, max-age=0, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        });

        // Log the response for debugging
        console.log('Fetched user posts:', response.data);

        const fetchedPosts = Array.isArray(response.data.posts) ? response.data.posts : [];
        setPosts(fetchedPosts);

        // Fetch the user's profile info (e.g., name and avatar)
        const userResponse = await axios.get(`/api/users/${userId}`);
        setUserProfile(userResponse.data.user);
      } catch (error) {
        console.error("Failed to fetch user data", error);
        setError("Failed to fetch user data");
      } finally {
        setLoading(false); // Set loading to false after fetch is complete
      }
    };

    fetchUserData();
  }, [userId]); // Add userId as a dependency to refetch when it changes

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col gap-6 overflow-x-hidden p-5 ">
      <div className="lg:flex lg:flex-row lg:justify-between flex flex-col gap-4 p-5">
        <div className="rounded-full h-48 w-48">
          {userProfile?.image ? (
            <img src={userProfile.image} alt="User Avatar" className="h-full w-full rounded-full object-cover" />
          ) : (
            <FaUserCircle className="h-full w-full text-gray-500" />
          )}
        </div>
        <div className=" p-5 lg:mr-16 h-48 w-96">
          <div className="text-xl text-black">
            {userProfile?.name}
          </div>
        </div>
      </div>
      <div className="bg-white min-h-screen">
        <div>
          <div className="text-black text-2xl">Posts</div>
          <div className="mt-8">
            {posts.map((post, index) => (
              <PostCard key={post.id ?? `post-${index}`} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
