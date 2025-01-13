import { Star } from "lucide-react";
import { MoveRight } from "lucide-react";
import Link from "next/link";

interface ProjectCard {
  id: string;
  projectName: string;
  projectDescription: string;
  projectLink: string;
}

export default function TrendingProjectCard({
  project,
}: {
  project: ProjectCard;
}) {
  return (
    <div className="border border-gray-200  rounded-lg p-4">
      <div className="flex mb-4 justify-between">
        <span className="text-base text-black">{project.projectName}</span>

        <div className="bg-sky-100 px-2  rounded-full text-[14px] flex items-center text-green-500">
          Popular
        </div>
      </div>
      <span className="text-[14px]  text-gray-600 ">
        {project.projectDescription}
      </span>
      <div className="flex mt-4 justify-between">
        <div className="flex items-center gap-1 text-gray-500 text-[14px]">
          <Star size={20} />
          <span>2.5k</span>
        </div>

        <div className="flex items-center gap-1 ">
          <Link href={project.projectLink}>
            <button className="text-green-600 text-[14px]">View Project</button>
          </Link>
          <MoveRight size={20} className="text-green-600" />
        </div>
      </div>
    </div>
  );
}
