'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "./postCard";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "next/navigation";
import Image from "next/image";
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineLink } from "react-icons/ai";
import { SlCalender } from "react-icons/sl";
import { useSession } from "next-auth/react"; // Import NextAuth session

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
  bio?: string;
  website?: string;
  city?: string;
}

export default function UserProfilePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const { userId } = useParams(); // Get userId from the URL parameters
  const { data: session } = useSession(); // Access the current session

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
          {/* Loading Skeleton */}
          <div className="lg:flex lg:flex-row lg:justify-between flex flex-col gap-4 p-5">
            <div className="rounded-full h-48 w-48 bg-gray-200 animate-pulse" />
            <div className="p-5 lg:mr-16 h-48 w-96">
              <div className="h-8 bg-gray-200 animate-pulse w-32 rounded mb-2" />
              <div className="h-6 bg-gray-200 animate-pulse rounded mb-2" />
              <div className="h-6 bg-gray-200 animate-pulse rounded w-64 mb-2" />
              <div className="h-6 bg-gray-200 animate-pulse rounded w-56 mb-2" />
              <div className="h-6 bg-gray-200 animate-pulse rounded w-48 mb-2" />
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

  // Check if the logged-in user is viewing their own profile
  const isOwnProfile = session?.user?.id === userId;

  return (
    <div className="min-h-screen flex flex-col gap-6 overflow-x-hidden p-5">
      <div className="lg:flex lg:flex-row lg:justify-between flex flex-col gap-4 p-5">
        <div className="rounded-full h-48 w-48">
          {userProfile?.avatarUrl ? (
            <Image
              src={userProfile.avatarUrl}
              alt="User Avatar"
              width={192}
              height={192}
              className="rounded-full object-cover"
            />
          ) : (
            <FaUserCircle className="h-full w-full text-gray-500" />
          )}
        </div>
        <div className="p-5 lg:mr-16 flex flex-col gap-1 h-48 w-96">
          <div className="text-xl flex justify-between text-black">
            {userProfile?.name}
            {/* Show Edit Profile button only if it's the logged-in user's profile */}
            {isOwnProfile && (
              <button
                onClick={() => window.location.href = `/user/edit`} // Redirect to edit profile page
                className="text-sm rounded-full px-2 border border-black text-black"
              >
                Edit Profile
              </button>
            )}
          </div>
          <div className="text-black text-md w-full">{userProfile?.bio}</div>
          <div className="text-black flex items-center gap-2">
            <IoLocationOutline className="text-md" />
            {userProfile?.city}
          </div>
          <div className="text-black flex items-center gap-2">
            <AiOutlineLink className="text-gray-600" />
            <div className="text-blue-500 text-sm cursor-pointer">{userProfile?.website}</div>
          </div>
          <div className="text-gray-500 flex text-md items-center gap-2">
            <SlCalender className="text-sm text-gray-600" />
            Joined: {userProfile ? formatDate(userProfile.createdAt) : "N/A"}
          </div>
        </div>
      </div>
      <div className="bg-white">
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
