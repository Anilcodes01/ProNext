"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "./postCard";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "next/navigation";
import Image from "next/image";
import { AiOutlineLink } from "react-icons/ai";
import { useSession } from "next-auth/react";
import ArticleCard from "./articleCard";
import FollowButton from "./follow";
import ProjectCard from "./projectCard";
import { useRouter } from "next/navigation";
import { getDeviconUrl } from "@/app/lib/getDeviconUrl";
import { CalendarDays, MapPin } from "lucide-react";
import { Article, Project, UserProfile, Follow, Post } from "@/types/types";
import UserComponentSkeleton from "./skeletons/userComponentSkeleton";

interface User {
  id: string;
  name: string | null;
  username: string;
  avatarUrl: string | null;
}

interface PostListProps {
  onGeminiClick?: (postContent: string) => void
}

export default function UserProfilePage({onGeminiClick = () => {}}: PostListProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [followersCount, setFollowersCount] = useState<number | null>(null);
  const [followingCount, setFollowingCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [viewMode, setViewMode] = useState<"posts" | "articles" | "projects">(
    "posts"
  );
  const [users, setUsers] = useState<User[]>([]);
  const [following, setFollowing] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const { data: session } = useSession();
  const router = useRouter();

  console.log(users);

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

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`/api/project/fetchProject/${userId}`);
      setProjects(response.data.projects);
    } catch (error) {
      setError("Failed to fetch Projects");
      console.log(error);
    }
  };

  const handleViewModeChange = (mode: "posts" | "articles" | "projects") => {
    setViewMode(mode);
    if (mode === "articles" && articles.length === 0) {
      fetchArticles();
    } else if (mode === "projects" && projects.length === 0) {
      fetchProjects();
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (loading) {
    return <UserComponentSkeleton />;
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
    <div className=" mt-16 flex flex-col md:p-4 lg:p-5 p-4 bg-gray-50">
      <div className="rounded-lg bg-white   flex flex-col ">
        <div className="">
          <div className="relative rounded lg:h-[20vh] h-[12vh] lg:mb-8 mb-10 w-full">
            {userProfile?.ProfilePageImage ? (
              <Image
                src={userProfile.ProfilePageImage}
                alt="User Profile Page Image"
                width={1000}
                height={400}
                className="h-[12vh] lg:h-[20vh] w-full rounded object-cover"
              />
            ) : (
              <div className="bg-gray-300 lg:h-[20vh] h-[12vh] w-full"></div>
            )}

            <div className="absolute bottom-[-30px] transform  ml-4 rounded-full lg:w-[100px] w-[80px] lg:h-[100px] h-[80px] overflow-hidden shadow-lg">
              {userProfile?.avatarUrl ? (
                <Image
                  src={userProfile.avatarUrl}
                  alt="User Avatar"
                  width={384}
                  height={384}
                  className="rounded-full h-full w-full object-cover"
                />
              ) : (
                <FaUserCircle className="h-full w-full text-gray-300" />
              )}
            </div>
          </div>

          <div className="bg-white pb-4">
            <div className="flex justify-between pl-4 items-center">
              <div className="text-black font-bold text-2xl lg:mt-4  mt- ">
                {userProfile?.name}
              </div>

              {isOwnProfile ? (
                <button
                  onClick={() => (window.location.href = `/user/edit`)}
                  className="text-sm rounded-full  px-3 py-1 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition duration-300"
                >
                  Edit Profile
                </button>
              ) : (
                userProfile?.id && (
                  <div className="border rounded-full px-2 mr- flex hover:bg-slate-200 text-center py-1 transition duration-300">
                    <FollowButton
                      isFollowing={following.includes(userProfile.id)}
                      followingId={userProfile.id}
                    />
                  </div>
                )
              )}
            </div>
            <div className="text-gray-800 pl-4 text-sm lg:mt-4  mt- ">
              @{userProfile?.username}
            </div>
            <div className="text-black pl-4 text-sm mt-2">
              {userProfile?.bio}
            </div>

            <div className="flex lg:gap-4 lg:flex-row flex-col">
              {userProfile?.city && (
                <div className="text-gray-600 text-sm mt-2 pl-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4 shrink-0" />
                  {userProfile.city}
                </div>
              )}

              {userProfile?.website && (
                <div className="text-gray-600 text-sm mt-2 pl-4 flex items-center gap-2">
                  <AiOutlineLink className="text-gray-600" />
                  <a
                    href={userProfile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:underline"
                  >
                    {userProfile.website}
                  </a>
                </div>
              )}

              <div className="flex text-gray-600 mt-2 pl-4 text-sm">
                <CalendarDays className="w-4 h-4 mr-2 shrink-0" />
                Joined {formatDate(userProfile?.createdAt || "")}
              </div>
            </div>

            <div className="text-black flex items-center  pl-4 mt-4 gap-8">
              <div className="cursor-pointer text-sm hover:text-blue-500 transition duration-300">
                <span className="font-bold">{followersCount}</span> Followers
              </div>
              <div className="cursor-pointer text-sm hover:text-blue-500 transition duration-300">
                <span className="font-bold">{followingCount}</span> Following
              </div>
            </div>

            {userProfile?.techStack && userProfile.techStack.length > 0 && (
              <div className="flex flex-wrap gap-2 pl-4 mt-4 mb-2 w-full rounded-lg">
                {userProfile.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex gap-1 p-1 bg-slate-100 rounded-full items-center"
                    style={{ minWidth: "8px" }}
                  >
                    <img
                      src={getDeviconUrl(tech)}
                      alt={`${tech} icon`}
                      className="w-4 h-4 object-contain"
                    />
                    <p className="text-xs font- text-black">{tech}</p>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-6 bg-white border-b ">
          <button
            onClick={() => handleViewModeChange("posts")}
            className={`${
              viewMode === "posts"
                ? "border-b-4 text-blue-500 border-blue-500"
                : "border-none text-gray-500"
            } py-2 transition duration-300`}
          >
            Posts
          </button>
          <button
            onClick={() => handleViewModeChange("articles")}
            className={`${
              viewMode === "articles"
                ? "border-b-4 text-blue-500 border-blue-500"
                : "border-none text-gray-500"
            } py-2 transition duration-300`}
          >
            Articles
          </button>
          <button
            onClick={() => handleViewModeChange("projects")}
            className={`${
              viewMode === "projects"
                ? "border-b-4 text-blue-500 border-blue-500"
                : "border-none text-gray-500"
            } py-2 transition duration-300`}
          >
            Projects
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {viewMode === "posts" && (
            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} onGeminiClick={onGeminiClick} />
              ))}
            </div>
          )}
          {viewMode === "articles" && (
            <div className="space-y-4">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
          {viewMode === "projects" && (
            <div className="flex flex-col text-black">
              <div className="flex gap-1 mt-2 py-1 rounded w-36 justify-center">
                <button
                  onClick={() => {
                    router.push("/user/project/upload");
                  }}
                  className="bg-blue-500 text-white rounded-lg py-1 px-3 hover:bg-blue-600 transition duration-300"
                >
                  Upload Project
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
