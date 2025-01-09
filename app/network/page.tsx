"use client";

import UserCard from "@/components/userCard";
import Sidebar from "@/components/Sidebar";

export default function Network() {
  return (
    <div className="bg-white min-h-screen">
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-10">
        <div className="hidden md:block fixed w-52 lg:w-80 h-full">
          <Sidebar />
        </div>

        <div className="col-span-1 md:mt-12  w-full bg-white md:ml-52 lg:ml-80 border-l border-r md:col-span-7 text-black">
          <div className="w-full p-2">
            <UserCard />
          </div>
        </div>
      </div>
    </div>
  );
}
