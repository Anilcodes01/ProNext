"use client";

import Appbar from "@/components/appbar";
import PostDetail from "@/components/postDetails";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";

export default function Post() {
  const router = useRouter();


  return (
    <div className="bg-white min-h-screen">
      <div className="h-16">
        <Appbar />
      </div>
      <div className="flex">
        <div className="hidden md:block fixed w-52 lg:w-80 h-full">
          <Sidebar />
        </div>
        <div className="w-full ml-0 md:ml-52 lg:ml-80 lg:p-4 md:p-4 p-4 lg:mr-52 border-r border-l border-gray-200">
          
        <div onClick={() => {
                router.push('/')
             }} className="flex gap-4 cursor-pointer items-center">
             <div  className="h-8 w-8 hover:bg-gray-200 flex items-center justify-center  rounded-full ">
             <FaArrowLeft size={20} className="text-black rounded-full cursor-pointer"/>
             </div>
              <div className="text-xl text-black font-bold">Post</div>
            
            
          </div>
          <PostDetail />
        </div>
      </div>
     
    </div>
  );
}
