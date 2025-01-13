export default function SuggesstionbarSkeleton() {
  return (
    <div className="flex flex-col border border-gray-100 rounded-lg gap-6 p-4 h-auto">
      <Skeleton />
      <Skeleton />
    </div>
  );
}

const Skeleton = () => {
  return (
    <div className="  flex flex-col h-auto">
      <div className="flex gap-2">
        <span className="text-base bg-gray-200 rounded-md w-full h-6 font-medium"></span>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <span className="bg-gray-200 rounded-md h-6 w-full"></span>
        <span className="bg-gray-200  rounded-md h-4 w-full"></span>
        <span className="bg-gray-200  rounded-md h-4 w-1/2"></span>
      </div>
      <span className="bg-gray-200 mt-4 text-start rounded-md w-1/3 h-4"></span>
    </div>
  );
};
