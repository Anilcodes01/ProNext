"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import { useUsers } from "@/context/UsersContext";
import { useEffect } from "react";

export default function UserCard() {
  const { users, loading, error, fetchUsers } =
    useUsers();
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (error) {
    return (
      <div className="flex items-center justify-center text-red-600 font-bold text-xl">
        <p>Error while fetching users...!</p>
      </div>
    );
  }

  const Skeleton = () => (
    <div className="border bg-gray-200 p-2 w-auto rounded-xl flex items-center gap-2 animate-pulse">
      <div className="bg-gray-200 rounded-full w-8 h-8"></div>
      <div className="flex justify-between gap-2 w-full">
        <div className="bg-gray-200 h-6 rounded-lg w-1/2"></div>
        <div className="bg-gray-200 h-2 rounded-full w-16"></div>
      </div>
    </div>
  );

  return (
    <div className="bg-white text-black p-4 relative">
      <div
        onClick={() => router.push("/")}
        className=" gap-4 cursor-pointer mb-4 items-center hidden md:flex"
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
                  <div className="w-8 h-8 rounded-full overflow-hidden">
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
