import Appbar from "./appbar";
export default function OneArticleSkeleton() {
  return (
    <div className="bg-gray-800 w-full min-h-screen">
      <div>
        <Appbar />
      </div>
      <div className="p-8">
        <div className="h-16 w-1/2 dark:bg-gray-700  rounded"></div>
        <div className="flex gap-4 mt-6">
          <div className="w-8 h-8 bg-gray-700 rounded-full "></div>
          <div className="w-64 h-8 bg-gray-700 rounded"></div>
        </div>
      </div>
      <div className="p-8">
        <div className="h-6 w-full rounded bg-gray-700 mb-3"></div>
        <div className="h-6 w-full rounded bg-gray-700 mb-3"></div>
        <div className="h-6 w-3/4 rounded bg-gray-700 mb-8"></div>
        <div className="h-6 w-full rounded bg-gray-700 mb-3"></div>
        <div className="h-6 w-2/3 rounded bg-gray-700 mb-8"></div>
        <div className="h-6 w-full rounded bg-gray-700 mb-3"></div>
        <div className="h-6 w-full rounded bg-gray-700 mb-3"></div>
        <div className="h-6 w-1/2 rounded bg-gray-700 mb-8"></div>
        <div className="h-6 w-full rounded bg-gray-700 mb-3"></div>
        <div className="h-6 w-full rounded bg-gray-700 mb-3"></div>
        <div className="h-6 w-3/4 rounded bg-gray-700 mb-8"></div>
       
        
      </div>
    </div>
  );
}
