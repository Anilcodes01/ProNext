"use client";
import { useState, useEffect } from "react";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { MessageSquare } from "lucide-react";
import { ExtendedUser } from "@/types/types";

export default function Users({
  onSelectUser,
}: {
  onSelectUser: (user: ExtendedUser) => void;
}) {
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-gray-500">
          <p className="mb-2">No users found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white">
      <div className=" space-y-2">
        {users.map((user) => (
          <button
            key={user.id}
            className="w-full p-3 flex items-center space-x-3 hover:bg-gray-50 transition-colors rounded-lg"
            onClick={() => onSelectUser(user)}
          >
            <div className="flex-shrink-0">
              {user.avatarUrl ? (
                <img
                  src={user.image || user.avatarUrl}
                  alt={user.name || "User"}
                  className="h-10 w-10 rounded-full"
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
              <p className="text-sm font-medium text-gray-900 text-left truncate">
                {user.name || user.email}
              </p>
              <p className="text-xs text-gray-500 text-left truncate">
                {user.email}
              </p>
            </div>
            <MessageSquare className="w-5 h-5 text-gray-400" />
          </button>
        ))}
      </div>
    </div>
  );
}
