export default function SuggestedUsersSkeleton() {
  return (
    <div className="flex flex-col gap-4 border border-gray-100 rounded-lg p-4">
      <Skeleton />
      <Skeleton />
    </div>
  );
}

const Skeleton = () => {
  return (
    <div className=" flex flex-col">
      <span className="bg-gray-200 rounded-lg h-6 w-1/2"></span>
      <div className="flex flex-col gap-4 ">
        <div className="flex gap-2 justify-between items-center">
          <div className="flex mt-4">
            <div className="h-10 w-10 rounded-full bg-gray-200"></div>
            <div className="flex ml-3 gap-2 flex-col">
              <span className="text-base ml-1 h-4 w-24 bg-gray-200 rounded-lg"></span>
              <span className="text-[12px] h-3 w-32 rounded-lg bg-gray-200 text-gray-400"></span>
            </div>
          </div>

          <button className=" rounded-full h-6 bg-gray-200 w-20"></button>
        </div>
      </div>
    </div>
  );
};
