"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { signOut } from "next-auth/react";
import axios from "axios";

type User = {
  id: string;
  name: string;
  avatarUrl?: string;
};

export default function Search() {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const router = useRouter();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // To store the search query
  const [searchResults, setSearchResults] = useState<User[]>([]); // To store the search results
  const [isSearching, setIsSearching] = useState(false); // To track if searching is ongoing

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleDropdownClose = () => {
    setDropdownOpen(false);
  };

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

  return (
    <div className="bg-white min-h-screen">
        <div>
        <div className="bg-white text-black fixed border-b w-full justify-between h-16 flex items-center">
      <button onClick={() => router.push("/")} className="text-3xl font-bold ml-4">
        Rezin
      </button>

      {/* Search bar for larger screens */}
      <div className="w-1/2 relative  sm:block">
        <form className="max-w-md mx-auto">
          <div className="relative">
            <input
              type="search"
              id="default-search"
              className="block w-full p-2 bg-slate-100 ps-10 text-sm text-black outline-none rounded-full"
              placeholder="Search developers..."
              value={searchQuery}
              onChange={handleSearchChange}
              required
            />
          </div>
        </form>

        {/* Search results dropdown */}
        {searchResults.length > 0 && (
          <div className="absolute w-full bg-white border rounded-lg shadow-lg mt-2 z-10">
            {searchResults.map((user) => (
              <div
                key={user.id}
                className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => router.push(`/user/${user.id}`)}
              >
                {user.avatarUrl ? (
                  <Image src={user.avatarUrl} alt={user.name} width={28} height={28} className="rounded-full" />
                ) : (
                  <FaUserCircle size={28} className="text-gray-500" />
                )}
                <div className="ml-2">
                  <p className="font-semibold">{user.name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      
     

      <div className="mr-8 flex">
       
        <div>
          <div className="relative flex items-center ml-4 sm:ml-8">
            {session?.user ? (
              <>
                <div onClick={handleDropdownToggle} className="flex items-center">
                  {session?.user.avatarUrl ? (
                    <Image
                      src={session.user.avatarUrl}
                      alt="User Profile Picture"
                      width={28}
                      height={28}
                      className="rounded-full cursor-pointer border"
                    />
                  ) : (
                    <div className="flex items-center justify-center cursor-pointer h-7 w-7 rounded-full border bg-gray-200 text-black">
                      {session.user.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                {dropdownOpen && (
                  <div
                    className="absolute right-0 mt-64 w-48 bg-white border rounded-lg shadow-lg"
                    onMouseLeave={handleDropdownClose}
                  >
                    <div className="p-4 flex flex-col cursor-pointer items-center">
                      {session.user.avatarUrl ? (
                        <Image
                          src={session.user.avatarUrl}
                          alt="User Profile Picture"
                          width={40}
                          height={40}
                          className="rounded-full cursor-pointer border"
                        />
                      ) : (
                        <FaUserCircle size={40} className="text-gray-500" />
                      )}
                      <div className="mt-2 text-center">
                        <p className="font-semibold">{session.user.name}</p>
                        <p className="text-sm text-gray-600">{session.user.email}</p>
                      </div>
                      <div className="flex flex-col w-full mt-4">
                        <button
                          onClick={() => {
                            router.push(`/user/${userId}`);
                          }}
                          className="border hover:bg-gray-100 rounded-lg text-black w-full"
                        >
                          Profile
                        </button>
                        <button
                          onClick={() => {
                            signOut({ callbackUrl: "/auth/signin" });
                            handleDropdownClose();
                          }}
                          className="mt-2 px-4 border hover:bg-gray-100 text-black rounded-lg"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div onClick={() => router.push("/auth/signin")} className="hidden cursor-pointer sm:block">
                Signin
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
        </div>
    </div>
  );
}
