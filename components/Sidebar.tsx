"use client";
import { GoHome } from "react-icons/go";
import { MdPeopleOutline } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FiMessageSquare } from "react-icons/fi";
import { GoBookmark } from "react-icons/go";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
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

export default function Sidebar({ isMobile }: { isMobile?: boolean }) {
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
          setUserProfile(userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [userId]);

  return (
    <div className={`bg-white ${isMobile ? "w-full flex-row justify-around" : "w-full flex-col"} flex items-center h-full md:h-screen text-black`}>
      {/* Navigation buttons */}
      <div className={`${isMobile ? "flex justify-around w-full p-2" : "flex flex-col w-full text-center p-4 gap-4"}`}>
        <div className="flex gap-2 items-center cursor-pointer hover:bg-slate-200 rounded-lg p-2 hover:text-black">
          <GoHome onClick={() => router.push("/")} size={24} />
          {!isMobile && (
            <button
              onClick={() => router.push("/")}
              className="text-xl w-full items-center flex"
            >
              Home
            </button>
          )}
        </div>
        <div className="flex gap-2 items-center cursor-pointer hover:bg-slate-200 rounded-lg p-2 hover:text-black">
          <FiMessageSquare size={22} />
          {!isMobile && <button className="text-xl">Messages</button>}
        </div>
        <div className="flex gap-2 items-center cursor-pointer hover:bg-slate-200 rounded-lg p-2 hover:text-black">
          <MdPeopleOutline  onClick={() => router.push("/network")} size={24} />
          {!isMobile && (
            <button
              onClick={() => router.push("/network")}
              className="text-xl w-full flex items-start"
            >
              Network
            </button>
          )}
        </div>
        <div className="flex gap-2 items-center cursor-pointer hover:bg-slate-200 rounded-lg p-2 hover:text-black">
          <GoBookmark onClick={() => router.push("/bookmarks")} size={24} />
          {!isMobile && (
            <button
              onClick={() => router.push("/bookmarks")}
              className="text-xl w-full flex items-start"
            >
              Bookmarks
            </button>
          )}
        </div>
        <div className="flex gap-2 items-center cursor-pointer hover:bg-slate-200 rounded-lg p-2 hover:text-black">
          <IoDocumentTextOutline onClick={() => {
            router.push('/articles')
          }} size={24} />
          {!isMobile && (
            <button
              onClick={() => router.push("/articles")}
              className="text-xl w-full flex items-start"
            >
              Articles
            </button>
          )}
        </div>
      </div>

      {/* User profile */}
      {!isMobile && (
        <div className="text-black w-full mt-auto p-4 flex flex-col gap-2">
          <div
            onClick={() => router.push(`/user/${userId}`)}
            className="flex gap-2 items-center bg-slate-100 p-2 cursor-pointer hover:bg-slate-200 rounded-lg hover:text-black"
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
                <FaUserCircle size={32} className="text-gray-500" />
              )}
            </div>
            <button className="text-xl text-black">{userProfile?.name}</button>
          </div>
        </div>
      )}
    </div>
  );
}
