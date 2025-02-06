"use client";
import Image from "next/image";
import { useEffect } from "react";
import SuggestedUsersSkeleton from "../skeletons/SuggestedUsersSkeleton";
import { useRouter } from "next/navigation";
import { ExtendedUser } from "@/types/types";
import { useUsers } from "@/context/UsersContext";

const getRandomUsers = (users: ExtendedUser[], count: number) => {
  const shuffled = [...users].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default function SuggestedUsers() {
  const { users, loading, error, fetchUsers } = useUsers();
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) {
    return (
      <div>
        <SuggestedUsersSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        Error loading suggested users
      </div>
    );
  }

  const suggestedUsers = getRandomUsers(users, 2);
  return (
    <div className="border border-gray-100 text-black gap-4 rounded-lg flex flex-col p-4">
      <span>Who to follow</span>
      <div className="flex flex-col gap-4 ">
        {suggestedUsers.map((user) => (
          <div
            key={user.id}
            className="flex gap-2 justify-between items-center"
          >
            <div
              onClick={() => {
                router.push(`/user/${user.id}`);
              }}
              className="flex cursor-pointer"
            >
              {user.avatarUrl ? (
                <Image
                  src={user.avatarUrl || ""}
                  alt="User Profile"
                  width={250}
                  height={250}
                  quality={75}
                  className="rounded-full overflow-hidden h-10 w-10 object-cover cursor-pointer"
                />
              ) : (
                <div>
                  <div className="flex items-center justify-center cursor-pointer h-10 w-10 rounded-full border bg-green-600 text-white">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                </div>
              )}
              <div className="flex ml-3 flex-col">
                <span className="text-base ml-1">{user.name}</span>
                <span className="text-[12px] text-gray-400">
                  @{user.username}
                </span>
              </div>
            </div>

            <button className="border rounded-full px-2 py-1 text-[14px] hover:bg-sky-50 border-green-500 text-green-600">
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
