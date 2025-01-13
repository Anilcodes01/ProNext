"use client";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import FollowButton from "./follow";
import { FaArrowLeft } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";

interface User {
  id: string;
  name: string | null;
  avatarUrl: string | null;
  bio: string;
  website: string;
  city: string;
}

interface Follow {
  followingId: string;
}

export default function UserCard() {
  const [users, setUsers] = useState<User[]>([]);
  const [following, setFollowing] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredUser, setHoveredUser] = useState<User | null>(null);
  const [hoveredUserPosition, setHoveredUserPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUsersAndFollowing() {
      try {
        const [usersResponse, followingResponse] = await Promise.all([
          axios.get("/api/users"),
          axios.get("/api/follow"),
        ]);
        setUsers(usersResponse.data.users);
        console.log(usersResponse.data);
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
    <div className="border bg-gray-200 p-2 w-auto rounded-xl flex items-center gap-2 animate-pulse">
      <div className="bg-gray-200 rounded-full w-8 h-8"></div>
      <div className="flex justify-between gap-2 w-full">
        <div className="bg-gray-200 h-6 rounded-lg w-1/2"></div>
        <div className="bg-gray-200 h-2 rounded-full w-16"></div>
      </div>
    </div>
  );

  const handleMouseEnter = (event: React.MouseEvent, user: User) => {
    const { top, left } = event.currentTarget.getBoundingClientRect();
    setHoveredUserPosition({ top, left });
    setHoveredUser(user);
  };

  const handleMouseLeave = () => {
    setHoveredUser(null);
    setHoveredUserPosition(null);
  };

  return (
    <div className="bg-white text-black p-4 relative">
      {/* Mobile Back Button */}
      <div
        onClick={() => router.push("/")}
        className="flex gap-4 cursor-pointer mb-4 items-center hidden md:flex"
      >
        <div className="h-8 w-8 hover:bg-gray-200 flex items-center justify-center rounded-full">
          <FaArrowLeft size={20} className="text-black" />
        </div>
        <div className="text-xl text-black font-bold">Post</div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">All Users</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {loading ? (
          <>
            {[...Array(15)].map((_, index) => (
              <Skeleton key={index} />
            ))}
          </>
        ) : users.length > 0 ? (
          users.map((user) => (
            <div
              key={user.id}
              onClick={() => {
                router.push(`/user/${user.id}`);
              }}
              className="flex rounded-xl pl-2 border pr-2 w-full"
            >
              <div className="cursor-pointer w-full bg-white p-2 flex items-center gap-2">
                {user.avatarUrl ? (
                  <div
                    onMouseEnter={(event) => handleMouseEnter(event, user)}
                    onMouseLeave={handleMouseLeave}
                    className="w-8 h-8 rounded-full overflow-hidden"
                  >
                    <Image
                      src={user.avatarUrl}
                      alt={user.name || "null"}
                      width={200}
                      height={200}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center cursor-pointer h-8 w-8 rounded-full border bg-green-600 text-white">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="lg:text-xl text-lg font-medium">
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

      {hoveredUser && hoveredUserPosition && (
        <div
          className="absolute z-10 max-w-96 min-w-64 bg-white border rounded-lg shadow-lg p-4 transition-transform duration-300 ease-in-out"
          style={{
            top: `${hoveredUserPosition.top + window.scrollY}px`,
            left: `${hoveredUserPosition.left + window.scrollX}px`,
            transform: "translate(-50%, -100%)",
            opacity: 1,
          }}
        >
          <div className="flex flex-col items-start">
            {hoveredUser.avatarUrl ? (
              <Image
                src={hoveredUser.avatarUrl}
                alt={hoveredUser.name || "User Avatar"}
                width={192}
                height={192}
                className="rounded-full h-20 w-20 object-cover"
              />
            ) : (
              <FaUserCircle className="w-20 h-20 text-gray-400" />
            )}
            <div className="flex flex-col">
              <h2 className="font-bold text-lg">
                {hoveredUser.name || "Unnamed User"}
              </h2>
              <div className="flex gap-1">
                <IoLocationOutline />
                <p className="text-black text-sm">
                  {hoveredUser.city ? hoveredUser.city : "No city data"}
                </p>
              </div>
              <p className="text-sm">
                {hoveredUser.bio || "No bio available."}
              </p>
              <p className="text-sm">
                {hoveredUser.website ? (
                  <a
                    href={hoveredUser.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    {hoveredUser.website}
                  </a>
                ) : (
                  "No website available."
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
