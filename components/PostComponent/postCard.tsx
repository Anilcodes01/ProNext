"use client";
import { useState } from "react";
import {
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { BsPencilSquare } from "react-icons/bs";
import axios from "axios";
import { useSession } from "next-auth/react";
import { TbMessageReport } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { Post } from "@/types/types";
import { MdBlockFlipped } from "react-icons/md";
import { format } from "date-fns";
import { Toaster, toast } from "sonner";
import PostEngagementIcons from "./PostEngagementIcons";
import CardHeader from "./CardHeader";
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
  const { deletePost } = usePosts();

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

  const dropdownItems = isOwnPost
  ? [
      {
        icon: <BsPencilSquare />,
        label: 'Edit Post',
        onClick: () => router.push(`/post/${post.id}/edit`),
        className: 'hover:bg-gray-100 flex items-center cursor-pointer'
      },
      {
        icon: <Trash2 />,
        label: 'Delete Post',
        onClick: handleDelete,
        className: 'text-red-600 focus:text-red-600 flex items-center font-semibold hover:bg-gray-100 cursor-pointer focus:bg-red-50'
      }
    ]
  : [
      {
        icon: <TbMessageReport />,
        label: 'Report Post',
        onClick: handleReportPost,
        className: 'flex items-center'
      },
      {
        icon: <MdBlockFlipped />,
        label: `Block @${post.user.username}`,
        onClick: () => router.push(`/user/${post.user.id}/block`),
        className: 'text-red-600 focus:text-red-600 flex items-center font-semibold hover:bg-gray-100 cursor-pointer focus:bg-red-50'
      }
    ];

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
      <CardHeader
        user={post.user}
        date={formattedDate}
        onGeminiClick={handleGeminiClick}
        dropdownItems={dropdownItems}
      />

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

        <PostEngagementIcons
          liked={liked}
          bookmarked={bookmarked}
          likeCount={likeCount}
          commentCount={post.commentCount}
          onCommentClick={handlePostClick}
          onBookmarkClick={handleBookmarkToggle}
          onLikeClick={handleLikeToggle}
        />
      </div>
    </div>
  );
}
