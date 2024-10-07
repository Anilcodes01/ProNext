'use client'
import { GoHome } from "react-icons/go";
import { MdPeopleOutline } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { CgPoll } from "react-icons/cg";
import { LuMessageSquare } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { GoBookmark } from "react-icons/go";


export default function Sidebar() {
    const router = useRouter();

    return <div className="bg-white   w-full flex flex-col items-center  h-full text-black">
        <div className="flex flex-col w-full text-center p-4 gap-4">
           <div className="flex gap-2 mt-4  w-full items-center justify-center cursor-pointer hover:bg-slate-200 rounded-lg p-2 hover:text-black">
           <GoHome size={24}/>
           <button onClick={() => {
            router.push('/')
           }}  className="text-xl  w-full items-center  flex ">Home</button>
           </div>
           <div className="flex gap-2 w-full items-center cursor-pointer hover:bg-slate-200 rounded-lg p-2 hover:text-black">
           <LuMessageSquare size={22}  />
           <button className="text-xl ">Messages</button>
           </div>
           <div   className="flex gap-2 items-center w-full cursor-pointer hover:bg-slate-200 rounded-lg p-2 hover:text-black">
           <MdPeopleOutline size={24}/>
           <button onClick={() => {
            router.push('/network')
           }} className="text-xl flex items-start  w-full">Network</button>
           </div>
           <div   className="flex gap-2 items-center w-full cursor-pointer hover:bg-slate-200 rounded-lg p-2 hover:text-black">
           <GoBookmark size={24}/>
           <button onClick={() => {
            router.push('/bookmarks')
           }} className="text-xl flex items-start  w-full">Bookmarks</button>
           </div>
           <div className="flex gap-2 w-full items-center cursor-pointer hover:bg-slate-200 rounded-lg p-2 hover:text-black">
           <IoDocumentTextOutline size={24}/>
           <button onClick={() => {
            router.push('/articles')
           }} className="text-xl w-full flex   items-start ">Aritcles</button>
           </div>
           <div onClick={() => {
            router.push('/polls')
           }} className="flex gap-2 items-center cursor-pointer hover:bg-slate-200 rounded-lg p-2 hover:text-black">
           <CgPoll size={24}/>
           <button className="text-xl">Polls</button>
           </div>
        </div>
        <div className="text-white p-4 mt-2 flex flex-col gap-2">
           
        </div>
    </div>
}