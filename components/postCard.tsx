"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FaUserCircle,
  FaRegHeart,
  FaHeart,
  FaRegCommentAlt,
  FaRegBookmark,
  FaBookmark,
} from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface User {
  name: string;
  avatarUrl?: string;
  
}

interface Post {
  id: string;
  content: string;
  createdAt: string | Date;
  image?: string;
  user?: User;
  isLiked: boolean;
  likeCount: number;
  commentCount: number;
  isBookmarked: boolean;
}

export default function PostCard({ post }: { post: Post }) {
  const [liked, setLiked] = useState(post.isLiked); 
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [bookmarked, setBookmarked] = useState(post.isBookmarked);
  const router = useRouter();

  const handlePostClick = () => {
    router.push(`/post/${post.id}`);
  };

  const { data: session } = useSession();
  const userId = session?.user?.id;

  const formattedDate = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
  });

  const handleLikeToggle = async () => {
    if (!userId) {
      console.error("User not logged in");
      return;
    }

    try {
      if (liked) {
        await axios.post("/api/post/unlike", { postId: post.id, userId });
        setLikeCount((prev) => prev - 1);
      } else {
        await axios.post("/api/post/like", { postId: post.id, userId });
        setLikeCount((prev) => prev + 1);
      }
      setLiked(!liked);
    } catch (error) {
      console.error("Failed to like/unlike the post:", error);
    }
  };

  const handleBookmarkToggle = async () => {
    if (!userId) {
      console.error("User not logged in");
      return;
    }

    try {
      if (bookmarked) {
        await axios.post("/api/post/unbookmark", { postId: post.id });
      } else {
        await axios.post("/api/post/bookmark", { postId: post.id });
      }
      setBookmarked(!bookmarked);
    } catch (error) {
      console.error("Failed to bookmark/unbookmark the post:", error);
    }
  };

  return (
    <div className="bg-white mt-4 cursor-pointer hover:bg-gray-100 p-5 text-black border-gray-200 border rounded-xl">
      <div className="flex items-center">
        {post.user?.avatarUrl ? (
          <Image
            
            src={post.user.avatarUrl}
            alt="User Profile"
            width={34}
            height={34}
            quality={75}
            className="rounded-full object-cover"
           
          />
        ) : (
          <FaUserCircle
           
            
            className="w-6 h-6 text-black"
          />
        )}
        <div className="flex items-center ml-4">
          <div
            
            className="text-xl"
            
          >
            {post.user?.name || "Unknown User"}
          </div>
          <div className="text-xs text-gray-600 ml-2">{formattedDate}</div>
        </div>
      </div>

      <div className="mt-2 lg:ml-8 lg:mr-8 ml-8 mr-">
        <div
          onClick={handlePostClick}
          className="whitespace-pre-wrap text-black"
        >
          {post.content}
        </div>
        {post.image && (
          <div onClick={handlePostClick} className="mt-3">
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
          <button
            className={`gap-1 flex items-center ${
              liked ? "text-red-500" : "text-gray-400"
            } hover:text-red-600`}
            onClick={handleLikeToggle}
          >
            {liked ? <FaHeart size={19} /> : <FaRegHeart size={19} />}{" "}
            {/* Conditional rendering based on liked state */}
            <div className="text-sm">{likeCount}</div>
          </button>

          <button
            onClick={handlePostClick}
            className="text-gray-400 gap-1 hover:text-green-400 flex items-center"
          >
            <FaRegCommentAlt size={18} />
            <div className="text-sm">{post.commentCount}</div>
          </button>

          <button className="text-gray-400 gap-1 hover:text-green-600 flex items-center">
            <IoMdShare size={18} />
            <div className="text-sm">6</div>
          </button>

          {/* Bookmark Button */}
          <button
            className={`text-gray-400 gap-1 flex hover:text-green-600 items-center ${
              bookmarked ? "text-green-600" : "text-gray-400"
            }`}
            onClick={handleBookmarkToggle}
          >
            {bookmarked ? (
              <FaBookmark size={18} />
            ) : (
              <FaRegBookmark size={18} />
            )}
            <div className="text-sm">Save</div>
          </button>
        </div>
      </div>
    </div>
  );
}
