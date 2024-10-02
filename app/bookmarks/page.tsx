"use client";
import Appbar from "@/components/appbar";
import BookmarkComponent from "@/components/bookmark";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";

export default function BookmarkPage() {
  const router = useRouter();

  return (
    <div className="bg-white min-h-screen">
      <div>
        <Appbar />
      </div>
      <div className="flex">
        <div className=" fixed w-52 mt-16 lg:w-80 h-full ">
          <Sidebar />
        </div>
        <div className="ml-52 min-h-screen p-6 border-l mt-12 w-full lg:ml-80 border-r border-gray-200 lg:mr-52 ">
          <div
            onClick={() => {
              router.push("/");
            }}
            className="flex gap-4 mt-4 cursor-pointer items-center"
          >
            <div className="h-8 w-8 hover:bg-gray-200 flex items-center justify-center  rounded-full ">
              <FaArrowLeft
                size={20}
                className="text-black rounded-full cursor-pointer"
              />
            </div>
            <div className="text-xl text-black font-bold">Posts</div>
          </div>
          <BookmarkComponent />
        </div>
      </div>
    </div>
  );
}
