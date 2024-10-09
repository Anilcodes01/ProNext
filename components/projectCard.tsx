import Image from "next/image";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

interface ProjectCardProps {
  project: {
    id: string;
    projectName: string;
    projectDescription: string;
    createdAt: string;
    image: string;
    userId: string;
    user: {
      name: string;
      avatarUrl: string;
    };
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  if (!project) {
    return <div>Error, project data is missing.</div>;
  }

  return (
    <Link href={`/projects/${project.id}`} passHref>
      <div className="bg-white shadow-lg mt-4 cursor-pointer hover:shadow-xl transition-shadow duration-300 border border-gray-200 rounded-lg w-full p-5">
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
        <div className="relative  h-60 border mr-6 rounded overflow-hidden mb-4">
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
          <h3 className="text-2xl font-bold text-gray-900">
            {project.projectName}
          </h3>
          <p className="text-gray-600 mt-2 line-clamp-3">
            {project.projectDescription}
          </p>
        </div>
      </div>
    </Link>
  );
}
