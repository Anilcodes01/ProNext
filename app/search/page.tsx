"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { signOut } from "next-auth/react";
import axios from "axios";
import FeaturedDevelopers from "@/components/featuredUsers";
import Sidebar from "@/components/Sidebar";
import TrendingProjects from "@/components/TrendingProjects";

type User = {
  id: string;
  name?: string;
  avatarUrl?: string;
  email?: string;
};

export default function Search() {
  const { data: session } = useSession();
  const userId = session?.user?.id ?? "";

  const router = useRouter();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    if (searchResults.length > 0) {
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  }, [searchResults]);

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      setIsSearching(true);
      try {
        const response = await axios.get(`/api/users/search?query=${query}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsSearching(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  const UserAvatar = ({
    user,
    size = "md",
  }: {
    user: User;
    size?: "sm" | "md" | "lg";
  }) => {
    const sizeClasses = {
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-12 w-12",
    };

    return user.avatarUrl ? (
      <Image
        src={user.avatarUrl}
        alt={`${user.name}'s Profile Picture`}
        width={192}
        height={192}
        className={`rounded-full object-cover border ${sizeClasses[size]}`}
      />
    ) : (
      <div
        className={`flex items-center justify-center rounded-full border bg-green-600 text-white ${sizeClasses[size]}`}
      >
        {user.name?.charAt(0).toUpperCase()}
      </div>
    );
  };

  return (
    <div className="bg-white min-h-screen">
      <header className="bg-white border-b fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-2 flex items-center justify-between h-16">
          <button
            onClick={() => router.push("/")}
            className="text-2xl font-bold text-black transition"
          >
            ProNext
          </button>

          <div className="flex-1 max-w-xl mx-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="search"
                className="block w-full pl-10 pr-4 py-2 text-black bg-gray-100 rounded-full text-sm outline-none"
                placeholder="Search developers..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {isSearching && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="animate-spin h-4 w-4 border-2 border-green-500 border-t-transparent rounded-full" />
                </div>
              )}
            </div>
          </div>

          <div className="relative">
            {session?.user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 hover:opacity-80 transition"
                >
                  <Image
                    src={session.user.avatarUrl || "/default-avatar.png"}
                    alt="user"
                    width={196}
                    height={196}
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border animate-fadeIn">
                    <div className="p-4">
                      <div className="flex items-center space-x-3">
                        <Image
                          src={session.user.avatarUrl || "/default-avatar.png"}
                          alt="user"
                          width={196}
                          height={196}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate">
                            {session.user.name}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {session.user.email}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 space-y-2">
                        <button
                          onClick={() => router.push(`/user/${userId}`)}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 rounded-md transition"
                        >
                          View Profile
                        </button>
                        <button
                          onClick={() =>
                            signOut({ callbackUrl: "/auth/signin" })
                          }
                          className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded-md transition"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => router.push("/auth/signin")}
                className="px-4 py-2 text-green-600 hover:bg-green-50 rounded-md transition"
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="hidden md:block w-64 fixed h-[calc(100vh-4rem)] border-r bg-white">
          <Sidebar />
        </aside>

        <main className="flex-1 mt-16 md:ml-64">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div
              className={`transition-all duration-500 ease-in-out ${
                showSearchResults
                  ? "opacity-100"
                  : "opacity-0 h-0 overflow-hidden"
              }`}
            >
              {searchResults.length > 0 && (
                <div className="mb-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {searchResults.map((user) => (
                      <button
                        key={user.id}
                        onClick={() => router.push(`/user/${user.id}`)}
                        className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition"
                      >
                        <UserAvatar user={user} size="lg" />
                        <p className="mt-2 text-sm font-medium text-gray-900 text-center">
                          {user.name}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div
              className={`w-full transition-all duration-500 ease-in-out transform ${
                showSearchResults ? "translate-y-0" : "-translate-y-4"
              }`}
            >
              <FeaturedDevelopers />
              <TrendingProjects />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
