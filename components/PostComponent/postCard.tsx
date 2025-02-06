"use client";

import { useState } from "react";
import { SiGooglegemini } from "react-icons/si";
import {
  MessageCircleMore,
  Heart,
  BookmarkCheck,
  Share2,
  Dot,
  EllipsisVertical,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { FaHeart, FaBookmark } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import axios from "axios";
import { useSession } from "next-auth/react";
import { TbMessageReport } from "react-icons/tb";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Post } from "@/types/types";
import { MdBlockFlipped } from "react-icons/md";
import { format } from "date-fns";
import { Toaster, toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { usePosts } from "@/context/PostContext";

export default function PostCard({
  post,
  onGeminiClick,
}: {
  post: Post;
  onGeminiClick: (postContent: string) => void;
}) {
  const [liked, setLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [bookmarked, setBookmarked] = useState(post.isBookmarked);
  const [showFullContent, setShowFullContent] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const isOwnPost = userId === post.user.id;
  const {deletePost} = usePosts();

  const handleGeminiClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onGeminiClick(post.content);
  };

  const handlePostClick = () => {
    router.push(`/post/${post.id}`);
  };


  const handleReportPost = async () => {
    try {
      await axios.post("/api/post/report", { postId: post.id });
      alert("Post reported successfully");
    } catch (error) {
      console.error("Failed to report post:", error);
    }
  };

  const formattedDate = format(new Date(post.createdAt), "MMM dd");


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

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(post.id);
        toast.success("Post deleted successfully!");
        
      } catch (error) {
        console.error("Failed to delete post:", error);
        toast.error("Failed to delete the post. Please try again."); 
       
      }
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
    <div className="bg-white mt-4 cursor-pointer lg:hover:bg-gray-50 md:hover:bg-gray-100 p-4 sm:p-5 text-black border-gray-100 border rounded-xl">
        <Toaster />
      <div className="flex items-center justify-between overflow-hidden">
      
        <div className="flex items-center ">
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
              <span className="ml-2 text-gray-600 text-sm">
                <span className="hidden sm:inline">@{post.user.username}</span>
                <span className="inline sm:hidden">
                  @{post.user.username?.slice(0, 6)}...
                </span>
              </span>

              <Dot className="text-gray-400" />
             
              <div className="text-xs text-gray-600">{formattedDate}</div>
            </div>
          </Link>
        </div>
        <div className="flex items-center  gap-2">
          <div
            onClick={handleGeminiClick}
            className="text-gray-400  hover:text-green-600 hover:bg-gray-200 p-1 rounded-full"
          >
            <SiGooglegemini size={24} className="" />
            <span className="absolute top-full mt-1 hidden w-max text-xs font-semibold text-green-600 bg-white rounded-lg px-2 py-1 shadow-lg group-hover:flex">
              ProBot
            </span>
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
                    onClick={() => router.push(`/post/${post.id}/edit`)}
                    className="hover:bg-gray-100 flex items-center cursor-pointer"
                  >
                    <BsPencilSquare />
                    Edit Post
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleDelete}
                    className="text-red-600 focus:text-red-600 flex items-center font-semibold hover:bg-gray-100 cursor-pointer focus:bg-red-50"
                  >
                    <Trash2 />
                    Delete Post
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem
                    onClick={handleReportPost}
                    className="flex items-center "
                  >
                    <TbMessageReport />
                    Report Post
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push(`/user/${post.user.id}/block`)}
                    className="text-red-600 focus:text-red-600 flex items-center font-semibold hover:bg-gray-100 cursor-pointer focus:bg-red-50"
                  >
                    <MdBlockFlipped />
                    Block @{post.user.username}
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
