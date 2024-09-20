"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MdOutlineNotifications } from "react-icons/md";
import { signOut } from "next-auth/react";

export default function Appbar() {
  const { data: session } = useSession();
  const router = useRouter();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleDropdownClose = () => {
    setDropdownOpen(false);
  };

 

  return (
    <div className="bg-darkBlue sticky-top-0 border-b text-white   justify-between h-16 flex items-center">
      <button
        onClick={() => {
          router.push("/");
        }}
        className="text-3xl font-bold ml-8"
      >
        ProNext
      </button>
      <div className="w-1/2">
        <div className="w-full">
          <form className="max-w-md mx-auto">
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-2 bg-slate-100 ps-10 text-sm text-black outline-none  rounded-full bg-black  text-black  dark:placeholder-gray-400   "
                placeholder="Search developers, posts, articles..."
                required
              />
            </div>
          </form>
        </div>
      </div>
      <div className="mr-8  flex ">
        <MdOutlineNotifications
          size={28}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="0"
        />
        <div>
          <div className="relative flex items-center ml-4 sm:ml-8">
            {session?.user ? (
              <>
                <div
                  onClick={handleDropdownToggle}
                  className="flex items-center"
                >
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
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
                    className="absolute right-0 mt-48 sm:mt-48 w-48 bg-white border rounded-lg shadow-lg"
                    onMouseLeave={handleDropdownClose}
                  >
                    <div className="p-4 flex flex-col cursor-pointer items-center">
                      {session.user.image && (
                        <Image
                          src={session.user.image}
                          alt="User Profile Picture"
                          width={40}
                          height={40}
                          className="rounded-full cursor-pointer border"
                        />
                      )}
                      <div className="mt-2 text-center">
                        <p className="font-bold">{session.user.name}</p>
                        <p className="text-sm text-gray-600">
                          {session.user.email}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          signOut({
                            callbackUrl: "/auth/signin",
                          });
                          handleDropdownClose();
                        }}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div
                onClick={() => {
                  router.push("/auth/signin");
                }}
                className="hidden sm:block"
              >
                Signin
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
