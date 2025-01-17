"use client";

import { useState } from "react";
import Image from "next/image";
import { MessageCircleMore } from "lucide-react";
import { Heart } from "lucide-react";
import { BookmarkCheck } from "lucide-react";
import {  FaHeart, FaBookmark } from "react-icons/fa";
import { Share2 } from "lucide-react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Dot } from "lucide-react";

interface User {
  id: string;
  name: string;
  username: string;
  avatarUrl?: string;
}

interface Post {
  id: string;
  content: string | null;
  createdAt: string | Date;
  image?: string;
  user: User;
  isLiked: boolean;
  likeCount: number;
  commentCount: number;
  isBookmarked: boolean;
}

export default function PostCard({ post }: { post: Post }) {
  const [liked, setLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [bookmarked, setBookmarked] = useState(post.isBookmarked);
  const [showFullContent, setShowFullContent] = useState(false);
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

  const contentLength = post.content?.length ?? 0;
  const shouldTruncate = contentLength > 300;

  return (
    <div className="bg-white mt-4 cursor-pointer lg:hover:bg-gray-100 md:hover:bg-gray-100 p-5 text-black border-gray-100 border rounded-xl">
      <div className="flex items-center overflow-hidden">
        {post.user?.avatarUrl ? (
          <Link href={`/user/${post.user.id}`} passHref>
            <Image
              src={post.user.avatarUrl}
              alt="User Profile"
              width={250}
              height={250}
              quality={75}
              className="rounded-full overflow-hidden h-8 w-8 object-cover cursor-pointer"
            />
          </Link>
        ) : (
          <Link href={`/user/${post.user.id}`} passHref>
            <div className="flex items-center justify-center cursor-pointer h-8 w-8 rounded-full border bg-green-600 text-white">
              {post.user.name?.charAt(0).toUpperCase()}
            </div>
          </Link>
        )}
        <Link href={`/user/${post.user.id}`} passHref>
          <div className="flex items-center  ml-2 cursor-pointer">
            <div className="text-[18px] ">
              {post.user?.name || "Unknown User"}
            </div>
            <span className="ml-2 text-gray-600 text-sm ">
              @{post.user.username}
            </span>
            <Dot className="text-gray-400" />
            <div className="text-xs text-gray-600">{formattedDate}</div>
          </div>
        </Link>
      </div>

      <div className="mt-2 lg:ml-8 lg:mr-8 ml-8 mr-">
        <div
          onClick={handlePostClick}
          className="whitespace-pre-wrap text-base text-gray-600"
        >
          {post.content ? (
            showFullContent || !shouldTruncate ? (
              post.content
            ) : (
              `${post.content.slice(0, 200)}...`
            )
          ) : (
            <span className="text-gray-500 italic">No content available</span>
          )}
        </div>
        {shouldTruncate && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowFullContent(!showFullContent);
            }}
            className="text-blue-500 text-sm mt-2 hover:underline"
          >
            {showFullContent ? "Show Less" : "Read More"}
          </button>
        )}
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
              liked ? "text-green-600" : "text-gray-500"
            } hover:text-green-600`}
            onClick={handleLikeToggle}
          >
            {liked ? <FaHeart size={20} /> : <Heart size={20} />}
            {likeCount > 0 && <div className="text-sm">{likeCount}</div>}
          </button>

          <button
            onClick={handlePostClick}
            className="text-gray-500 gap-1 hover:text-green-600 flex items-center"
          >
            <MessageCircleMore size={20} />
            {post.commentCount > 0 && (
              <div className="text-sm">{post.commentCount}</div>
            )}
          </button>

          <button className="text-gray-500 gap-1 hover:text-green-600 flex items-center">
            <Share2 size={20} />
            <div className="text-sm">6</div>
          </button>

          <button
            className={`gap-1 flex items-center ${
              bookmarked ? "text-green-600" : "text-gray-500"
            } hover:text-green-600`}
            onClick={handleBookmarkToggle}
          >
            {bookmarked ? (
              <FaBookmark size={20} />
            ) : (
              <BookmarkCheck size={20} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
