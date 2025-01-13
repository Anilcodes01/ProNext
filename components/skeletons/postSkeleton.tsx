

export default function PostSkeleton() {
  return (
    <div>
      <div className="bg-white w-full min-h-screen">
        <div className=" w-full">
          <div>
          <div className="text-2xl sm:text-3xl w-full text-black font-bold">
        Welcome back,!
      </div>
          </div>
          
          <div role="status" className="animate-pulse">
            <div className="text-4xl font-bold">{/* all articles */}</div>

            <div className="mt-12">
              <div className="h-32 bg-gray-200 rounded-lg dark-gray-300 w-full mb-4"></div>
              <div className="h-32 bg-gray-200 rounded-lg dark-gray-300 w-full mb-4"></div>
              <div className="h-32 bg-gray-200 rounded-lg dark-gray-300 w-full mb-4"></div>
              <div className="h-32 bg-gray-200 rounded-lg dark-gray-300 w-full mb-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
