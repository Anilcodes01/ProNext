"use client";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import FollowButton from "./follow"; 

interface User {
  id: string;
  name: string | null;
  avatarUrl: string | null;
}

interface Follow {
  followingId: string;
}

export default function UserCard() {
  const [users, setUsers] = useState<User[]>([]);
  const [following, setFollowing] = useState<string[]>([]); 
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchUsersAndFollowing() {
      try {
        const [usersResponse, followingResponse] = await Promise.all([
          axios.get("/api/users"), 
          axios.get("/api/follow"), 
        ]);
        setUsers(usersResponse.data.users);
        setFollowing(
          followingResponse.data.following.map(
            (follow: Follow) => follow.followingId 
          )
        ); 
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsersAndFollowing();
  }, []);

  const Skeleton = () => (
    <div className="border bg-gray-200 p-2 w-auto rounded-lg flex items-center gap-2 animate-pulse">
      <div className="bg-gray-200 rounded-full w-8 h-8"></div>
      <div className="flex justify-between gap-2 w-full">
        <div className="bg-gray-200 h-6 rounded-lg w-1/2"></div>
        <div className="bg-gray-200 h-2 rounded-full w-16"></div>
      </div>
    </div>
  );

  return (
    <div className="bg-white text-black rounded-lg p-4">
      <h2 className="text-2xl font-semibold mb-4">All Users</h2>
      <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-4">
        {loading ? (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        ) : users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="flex rounded-lg border pr-2 w-full"> 
              <div
                onClick={() => {
                  router.push(`/user/${user.id}`);
                }}
                className="cursor-pointer w-full bg-white p-2 w-auto flex items-center gap-2"
              >
                {user.avatarUrl ? (
                   <div className="w-8 h-8 rounded-full overflow-hidden"> 
                   <Image
                     src={user.avatarUrl}
                     alt={user.name || "null"}
                     width={32} 
                     height={32}
                     className="object-cover w-full h-full" 
                   />
                 </div>
                ) : (
                  <FaUserCircle className="w-8 h-8 text-gray-400" />
                )}
                <div className="text-xl font-medium">
                  {user.name || "Unnamed User"}
                </div>
              </div>

              <FollowButton
                isFollowing={following.includes(user.id)} 
                followingId={user.id} 
              />
            </div>
          ))
        ) : (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        )}
      </div>
    </div>
  );
}
