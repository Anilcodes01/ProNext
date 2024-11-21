'use client'
import Appbar from "@/components/appbar";
import Sidebar from "@/components/Sidebar";
import PollList from "@/components/poll";
import { useState } from "react";

export default function PollPage() {
    const [pollsUpdatedCount, setPollsUpdatedCount] = useState(0); 

    console.log(setPollsUpdatedCount)

    return (
        <div className="bg-white min-h-screen">
            <div className="h-16">
                <Appbar />
            </div>
            <div className="flex">
                <div className="fixed w-52 lg:w-80 h-full">
                    <Sidebar />
                </div>
                <div className="ml-52 border-l p-6 min-h-screen w-full lg:ml-80 border-r border-gray-200 lg:mr-52">
                 
                    
                    
                    <PollList key={pollsUpdatedCount} />
                </div>
            </div>
        </div>
    );
}
