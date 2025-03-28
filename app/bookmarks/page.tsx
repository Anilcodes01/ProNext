"use client";

import BookmarkComponent from "@/components/PostComponent/bookmark";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";

export default function BookmarkPage() {
  const router = useRouter();

  return (
    <div className="bg-white min-h-screen">
    
      <div className="flex">
        <div className="hidden md:block fixed w-52 lg:w-80 h-full">
          <Sidebar />
        </div>
        <div className="w-full ml-0 md:ml-52 mt-16 md:mt-0 lg:ml-80 lg:p-4 md:p-4 p-4 lg:mr-52 hide-scrollbar h-screen overflow-y-auto border-r border-l border-gray-200">
         
          <div
            onClick={() => {
              router.push("/");
            }}
            className=" gap-4 mt-4 md:mt-16 cursor-pointer items-center hidden md:flex" 
          >
            <div className="h-8 w-8 hover:bg-gray-200 flex items-center justify-center rounded-full">
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
