'use client';

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

interface User {
  id: string;
  name: string | null;
  avatarUrl: string | null;
}

export default function UserCard() {
  const [users, setUsers] = useState<User[]>([]);
  const [following, setFollowing] = useState<string[]>([]); 

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get('/api/users');
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
    fetchUsers();
  }, []);

  const handleFollow = (userId: string) => {
    if (following.includes(userId)) {
      setFollowing(following.filter(id => id !== userId)); // Unfollow
    } else {
      setFollowing([...following, userId]); // Follow
    }
  };



  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h2 className="text-2xl font-semibold mb-4 ">All Users</h2>
      <div className="grid grid-cols-2  md:grid-cols-1 lg:grid-cols-3 gap-4">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="border bg-gray-800 p-2 w-auto rounded-lg flex  items-center gap-2 ">
              {user.avatarUrl ? (
                <Image
                  src={user.avatarUrl}
                  alt={user.name || "null"}
                  width={64}
                  height={64}
                  className="rounded-full object-cover"
                />
              ) : (
                <FaUserCircle className="w-8 h-8 text-gray-400" />
              )}
              <div className="text-center w-full justify-between mr-2 flex gap-4">
                <div className="text-xl font-medium">{user.name || "Unnamed User"}</div>
                <button
                  onClick={() => handleFollow(user.id)}
                  className={` p-1 text-sm font-medium rounded-full ${
                    following.includes(user.id) ? "bg-red-500 text-white" : "bg-blue-500 text-white"
                  }`}
                >
                  {following.includes(user.id) ? "Unfollow" : "Follow"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
}
