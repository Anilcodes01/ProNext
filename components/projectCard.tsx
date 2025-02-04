"use client";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { ProjectCardProps } from "@/types/types";
import { Dot, EllipsisVertical, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { BsPencilSquare } from "react-icons/bs";
import { TbMessageReport } from "react-icons/tb";
import { MdBlockFlipped } from "react-icons/md";

export default function ProjectCard({ project }: ProjectCardProps) {
  const [techStack, setTechStack] = useState<{ [key: string]: number } | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user.id;
  const isOwnPost = userId === project.user.id;

  const fetchTechStack = async (repoUrl: string) => {
    const regex = /github\.com\/([^/]+)\/([^/]+)/;
    const match = repoUrl.match(regex);

    if (!match) {
      throw new Error("Invalid GitHub URL");
    }

    const owner = match[1];
    const repo = match[2];

    try {
      const response = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/languages`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching tech stack:", error);
      return null;
    }
  };

   const formattedDate = format(new Date(project.createdAt), "MMM dd");

  useEffect(() => {
    if (project.projectRepoLink) {
      fetchTechStack(project.projectRepoLink)
        .then((stack) => {
          setTechStack(stack);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [project.projectRepoLink]);

  const handleDeleteProject = async () => {
    try {
      const response = await axios.post("/api/project/deleteProject", {
        projectId: project.id,
      });

      if (response.status === 200) {
        console.log(response.data.message);
      } else {
        console.log("failed to delete project", response.data.message);
      }
    } catch (error) {
      console.error("failed to delete project:", error);
    }
  };

  if (!project) {
    return <div>Error, project data is missing.</div>;
  }

  return (
    <div className="bg-neutral-50 shadow-lg mt-4 hover:shadow-xl transition-shadow duration-300 border border-gray-100 rounded-lg w-full p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {project.user && project.user.avatarUrl ? (
            <Image
              src={project.user.avatarUrl}
              alt="User Profile"
              width={250}
              height={250}
              quality={75}
              className="rounded-full overflow-hidden h-8 w-8 object-cover cursor-pointer"
            />
          ) : (
            <FaUserCircle className="w-8 h-8 text-gray-500" />
          )}
           <div className="flex items-center  ml-2 cursor-pointer">
              <div className="text-[18px] ">
                {project.user?.name || "Unknown User"}
              </div>
              <span className="ml-2 text-gray-600 text-sm">
                <span className="hidden sm:inline">@{project.user.username}</span>
                <span className="inline sm:hidden">
                  @{project.user.username?.slice(0, 6)}...
                </span>
              </span>

              <Dot className="text-gray-400" />
             
              <div className="text-xs text-gray-600">{formattedDate}</div>
            </div>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger
              onClick={(e) => e.stopPropagation()}
              className=" hover:bg-gray-200 h-8 w-8 rounded-full flex items-center justify-center focus:outline-none"
            >
              <EllipsisVertical
                size={20}
                className=" text-gray-400 hover:text-green-600"
              />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              sideOffset={5}
              className="w-52 z-50"
            >
              {isOwnPost ? (
                <>
                  <DropdownMenuItem
                    onClick={() => router.push(`/post/${project.id}/edit`)}
                    className="hover:bg-gray-100 flex items-center cursor-pointer"
                  >
                    <BsPencilSquare />
                    Edit Post
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleDeleteProject}
                    className="text-red-600 focus:text-red-600 flex items-center font-semibold hover:bg-gray-100 cursor-pointer focus:bg-red-50"
                  >
                    <Trash2 />
                    Delete Post
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem
                    // onClick={handleReportPost}
                    className="flex items-center "
                  >
                    <TbMessageReport />
                    Report Post
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(`/user/${project.user.id}/block`)
                    }
                    className="text-red-600 focus:text-red-600 flex items-center font-semibold hover:bg-gray-100 cursor-pointer focus:bg-red-50"
                  >
                    <MdBlockFlipped />
                    Block @{project.user.username}
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="relative w-full h-40 z-10 md:h-80 lg:h-80 rounded overflow-hidden mb-4">
        <Image
          src={project.image}
          alt={project.projectName}
          layout="fill"
          objectFit="contain"
          quality={90}
          className="rounded"
        />
      </div>

      <div className="flex flex-col items-start">
        <div className="flex items-center gap-4 w-full justify-between">
          <h3 className="text-2xl font-bold text-gray-900">
            {project.projectName}
          </h3>

          <div className="hidden md:block">
            {loading ? (
              <p className="text-gray-500">Loading tech stack...</p>
            ) : techStack && Object.keys(techStack).length > 0 ? (
              <ul className="flex flex-wrap gap-2 mr-6">
                {Object.keys(techStack).map((language) => (
                  <li
                    key={language}
                    className="bg-gray-200 px-3 py-1 cursor-pointer hover:bg-gray-300 rounded-full text-sm font-medium text-gray-700"
                  >
                    {language}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">
                Failed to fetch tech stack data...
              </p>
            )}
          </div>
        </div>
        <p className="text-gray-600 mt-4 line-clamp-3">
          {project.projectDescription}
        </p>
      </div>

      <div className="flex justify-between mt-4 gap-8">
        <button
          onClick={() => {
            window.open(project.projectLink, "_blank");
          }}
          className="border w-full hover:bg-slate-100 bg-white rounded p-2"
        >
          Live Link
        </button>
        <button
          onClick={() => {
            window.open(project.projectRepoLink, "_blank");
          }}
          className="border w-full hover:bg-slate-100 bg-white rounded p-2"
        >
          Repo Link
        </button>
      </div>
    </div>
  );
}
