import Appbar from "./appbar";

export default function AllArticleSkeleton() {
  return (
    <div>
      <div className="bg-gray-800 w-full min-h-screen">
        <div className=" w-full">
          <div role="status" className="animate-pulse">
            <div className="text-4xl font-bold">{/* all articles */}</div>

            <div className="mt-12">
              <div className="h-32 bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-4"></div>
              <div className="h-32 bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-4"></div>
              <div className="h-32 bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-4"></div>
              <div className="h-32 bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
