'use client'

import Appbar from "@/components/appbar"
import UserCard from '@/components/userCard'
import Sidebar from "@/components/Sidebar"


export default function Network() {

    return <div className="bg-gray-800 min-h-screen">
        <div className="">
            <Appbar />
        </div>
        <div className="grid min-h-screen     grid-cols-10">
        {/* Sidebar */}
        <div className="col-span-2 md:col-span-3  lg:col-span-2  bg-gray-100">
          <Sidebar />
        </div>
        {/* Main content */}
        <div className="col-span-6 w-full bg-gray-800  border-l border-r md:col-span-7  text-white lg:col-span-6 md:w-[100%]">
          <UserCard />
        </div>
        
        
      </div>
    </div>
}