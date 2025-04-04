import Sidebar from "../Sidebar";
export default function OneArticleSkeleton() {
  return (
    <div className="bg-white w-full min-h-screen">
      <div className="flex min-h-screen">
        <div className="hidden md:block fixed w-52 lg:w-80 h-full">
          <Sidebar />
        </div>
        <div className="w-full ml-0  p-4 md:ml-52 lg:ml-80 border-l lg:p-8  border-gray-200">
          <div className="">
            <div className="h-16 w-1/2 mt-4 dark:bg-gray-200  rounded"></div>
            <div className="flex gap-4 mt-6">
              <div className="w-8 h-8 bg-gray-200 rounded-full "></div>
              <div className="w-64 h-8 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="p-8">
            <div className="h-6 w-full rounded bg-gray-200 mb-3"></div>
            <div className="h-6 w-full rounded bg-gray-200 mb-3"></div>
            <div className="h-6 w-3/4 rounded bg-gray-200 mb-8"></div>
            <div className="h-6 w-full rounded bg-gray-200 mb-3"></div>
            <div className="h-6 w-2/3 rounded bg-gray-200 mb-8"></div>
            <div className="h-6 w-full rounded bg-gray-200 mb-3"></div>
            <div className="h-6 w-full rounded bg-gray-200 mb-3"></div>
            <div className="h-6 w-1/2 rounded bg-gray-200 mb-8"></div>
            <div className="h-6 w-full rounded bg-gray-200 mb-3"></div>
            <div className="h-6 w-full rounded bg-gray-200 mb-3"></div>
            <div className="h-6 w-3/4 rounded bg-gray-200 mb-8"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
