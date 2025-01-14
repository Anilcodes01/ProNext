"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FeaturedDevelopersSkeleton from "./skeletons/FeaturedDevelopersSkeleton";

interface User {
  id: string;
  name: string;
  username: string;
  avatarUrl?: string;
}

export default function FeaturedDevelopers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [followingState, setFollowingState] = useState<Record<string, boolean>>(
    {}
  );
  const router = useRouter();

  useEffect(() => {
    const fetchFeaturedDevelopers = async () => {
      try {
        const response = await axios.get("/api/users/featuredDevelopers");
        const usersData = response.data.featuredDevelopers;
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching featured developers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedDevelopers();
  }, []);

  const handleFollow = (userId: string) => {
    setFollowingState((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  const UserAvatar = ({ user }: { user: User }) =>
    user.avatarUrl ? (
      <Image
        src={user.avatarUrl}
        alt={`${user.name}'s profile`}
        width={250}
        height={250}
        quality={75}
        className="rounded-full h-12 w-12 object-cover transition-transform hover:scale-105"
      />
    ) : (
      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white font-medium text-lg transition-transform hover:scale-105">
        {user.name?.charAt(0).toUpperCase()}
      </div>
    );

  if (loading) {
    return <FeaturedDevelopersSkeleton />;
  }

  if (!users.length) {
    return (
      <div className="p-6 text-center bg-white rounded-lg shadow-sm">
        <div className="text-gray-500">No featured developers found</div>
      </div>
    );
  }

  return (
    <div className=" mt-2">
      <h2 className="font-bold text-2xl mb-4 flex items-center">
        <span className="bg-gradient-to-r from-green-500 to-green-600 text-black bg-clip-text">
          Featured Developers
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="group relative  p-4 rounded-lg border border-gray-100 hover:border-green-600 transition-all duration-300 "
          >
            <div className="flex items-center justify-between">
              <div
                onClick={() => router.push(`/user/${user.id}`)}
                className="flex items-start space-x-4 cursor-pointer"
              >
                <UserAvatar user={user} />

                <div className="flex flex-col">
                  <span className="font-medium text-gray-900 hover:text-green-600 transition-colors">
                    {user.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    @{user.username}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleFollow(user.id)}
                className={`
                  flex items-center justify-center px-2 py-1 rounded-full text-sm font-medium
                  transition-all duration-300 text-green-600 border-green-600 hover:bg-sky-50
                  ${
                    followingState[user.id]
                      ? "bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                      : "border border-gray-200 hover:border-green-400 hover:text-green-600"
                  }
                `}
              >
                {followingState[user.id] ? "Following" : "Follow"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
