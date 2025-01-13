"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import TrendingProjectCard from "./TrendingProjectCard";

interface ProjectCard {
  id: string;
  projectName: string;
  projectDescription: string;
  projectLink: string;
}

export default function TrendingProjects() {
  const { data: session, status } = useSession();
  const [projects, setProjects] = useState<ProjectCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingProjects = async () => {
      if (status === "loading") return;
      
      if (!session) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("/api/project/TrendingProjects");
        const fetchedProjects = Array.isArray(response.data.projects)
          ? response.data.projects
          : [];
        setProjects(fetchedProjects);
      } catch (error) {
        console.log("Error while fetching trending projects", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingProjects();
  }, [session, status]);

  if (status === "loading" || loading) {
    return (
      <div className="text-black text-4xl flex items-center justify-center font-bold">
        Loading...!
      </div>
    );
  }

  if (!session) {
    return (
      <div className="text-black text-center mt-4">
        Please sign in to view trending projects
      </div>
    );
  }

  return (
    <div className="mt-8">
      <span className="text-2xl font-bold text-black">Trending Projects</span>
      <div className="mt-4 flex flex-col gap-4">
        {projects.map((project, index) => (
          <TrendingProjectCard
            key={project.id ?? `post-${index}`}
            project={project}
          />
        ))}
      </div>
    </div>
  );
}