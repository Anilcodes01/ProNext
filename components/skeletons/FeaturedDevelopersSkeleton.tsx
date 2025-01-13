import React from 'react';

const FeaturedDevelopersSkeleton = () => {
  return (
    <div className="p-2">
      <h2 className="font-bold text-2xl mb-4 flex items-center">
        <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className="group relative p-4 rounded-lg border border-gray-100 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-start space-x-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse"></div>

                <div className="flex flex-col space-y-2">
                  <div className="h-5 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
              </div>

              <div className="h-8 w-20 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedDevelopersSkeleton;