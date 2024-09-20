'use client'

import Image from "next/image";
import { FaUserCircle, FaRegHeart, FaRegCommentAlt, FaRegBookmark } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { formatDistanceToNow } from 'date-fns';

interface User {
  name: string;
  avatarUrl?: string;  // Optional avatar URL
}

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string | Date;
  image?: string;
  user?: User;
}

export default function PostCard({ post }: { post: Post }) {
  const formattedDate = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
  });

  return (
    <div className="bg-black bg-gray-950 mt-4 cursor-pointer hover:bg-zinc-950 p-5 text-white border-white rounded-xl">
      <div className="flex items-center">
        {post.user?.avatarUrl ? (
          <Image
            src={post.user.avatarUrl}
            alt="User Profile"
            width={24}
            height={24}
            className="rounded-full object-cover"
          />
        ) : (
          <FaUserCircle className="w-6 h-6 text-white" />
        )}
        <div className="flex items-center ml-4">
          <div className="text-xl">{post.user?.name || "Unknown User"}</div>
          <div className="text-xs text-gray-200 ml-2">{formattedDate}</div>
        </div>
      </div>

      <div className="mt-2 ml-8 mr-8 ">
        <div className="whitespace-pre-wrap text-white">{post.content}</div>

        {post.image && (
          <div className="mt-3">
            <Image
              src={post.image}
              alt="Post image"
              width={550}
              height={300}
              layout="responsive"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        )}

        <div className="mt-3 ml-2 flex gap-8">
          <button className="text-gray-400 gap-1 hover:text-green-600 flex items-center">
            <FaRegHeart size={19} />
            <div className="text-sm">12</div>
          </button>
          <button className="text-gray-400 gap-1 hover:text-green-400 flex items-center">
            <FaRegCommentAlt size={18} />
            <div className="text-sm">6</div>
          </button>
          <button className="text-gray-400 gap-1 hover:text-green-600 flex items-center">
            <IoMdShare size={18} />
            <div className="text-sm">6</div>
          </button>
          <button className="text-gray-400 gap-1 flex hover:text-green-600 items-center">
            <FaRegBookmark size={18} />
            <div className="text-sm">6</div>
          </button>
        </div>
      </div>
    </div>
  );
}