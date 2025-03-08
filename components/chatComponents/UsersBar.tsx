"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { ExtendedUser } from "@/types/types";
import Image from "next/image";

interface UsersProps {
  onSelectUser: (user: ExtendedUser) => void;
  selectedUserId?: string;
  searchQuery?: string;
}

export default function Users({
  onSelectUser,
  selectedUserId,
  searchQuery = "",
}: UsersProps) {
  const [users, setUsers] = useState<ExtendedUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/messages/user");
        const data = await response.json();

        if (data.users) {
          setUsers(data.users);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user) {
      fetchUsers();
    }
  }, [session?.user]);

  const filteredUsers = users.filter((user) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      user.name?.toLowerCase().includes(searchTerm) ||
      user.email?.toLowerCase().includes(searchTerm)
    );
  });

  if (isLoading) {
    return (
      <div className="flex items-center hide-scrollbar justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (filteredUsers.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-gray-500">
          <p className="mb-2">
            {searchQuery ? "No users match your search" : "No users found"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full hide-scrollbar bg-white">
      <div className="">
        {filteredUsers.map((user) => (
          <button
            key={user.id}
            className={`w-full h-20 flex items-center space-x-3 transition-colors ${
              selectedUserId === user.id
                ? "bg-blue-50 hover:bg-blue-100"
                : "hover:bg-gray-50"
            }`}
            onClick={() => onSelectUser(user)}
          >
            <div
              className={`w-1 h-20 ${
                selectedUserId === user.id ? "bg-green-500" : ""
              }`}
            ></div>
            <div className="flex-shrink-0">
              {user.avatarUrl ? (
                <Image
                  width={200}
                  height={200}
                  src={user.image || user.avatarUrl}
                  alt={user.name || "User"}
                  className="h-10 w-10 object-cover rounded-full"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-medium text-lg">
                    {user.name?.charAt(0) || user.email?.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p
                className={`text font-medium ${
                  selectedUserId === user.id
                    ? "text-black-700"
                    : "text-black-900"
                } text-left truncate`}
              >
                {user.name || user.email}
              </p>
              <p className="text-xs text-gray-500 text-left truncate">
                {user.email}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
