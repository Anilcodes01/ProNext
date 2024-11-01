"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MdOutlineNotifications } from "react-icons/md"; 
import { FaUserCircle } from "react-icons/fa";
import { TbSearch } from "react-icons/tb";
import { signOut } from "next-auth/react";
import axios from "axios";

type User = {
  id: string;
  name: string;
  avatarUrl?: string;
};

export default function Appbar() {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const router = useRouter();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [searchResults, setSearchResults] = useState<User[]>([]); 
  const [isSearching, setIsSearching] = useState(false); 

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  console.log(isSearching)
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
    <div className="bg-white text-black z-50 fixed border-b w-full justify-between h-16 flex items-center">
      <button onClick={() => router.push("/")} className="lg:text-3xl text-2xl ml-4 font-bold lg:ml-8">
        Rezin
      </button>

      {/* Search bar for larger screens */}
      <div className="w-1/2 relative hidden sm:block">
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
                  <Image src={user.avatarUrl} alt={user.name} width={192} height={192} className="rounded-full h-10 w-10 object-cover" />
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

      {/* Search icon for mobile screens */}
      <span className="block sm:hidden rounded-full  ">
        <TbSearch
          size={24}
          className="cursor-pointer ml-28  rounded-full   hover:bg-slate-200 "
          onClick={() => router.push("/search")} // Redirect to search page
        />
      </span>


      <div className="mr-4  lg:mr-8 justify-between flex">
  <MdOutlineNotifications className="mt-1" size={24} strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" />
  <div>
    <div className="relative flex items-center lg:ml-4 ml-4">
      {session?.user ? (
        <>
          <div onClick={handleDropdownToggle} className="flex h-8 w-8 overflow-hidden items-center">
            {session?.user.avatarUrl ? (
              <Image
                src={session.user.avatarUrl}
                alt="User Profile Picture"
                width={192}
                height={192}
                className="rounded-full h-8 w-8 overflow-hidden object-cover cursor-pointer"
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
                    width={192}
                    height={192}
                    className="rounded-full h-12 w-12 overflow-hidden object-cover cursor-pointer border"
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
        <div onClick={() => router.push("/auth/signin")} className="cursor-pointer sm:block block">
          Signin
        </div>
      )}
    </div>
  </div>
</div>

    </div>
  );
}
