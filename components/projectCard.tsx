"use client";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from 'axios'

interface ProjectCardProps {
  project: {
    id: string;
    projectName: string;
    projectDescription: string;
    createdAt: string;
    image: string;
    userId: string;
    projectLink: string;
    projectRepoLink: string;
    user: {
      name: string;
      avatarUrl: string;
    };
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [techStack, setTechStack] = useState<{ [key: string]: number } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTechStack = async (repoUrl: string) => {
    const regex = /github\.com\/([^/]+)\/([^/]+)/;
    const match = repoUrl.match(regex);
  
    if (!match) {
      throw new Error("Invalid GitHub URL");
    }
  
    const owner = match[1];
    const repo = match[2];
  
    try {
      const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/languages`);
      return response.data;
    } catch (error) {
      console.error("Error fetching tech stack:", error);
      return null;
    }
  };
  

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

  if (!project) {
    return <div>Error, project data is missing.</div>;
  }

  return (
    <div className="bg-neutral-50 shadow-lg mt-4  hover:shadow-xl transition-shadow duration-300 border border-gray-200 rounded-lg w-full p-5">
      {/* User Info */}
      <div className="flex items-center mb-4">
        {project.user && project.user.avatarUrl ? (
          <Image
            src={project.user.avatarUrl}
            alt="User Profile"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        ) : (
          <FaUserCircle className="w-10 h-10 text-gray-500" />
        )}
        <div className="ml-3">
          <div className="text-lg text-gray-900 font-semibold">
            {project.user?.name || "Unknown User"}
          </div>
          <div className="text-sm text-gray-500">
            Posted on{" "}
            {new Date(project.createdAt).toLocaleDateString(undefined, {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
        </div>
      </div>

      {/* Project Image */}
      <div className=" h-60 border mr-6 rounded overflow-hidden mb-4">
        <Image
          src={project.image}
          alt={project.projectName}
          width={500}
          height={400}
          quality={90}
          className="rounded"
        />
      </div>

      {/* Project Details */}
      <div className="flex flex-col items-start">
       <div className="flex items-center gap-4 w-full  justify-between">
       <h3 className="text-2xl font-bold text-gray-900">{project.projectName}</h3>
        <div className="">
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
          <p className="text-gray-500">Failed to fetch tech stack data...</p>
        )}
      </div>
       </div>
        <p className="text-gray-600 mt-4 line-clamp-3">{project.projectDescription}</p>
      </div>

      {/* Tech Stack */}
     

      {/* Links */}
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
          className="border w-full hover:bg-slate-100 bg-white  rounded p-2"
        >
          Repo Link
        </button>
      </div>
    </div>
  );
}
