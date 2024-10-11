"use client";
import { GoHome } from "react-icons/go";
import { MdPeopleOutline } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FiMessageSquare } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { GoBookmark } from "react-icons/go";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

interface UserProfile {
    id: string;
    name: string;
    avatarUrl?: string;
    createdAt: string;
    bio?: string;
    website?: string;
    city?: string;
  }

export default function Sidebar() {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const router = useRouter();
  const { data: session } = useSession();

  const userId = session?.user?.id;

  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`/api/users/${userId}`);
          const userData = response.data.user;
          console.log(userData)
          setUserProfile(userData);
          
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      
      fetchUserData(); 
    }
  }, [userId]); 

  return (
    <div className="bg-white   w-full flex flex-col items-center  h-screen text-black">
      <div className="flex  flex-col w-full text-center p-4 gap-4">
        <div className="flex gap-2 mt-4  w-full items-center justify-center cursor-pointer hover:bg-slate-200 rounded-lg p-2 hover:text-black">
          <GoHome size={24} />
          <button
            onClick={() => {
              router.push("/");
            }}
            className="text-xl  w-full items-center  flex "
          >
            Home
          </button>
        </div>
        <div className="flex gap-2 w-full items-center cursor-pointer hover:bg-slate-200 rounded-lg p-2 hover:text-black">
          <FiMessageSquare size={22} />
          <button className="text-xl ">Messages</button>
        </div>
        <div className="flex gap-2 items-center w-full cursor-pointer hover:bg-slate-200 rounded-lg p-2 hover:text-black">
          <MdPeopleOutline size={24} />
          <button
            onClick={() => {
              router.push("/network");
            }}
            className="text-xl flex items-start  w-full"
          >
            Network
          </button>
        </div>
        <div className="flex gap-2 items-center w-full cursor-pointer hover:bg-slate-200 rounded-lg p-2 hover:text-black">
          <GoBookmark size={24} />
          <button
            onClick={() => {
              router.push("/bookmarks");
            }}
            className="text-xl flex items-start  w-full"
          >
            Bookmarks
          </button>
        </div>
        <div className="flex gap-2 w-full items-center cursor-pointer hover:bg-slate-200 rounded-lg p-2 hover:text-black">
          <IoDocumentTextOutline size={24} />
          <button
            onClick={() => {
              router.push("/articles");
            }}
            className="text-xl w-full flex   items-start "
          >
            Aritcles
          </button>
        </div>
      
      </div>
      <div className="text-black  w-full mt-64 p-4 mt-2 flex flex-col gap-2">
        <div
          onClick={() => {
            router.push(`/user/${userId}`);
          }}
          className="flex gap-2 items-center bg-slate-100 p-2 cursor-pointer hover:bg-slate-200 rounded-lg   hover:text-black"
        >
          <div>
            {session?.user.avatarUrl ? (
              <Image
                src={session.user.avatarUrl}
                alt="User Profile Picture"
                width={32}
                height={32}
                className="rounded-full cursor-pointer border"
              />
            ) : (
              <FaUserCircle size={32} className="text-gray-500" /> // Larger fallback icon
            )}
          </div>
          <button className="text-xl text-black">
            {userProfile?.name}
          </button>
        </div>
      </div>
    </div>
  );
}
