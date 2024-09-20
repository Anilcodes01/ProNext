'use client'
import { GoHome } from "react-icons/go";
import { MdPeopleOutline } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { CgPoll } from "react-icons/cg";
import { LuMessageSquare } from "react-icons/lu";
import { useRouter } from "next/navigation";


export default function Sidebar() {
    const router = useRouter();

    return <div className="bg-gray-800  flex flex-col w-full h-full text-white">
        <div className="flex flex-col  p-4 gap-4">
           <div className="flex gap-2 mt-4  w-full items-center cursor-pointer hover:bg-gray-700 rounded-lg p-2 hover:text-white">
           <GoHome size={24}/>
           <button onClick={() => {
            router.push('/dashboard')
           }}  className="text-xl  w-full items-start flex ">Home</button>
           </div>
           <div className="flex gap-2 w-full items-center cursor-pointer hover:bg-gray-700 rounded-lg p-2 hover:text-white">
           <LuMessageSquare size={22}  />
           <button className="text-xl ">Messages</button>
           </div>
           <div   className="flex gap-2 items-center w-full cursor-pointer hover:bg-gray-700 rounded-lg p-2 hover:text-white">
           <MdPeopleOutline size={24}/>
           <button onClick={() => {
            router.push('/network')
           }} className="text-xl flex items-start  w-full">Network</button>
           </div>
           <div className="flex gap-2 w-full items-center cursor-pointer hover:bg-gray-700 rounded-lg p-2 hover:text-white">
           <IoDocumentTextOutline size={24}/>
           <button onClick={() => {
            router.push('/articles')
           }} className="text-xl w-full flex   items-start ">Aritcles</button>
           </div>
           <div className="flex gap-2 items-center cursor-pointer hover:bg-gray-700 rounded-lg p-2 hover:text-white">
           <CgPoll size={24}/>
           <button className="text-xl">Polls</button>
           </div>
        </div>
        <div className="text-white p-4 mt-2 flex flex-col gap-2">
           <div className="text-white text-xl font-bold">Trending Topics</div>
           <div className="flex flex-col gap-1 items-start ">
           <button className="text-green-300 text-xl hover:underline ">#WebDevelopment</button>
           <button className="text-green-300 text-xl hover:underline">#Javascript</button>
           <button className="text-green-300 text-xl hover:underline">#OpenSource</button>
           <button className="text-green-300 text-xl hover:underline">#CodingTips</button>
           </div>
        </div>
    </div>
}