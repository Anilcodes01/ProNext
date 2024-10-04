'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "./postCard";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "next/navigation";
import Image from "next/image";

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

interface UserProfile {
  name: string;
  avatarUrl?: string;
  createdAt: string; 
}

export default function UserProfilePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const { userId } = useParams(); 

  useEffect(() => {
    if (!userId) return; 

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/post/fetchUserPost/${userId}`, {
          headers: {
            "Cache-Control": "no-store, no-cache, max-age=0, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        });

        const fetchedPosts = Array.isArray(response.data.posts) ? response.data.posts : [];
        setPosts(fetchedPosts);

        const userResponse = await axios.get(`/api/users/${userId}`);
        setUserProfile(userResponse.data.user);
      } catch (error) {
        console.error("Failed to fetch user data", error);
        setError("Failed to fetch user data");
      } finally {
        setLoading(false); 
      }
    };

    fetchUserData();
  }, [userId]); 

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="min-h-screen flex flex-col gap-6 overflow-x-hidden p-5">
          <div className="lg:flex lg:flex-row lg:justify-between flex flex-col gap-4 p-5">
            <div className="rounded-full h-48 w-48 bg-gray-200 animate-pulse" /> 
            <div className="p-5 lg:mr-16 h-48 w-96">
              <div className="h-8 bg-gray-200 animate-pulse rounded mb-2" /> 
              <div className="h-6 bg-gray-200 animate-pulse rounded" /> 
            </div>
          </div>
          <div className="bg-white min-h-screen">
            <div>
              <div className="text-black text-2xl h-8 w-24 bg-gray-200 animate-pulse rounded mb-4" /> 
              <div className="mt-8 space-y-4"> 
                {Array.from({ length: 3 }).map((_, index) => ( 
                  <div key={index} className="border rounded-lg p-4 bg-gray-200 animate-pulse h-32" /> 
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Format the createdAt date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen flex flex-col gap-6 overflow-x-hidden p-5 ">
      <div className="lg:flex lg:flex-row lg:justify-between flex flex-col gap-4 p-5">
        <div className="rounded-full h-48 w-48">
          {userProfile?.avatarUrl ? (
            <Image
              src={userProfile.avatarUrl}
              alt="User Avatar"
              width={192} // or the desired width (e.g., 48 * 4)
              height={192} // or the desired height (e.g., 48 * 4)
              className="rounded-full object-cover"
            />
          ) : (
            <FaUserCircle className="h-full w-full text-gray-500" />
          )}
        </div>
        <div className="p-5 lg:mr-16 h-48 w-96">
          <div className="text-xl text-black">
            {userProfile?.name}
          </div>
          <div className="text-black">
            Joined: {userProfile ? formatDate(userProfile.createdAt) : "N/A"} {/* Show formatted date */}
          </div>
        </div>
      </div>
      <div className="bg-white ">
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
