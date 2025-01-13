import React from "react";

const TrendingProjectsSkeleton = () => {
  return (
    <div className="mt-8">
      <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
      <div className="mt-4 flex flex-col gap-4">
        <ProjectSkeleton />
        <ProjectSkeleton />
        <ProjectSkeleton />
      </div>
    </div>
  );
};

const ProjectSkeleton = () => {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="h-8 w-44 bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
      </div>

      <div className="space-y-2">
        <div className="h-4 w-full bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="h-4 w-3/4 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="h-4 w-20 bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="h-4 w-28 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
};

export default TrendingProjectsSkeleton;
