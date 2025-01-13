"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import TrendingProjectCard from "./TrendingProjectCard";
import TrendingProjectsSkeleton from "./skeletons/TrendingProjectsSkeleton";

interface ProjectCard {
  id: string;
  projectName: string;
  projectDescription: string;
  projectLink: string;
}

export default function TrendingProjects() {
  const [projects, setProjects] = useState<ProjectCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingProjects = async () => {
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
  }, []);

  if (loading) {
    return (
      <div>
        <TrendingProjectsSkeleton />
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
