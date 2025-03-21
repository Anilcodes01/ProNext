export default function PostSkeleton() {
  return (
    <div>
      <div className="bg-white w-full min-h-screen">
        <div className=" w-full">
          <div role="status" className="animate-pulse">
            <div className="mt-4">
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
