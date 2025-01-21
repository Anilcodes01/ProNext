export default function UserComponentSkeleton() {
  return (
    <div className="min-h-screen">
      <div className="min-h-screen flex flex-col gap-6 overflow-x-hidden p-5">
        <div className=" flex flex-col gap-4 ">
          <div className="rounded-full h-48 w-48 bg-gray-200 animate-pulse" />
          <div className="p lg:mr-16 h-48 w-96">
            <div className="h-8 bg-gray-200 animate-pulse w-32 rounded mb-2" />
            <div className="h-6 bg-gray-200 animate-pulse rounded mb-2" />
            <div className="h-6 bg-gray-200 animate-pulse rounded w-64 mb-2" />
            <div className="h-6 bg-gray-200 animate-pulse rounded w-56 mb-2" />
            <div className="h-6 bg-gray-200 animate-pulse rounded w-48 mb-2" />
          </div>
        </div>
        <div className="h-12 w-40 animate-pulse rounded bg-gray-200 "></div>
        <div className="h-28 rounded animate-pulse bg-gray-200 mt-8"></div>
        <div className="h-28 rounded animate-pulse bg-gray-200  "></div>
        <div className="h-28 rounded animate-pulse bg-gray-200 "></div>
      </div>
    </div>
  );
}
