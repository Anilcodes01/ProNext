"use client";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { Article } from "@/types/types";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BsPencilSquare } from "react-icons/bs";
import { Trash2 } from "lucide-react";
import { TbMessageReport } from "react-icons/tb";
import { MdBlockFlipped } from "react-icons/md";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  console.log(userId)
  const isOwnPost = userId === article.user.id;
  const router = useRouter();

  if (!article) {
    return <div className="text-red-500">Error: Article data is missing.</div>;
  }

  return (
    <Link href={`/articles/${article.id}`} passHref>
      <div className="bg-white cursor-pointer hover:bg-gray-100 border mt-4 rounded-lg w-full p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {article.user && article.user.avatarUrl ? (
              <Image
                src={article.user.avatarUrl}
                alt="User Profile"
                width={384}
                height={384}
                quality={75}
                className="rounded-full overflow-hidden h-10 w-10 object-cover cursor-pointer"
              />
            ) : (
              <FaUserCircle className="w-6 h-6 text-black" />
            )}
            <div className="ml-2 flex">
              <div className="text-lg text-black font-semibold">
                {article.user?.name || "Unknown User"}
              </div>
              <div className="text-sm text-black ml-2 mt-1">
                {" . "}
                {new Date(article.createdAt).toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger
              onClick={(e) => e.stopPropagation()}
              className=" hover:bg-gray-200 h-8 w-8 rounded-full flex items-center justify-center focus:outline-none"
            >
              <EllipsisVertical
                size={20}
                className=" text-gray-400 hover:text-green-600"
              />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              sideOffset={5}
              className="w-52 z-50"
            >
              {isOwnPost ? (
                <>
                  <DropdownMenuItem
                    className="hover:bg-gray-100 flex items-center cursor-pointer"
                    onClick={() => router.push("./edit")}
                  >
                    <BsPencilSquare />
                    Edit Post
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => router.push("/../")}
                    className="text-red-600 focus:text-red-600 flex items-center font-semibold hover:bg-gray-100 cursor-pointer focus:bg-red-50"
                  >
                    <Trash2 />
                    Delete Post
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem
                    onClick={() => router.push("./delted")}
                    className="flex items-center "
                  >
                    <TbMessageReport />
                    Report Post
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push(`/user/${article.user.id}/block`)}
                    className="text-red-600 focus:text-red-600 flex items-center font-semibold hover:bg-gray-100 cursor-pointer focus:bg-red-50"
                  >
                    <MdBlockFlipped />
                    Block @{article.user.name}
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex flex-col md:flex-row">
          <div
            className={`flex flex-col ${
              article.image ? "w-full md:w-3/4" : "w-full"
            } mb-4 md:mb-0`}
          >
            <div className="text-xl text-black font-semibold">
              {article.title}
            </div>
            <p className="text-gray-600 mt-2">
              {article.description.length > 200
                ? `${article.description.slice(0, 200)}...`
                : article.description}
            </p>
          </div>

          {article.image && (
            <div className="w-full md:w-1/4 mt-4 md:mt-0 md:ml-4 flex justify-center items-center">
              <Image
                src={article.image}
                alt={article.title}
                width={200}
                height={200}
                className="rounded-lg border object-cover w-full md:w-auto"
              />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
