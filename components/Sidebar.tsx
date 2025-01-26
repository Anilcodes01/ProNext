"use client";
import { GoHome } from "react-icons/go";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MessageCircleMore } from "lucide-react";
import { GoBookmark } from "react-icons/go";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Search } from "lucide-react";
import Image from "next/image";
import { Globe } from "lucide-react";

export default function Sidebar({ isMobile }: { isMobile?: boolean }) {
  const router = useRouter();
  const { data: session } = useSession();

  const userId = session?.user?.id;

  return (
    <div
      className={`bg-white ${
        isMobile ? "w-full flex-row  justify-around" : "w-full flex-col"
      } flex items-center  md:mt-16  text-black`}
    >
      <div
        className={`${
          isMobile
            ? "flex justify-around w-full p-2"
            : "flex flex-col w-full text-center p-4 gap-4"
        }`}
      >
        <div
          onClick={() => router.push("/")}
          className="flex gap-2 items-center cursor-pointer hover:bg-sky-50 rounded-lg p-2 hover:text-green-600"
        >
          <GoHome onClick={() => router.push("/")} size={24} />
          {!isMobile && (
            <button
              onClick={() => router.push("/")}
              className="text-base w-full  items-center flex"
            >
              Home
            </button>
          )}
        </div>
        <div
          onClick={() => router.push("/search")}
          className="flex gap-2 items-center cursor-pointer hover:bg-sky-50 rounded-lg p-2 hover:text-green-600"
        >
          <Search onClick={() => router.push("/search")} size={24} />
          {!isMobile && (
            <button
              onClick={() => router.push("/search")}
              className="text-base w-full items-center flex"
            >
              Explore
            </button>
          )}
        </div>
        <div
          onClick={() => router.push("/chat")}
          className="flex gap-2 items-center cursor-pointer hover:bg-sky-50 rounded-lg p-2 hover:text-green-600"
        >
          <MessageCircleMore onClick={() => router.push("/chat")} size={22} />
          {!isMobile && (
            <button
              onClick={() => {
                router.push("/chat");
              }}
              className="text-base"
            >
              Messages
            </button>
          )}
        </div>
        <div
          onClick={() => router.push("/network")}
          className="flex gap-2 items-center cursor-pointer hover:bg-sky-50 rounded-lg p-2 hover:text-green-600"
        >
          <Globe onClick={() => router.push("/network")} size={24} />
          {!isMobile && (
            <button
              onClick={() => router.push("/network")}
              className="text-base w-full flex items-start"
            >
              Network
            </button>
          )}
        </div>

        <div
          onClick={() => {
            router.push("/articles");
          }}
          className="flex gap-2 items-center cursor-pointer hover:bg-sky-50 rounded-lg p-2 hover:text-green-600"
        >
          <IoDocumentTextOutline
            onClick={() => {
              router.push("/articles");
            }}
            size={24}
          />
          {!isMobile && (
            <button
              onClick={() => router.push("/articles")}
              className="text-base w-full flex items-start"
            >
              Articles
            </button>
          )}
        </div>

        {!isMobile ? (
          <div
            onClick={() => router.push("/bookmarks")}
            className="flex gap-2 items-center cursor-pointer hover:bg-sky-50 rounded-lg p-2 hover:text-green-600"
          >
            <GoBookmark onClick={() => router.push("/bookmarks")} size={24} />
            <button
              onClick={() => router.push("/bookmarks")}
              className="text-base w-full flex items-start"
            >
              Bookmarks
            </button>
          </div>
        ) : (
          <div
            onClick={() => {
              router.push(`/user/${userId}`);
            }}
            className="flex gap-2 items-center cursor-pointer hover:bg-sky-50 rounded-lg p-2 hover:text-green-600"
          >
            <div
              onClick={() => {
                router.push(`/user/${userId}`);
              }}
              className="flex h-8 w-8 overflow-hidden items-center"
            >
              {session?.user.avatarUrl ? (
                <Image
                  src={session.user.avatarUrl}
                  alt="User Profile Picture"
                  width={100}
                  height={100}
                  className="rounded-full h-8 w-8 overflow-hidden object-cover cursor-pointer"
                />
              ) : (
                <div className="flex items-center justify-center cursor-pointer h-7 w-7 rounded-full border bg-gray-200 text-green-600">
                  {session?.user.name?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
