"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  FaUserCircle,
  FaRegHeart,
  FaBookmark,
  FaHeart,
  FaRegCommentAlt,
  FaRegBookmark,
} from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Post } from "@/types/types";

export default function PostDetail() {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [commentContent, setCommentContent] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { data: session } = useSession();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const response = await axios.get(`/api/post/${id}`);
          setPost(response.data);
          setLoading(false);
        } catch (error) {
          setError("Failed to load post");
          console.log(error);
          setLoading(false);
        }
      };
      fetchPost();
    }
  }, [id]);

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!commentContent.trim()) return;

    setSubmitting(true);
    try {
      const newComment = {
        content: commentContent,
        postId: id,
        userId: session?.user.id,
      };

      const response = await axios.post(
        "/api/post/comments/addComments",
        newComment
      );

      setPost((prevPost) => {
        if (!prevPost) return null;
        return {
          ...prevPost,
          comments: [response.data, ...prevPost.comments],
        };
      });

      setCommentContent("");
    } catch (error) {
      console.error("Failed to submit comment:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div role="status" className="animate-pulse">
        <div className="h-32 w-full rounded-xl mt-4 bg-gray-200"></div>
      </div>
    );
  if (error) return <div>{error}</div>;
  if (!post) return <div>Post not found</div>;

 

  return (
    <div className="h-full overflow-y-auto mt-16 lg:mt-0 hide-scrollbar ">
      {loading ? (
        <div role="status" className="animate-pulse">
          <div className="h-32 w-full rounded-xl mt-4 bg-gray-200"></div>
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : !post ? (
        <div>Post not found</div>
      ) : (
        <>
          <div className="bg-white rounded-xl  mb-4">
            <div className="p-4">
              <div className="flex items-center mb-4">
                {post.user?.avatarUrl ? (
                  <Image
                    src={post.user.avatarUrl}
                    alt="User Profile"
                    width={250}
                    height={250}
                    quality={75}
                    className="rounded-full overflow-hidden h-10 w-10 object-cover cursor-pointer"
                  />
                ) : (
                  <FaUserCircle className="w-10 h-10 text-gray-500" />
                )}
                <div className="ml-4">
                  <div className="text-lg text-gray-600 font-semibold">
                    {post.user?.name || "Unknown User"}
                  </div>
                  <div className="text-xs text-gray-600">
                    {formatDistanceToNow(new Date(post.createdAt), {
                      addSuffix: true,
                    })}
                  </div>
                </div>
              </div>

              <div className="text-black mb-4 whitespace-pre-wrap">
                {post.content}
              </div>

              {post.image && (
                <div className="mb-6">
                  <Image
                    src={post.image}
                    alt="Post image"
                    width={600}
                    height={400}
                    layout="responsive"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
              )}

              <div className="flex gap-8">
                <button className="gap-1 flex items-center text-gray-400 hover:text-green-600">
                  {post.isLiked ? (
                    <FaHeart size={20} className="text-green-600" />
                  ) : (
                    <FaRegHeart size={20} />
                  )}
                  <span>{post.likeCount}</span>
                </button>

                <button className="text-gray-400 gap-1 hover:text-green-600 flex items-center">
                  <FaRegCommentAlt size={18} />
                  <span>{post.comments?.length || 0} </span>
                </button>

                <button className="text-gray-400 gap-1 hover:text-green-600 flex items-center">
                  <IoMdShare size={18} />
                </button>

                <button className="text-gray-400 gap-1 hover:text-green-600 flex items-center">
                  {post.isBookmarked ? (
                    <FaBookmark size={18} className="text-green-600" />
                  ) : (
                    <FaRegBookmark size={18} />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl  mb-4 p-4">
            <form onSubmit={handleCommentSubmit}>
              <textarea
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                rows={2}
                className="w-full p-3 border border-gray-300 rounded-lg text-black outline-none resize-none"
                placeholder="Write a comment..."
              />
              <button
                type="submit"
                className={`mt-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg ${
                  submitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Comment"}
              </button>
            </form>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Comments
            </h2>
            {post.comments.length > 0 ? (
              <div className="space-y-4">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center mb-2">
                      {comment.user?.avatarUrl ? (
                        <Image
                          src={comment.user.avatarUrl}
                          alt={comment.user.name || "User"}
                          width={152}
                          height={152}
                          className="rounded-full h-8 w-8 object-cover"
                        />
                      ) : (
                        <FaUserCircle className="w-6 h-6 text-gray-500" />
                      )}
                      <div className="ml-2 font-semibold text-gray-600">
                        {comment.user.name}
                      </div>
                      <div className="text-xs text-gray-500 ml-2">
                        {formatDistanceToNow(new Date(comment.createdAt), {
                          addSuffix: true,
                        })}
                      </div>
                    </div>
                    <div className="text-gray-700">{comment.content}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div>No comments yet.</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
