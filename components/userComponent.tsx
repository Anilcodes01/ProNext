"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "./postCard";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "next/navigation";
import Image from "next/image";
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineLink } from "react-icons/ai";
import { SlCalender } from "react-icons/sl";
import { useSession } from "next-auth/react";
import ArticleCard from "./articleCard";
import FollowButton from "./follow";

interface Post {
  id: string;
  title?: string;
  content: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  isLiked: boolean;
  likeCount: number;
  commentCount: number;
  isBookmarked: boolean;
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

interface UserProfile {
  id: string;
  name: string;
  avatarUrl?: string;
  createdAt: string;
  bio?: string;
  website?: string;
  city?: string;
}

interface Follow {
  followingId: string;
}

interface User {
  id: string;
  name: string | null;
  avatarUrl: string | null;
}

export default function UserProfilePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [followersCount, setFollowersCount] = useState<number | null>(null);
  const [followingCount, setFollowingCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [articles, setArticles] = useState<Article[]>([]); // New state for articles
  const [viewMode, setViewMode] = useState<"posts" | "articles">("posts");
  const [users, setUsers] = useState<User[]>([]);
  const [following, setFollowing] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const { data: session } = useSession();

  console.log(users)

  useEffect(() => {
    async function fetchUsersAndFollowing() {
      try {
        const [usersResponse, followingResponse] = await Promise.all([
          axios.get("/api/users"),
          axios.get("/api/follow"),
        ]);
        setUsers(usersResponse.data.users);
        setFollowing(
          followingResponse.data.following.map(
            (follow: Follow) => follow.followingId
          )
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsersAndFollowing();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`/api/users/${userId}`, {
          headers: {
            "Cache-Control": "no-store, no-cache, max-age=0, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        });

        console.log("User response:", userResponse.data);

        const response = await axios.get(`/api/post/fetchUserPost/${userId}`, {
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

        const userData = userResponse.data.user;
        setUserProfile(userData);

        setFollowersCount(userResponse.data.followersCount);
        setFollowingCount(userResponse.data.followingCount);
      } catch (error) {
        console.error("Failed to fetch user data", error);
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const fetchArticles = async () => {
    try {
      const response = await axios.get(
        `/api/articles/fetchUserArticles/${userId}`
      );
      setArticles(response.data.userArticles);
    } catch (error) {
      setError("Failed to fetch articles");
      console.log(error);
    }
  };

  const handleViewModeChange = (mode: "posts" | "articles") => {
    setViewMode(mode);
    if (mode === "articles" && articles.length === 0) {
      fetchArticles(); // Fetch articles if switching to articles view
    }
  };

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
          <div className="h-12 w-40 animate-pulse rounded bg-gray-200 "></div>
          <div className="h-28 rounded animate-pulse bg-gray-200 mt-8"></div>
          <div className="h-28 rounded animate-pulse bg-gray-200  "></div>
          <div className="h-28 rounded animate-pulse bg-gray-200 "></div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const isOwnProfile = session?.user?.id === userId;

  return (
    <div className="min-h-screen flex flex-col gap-6 overflow-x-hidden p-5">
      <div className="lg:flex lg:flex-row lg:justify-between flex flex-col gap-4 p-5">
        <div className="rounded-full h-48 w-48 overflow-y-hidden">
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
          <div className="text-xl flex justify-between items-center text-black">
            {userProfile?.name}
            {isOwnProfile ? (
              <button
                onClick={() => (window.location.href = `/user/edit`)}
                className="text-sm rounded-full px-2 border border-black text-black"
              >
                Edit Profile
              </button>
            ) : (
              userProfile?.id && (
                <FollowButton
                  isFollowing={following.includes(userProfile.id)}
                  followingId={userProfile.id}
                />
              )
            )}
          </div>
          <div className="text-black text-md w-full">{userProfile?.bio}</div>

          <div className="text-black flex items-center gap-2">
            <IoLocationOutline className="text-md" />
            {userProfile?.city}
          </div>

          <div className="text-black flex items-center gap-2">
            <AiOutlineLink className="text-gray-600" />
            <a
              href={userProfile?.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              {userProfile?.website}
            </a>
          </div>
          <div className="text-black flex items-center gap-2">
            <SlCalender className="text-md" />
            Joined {formatDate(userProfile?.createdAt || "")}
          </div>
          <div className="text-black flex items-center mt-3 gap-8">
            <div className="cursor-pointer text-sm">
              <span className="">{followersCount}</span> Followers
            </div>
            <div className="cursor-pointer text-sm">
              <span className="">{followingCount}</span> Following
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-6">
        <button
          onClick={() => handleViewModeChange("posts")}
          className={`${
            viewMode === "posts"
              ? "border-b-4 text-blue-400 border-blue-500"
              : "border-none text-gray-500"
          } py-2`}
        >
          Posts
        </button>
        <button
          onClick={() => handleViewModeChange("articles")}
          className={`${
            viewMode === "articles"
              ? "border-b-4 text-blue-400 border-blue-500"
              : "border-none text-gray-500"
          } py-2`}
        >
          Articles
        </button>
      </div>
      {viewMode === "posts" ? (
        <div className="flex flex-col gap-4 p-2">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4 p-2">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
