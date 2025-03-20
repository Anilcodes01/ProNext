"use client";
import { useState, useEffect } from "react";
import PostCard from "./PostComponent/postCard";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "next/navigation";
import Image from "next/image";
import { AiOutlineLink } from "react-icons/ai";
import { useSession } from "next-auth/react";
import ArticleCard from "./ArticleComponents/articleCard";
import FollowButton from "./follow";
import ProjectCard from "./PostComponent/projectCard";
import { useRouter } from "next/navigation";
import { getDeviconUrl } from "@/app/lib/getDeviconUrl";
import { CalendarDays, MapPin } from "lucide-react";
import { PostListProps } from "@/types/types";
import { useUserProfile } from "@/context/UserProfileContext";

export default function UserProfilePage({
  onGeminiClick = () => {},
}: PostListProps) {
  const { userId } = useParams();
  const { data: session } = useSession();
  const router = useRouter();
  const [following] = useState<string[]>([]);
  const {
    userProfile,
    posts,
    articles,
    projects,
    error,
    viewMode,
    setViewMode,
    fetchUserData,
  } = useUserProfile();

  useEffect(() => {
    if (userId) {
      fetchUserData(userId as string);
    }
  }, [userId]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
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
    <div className=" mt-16 flex flex-col">
      <div className="rounded-lg bg-white p-4  flex flex-col ">
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
                  className="text-sm rounded-full  px-3 py-1 border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition duration-300"
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
                <span className="font-bold">{userProfile?.followersCount}</span>{" "}
                Followers
              </div>
              <div className="cursor-pointer text-sm hover:text-blue-500 transition duration-300">
                <span className="font-bold">{userProfile?.followingCount}</span>{" "}
                Following
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
                    <Image
                      src={getDeviconUrl(tech)}
                      alt={`${tech} icon`}
                      width={200}
                      height={200}
                      className="w-4 h-4 object-contain"
                    />
                    <p className="text-xs font- text-black">{tech}</p>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-6 ml-4 bg-white  ">
          <button
            onClick={() => setViewMode("posts")}
            className={`${
              viewMode === "posts"
                ? "border-b-4 text-green-600 border-green-600"
                : "border-none text-gray-500"
            } py-2 transition duration-300`}
          >
            Posts
          </button>
          <button
            onClick={() => setViewMode("articles")}
            className={`${
              viewMode === "articles"
                ? "border-b-4 text-green-600 border-green-600"
                : "border-none text-gray-500"
            } py-2 transition duration-300`}
          >
            Articles
          </button>
          <button
            onClick={() => setViewMode("projects")}
            className={`${
              viewMode === "projects"
                ? "border-b-4 text-green-600 border-green-600"
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
                <PostCard
                  key={post.id}
                  post={post}
                  onGeminiClick={onGeminiClick}
                />
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
                  className="bg-green-600 text-white rounded-lg py-1 px-3 hover:bg-green-700 transition duration-300"
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
