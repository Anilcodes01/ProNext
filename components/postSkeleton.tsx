// components/Skeleton.tsx
export default function PostSkeleton() {
  return (
    <div className="col-span-6 w-full bg-gray-800  border-l border-r md:col-span-7  text-white lg:col-span-6 md:w-[100%]">
      <div className="animate-pulse w-full p-8">
      <div className="text-gray-500">
        <div className="animate-pulse w-full ">
          <div className="h-28 w-full mt-6 bg-gray-700 rounded-lg"></div>
          <div className="h-28 w-full mt-6 bg-gray-700 rounded-lg"></div>
          <div className="h-28 w-full mt-6 bg-gray-700 rounded-lg"></div>
          <div className="h-28 w-full mt-6 bg-gray-700 rounded-lg"></div>
          <div className="h-28 w-full mt-6 bg-gray-700 rounded-lg"></div>
          <div className="h-28 w-full mt-6 bg-gray-700 rounded-lg"></div>
          <div className="h-28 w-full mt-6 bg-gray-700 rounded-lg"></div>
        </div>
      </div>
       
      </div>
    </div>
  );
}
