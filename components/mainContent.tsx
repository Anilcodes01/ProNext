"use client";
import { useSession } from "next-auth/react";
import { useState, useRef } from "react";
import { FaImage } from "react-icons/fa6";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { SiGooglegemini } from "react-icons/si";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import Image from "next/image";
import { MdOutlineArticle } from "react-icons/md";
import { useRouter } from "next/navigation";
import EmojiPicker from "emoji-picker-react";
import { EmojiClickData } from "emoji-picker-react";
import PostList from "./postList";
import { Post } from "@/types/types";
import NoSession from "./skeletons/mainContentSkeleton/noSession";
import { Toaster, toast } from "sonner";

export default function MainContent() {
  const { data: session } = useSession();
  const [postContent, setPostContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [newPost, setNewPost] = useState<Post | null>(null);
  const [aiLoading, setAILoading] = useState(false);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAIPostContentEnhancement = async () => {
    if (!postContent.trim()) {
      toast.error("Post content is missing...!", {
        description: "Please write something to enhance it...!",
        duration: 4000,
        position: "top-right",
      });
      return;
    }

    setAILoading(true);

    try {
      const response = await axios.post("/api/ai/enhancePostContent", {
        content: postContent,
      });

      setPostContent(response.data.enhancedContent);
    } catch (error) {
      console.error("Failed to enchance post content", error);
      toast.error("AI Enhancement Failed", {
        description: "Unable to enhance your post. Please try again.",
        duration: 4000,
        position: "top-right",
      });
      setAILoading(false);
    } finally {
      setAILoading(false);
    }
  };

  const handlePostSubmission = async () => {
    if (!postContent.trim() && !selectedImage) {
      setError("Post content or image is required!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("content", postContent);
      formData.append("userId", session?.user?.id || "");
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const response = await axios.post("/api/post/createPost", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.createPost && response.data.createPost.id) {
        const createdPost: Post = {
          id: response.data.createPost.id,
          content: postContent,
          userId: session?.user?.id || "",
          user: {
            id: session?.user?.id || "",
            name: session?.user?.name || "",
            username: session?.user?.name || "",
            avatarUrl: session?.user?.avatarUrl,
          },
          image: response.data.createPost.imageUrl || undefined,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isLiked: false,
          likeCount: 0,
          commentCount: 0,
          comments: [],
          isBookmarked: false,
        };

        setNewPost(createdPost);

        setPostContent("");
        setSelectedImage(null);
        setPreviewUrl(null);
      } else {
        console.error("Unexpected response structure:", response.data);
        setError("Error creating post. Please try again.");
      }
    } catch (error) {
      console.error("Error while posting!", error);
      setError("Failed to create post. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmojiSelect = (emojiObject: EmojiClickData) => {
    setPostContent((prevContent) => prevContent + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  if (loading) {
    return (
      <div className="flex items-center hide-scrollbar justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return <NoSession />;
  }

  return (
    <div className="p-4 mt-12 overflow-x-hidden  w-full">
      <Toaster />
      <div className="border border-gray-100 w-full bg-white rounded-xl mt-8 p-4">
        <div className="flex items-start border-b border-gray-100">
          <div className="h-12 w-12 overflow-hidden">
            {session?.user.avatarUrl ? (
              <Image
                src={session.user.avatarUrl}
                alt="User Profile Picture"
                width={192}
                height={192}
                className="rounded-full w-8 h-8 object-cover overflow-hidden cursor-pointer "
              />
            ) : (
              <div className="flex items-center justify-center cursor-pointer h-10 w-10 rounded-full border bg-green-600 text-white">
                {session?.user.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <textarea
            value={postContent}
            onChange={(e) => {
              setPostContent(e.target.value);

              const textarea = e.target;
              textarea.style.height = "auto";
              textarea.style.height = `${textarea.scrollHeight}px`;
            }}
            rows={1}
            className="outline-none hide-scrollbar p-1  text-gray-800 w-full text-base rounded-lg resize-none overflow-y-auto min-h-[50px] max-h-[200px]"
            placeholder="Share your thoughts...!"
          />
        </div>
        {previewUrl && (
          <div className="relative w-full h-48 mt-2 sm:h-60">
            <Image
              src={previewUrl}
              alt="Preview"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 hover:1bg-gray-100  rounded-full p-1"
            >
              <IoMdClose size={20} color="black" />
            </button>
          </div>
        )}

        {showEmojiPicker && (
          <div className="absolute z-10">
            <EmojiPicker onEmojiClick={handleEmojiSelect} />
          </div>
        )}

        <div className="flex justify-between mt-2 flex-wrap">
          <div className="flex gap-4 ml-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
              ref={fileInputRef}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="group relative"
            >
              <FaImage
                size={20}
                className="text-green-600 hover:text-green-800 font-bold"
              />
              <span className="absolute top-full mt-1 hidden w-max text-xs font-semibold text-green-600 bg-white rounded-lg px-2 py-1 shadow-lg group-hover:flex">
                Media
              </span>
            </button>
            <button
              className="group relative"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
            >
              <MdOutlineEmojiEmotions
                size={24}
                className="text-green-600 hover:text-green-800 font-bold"
              />
              <span className="absolute top-full mt-1 hidden w-max text-xs font-semibold text-green-600 bg-white rounded-lg px-2 py-1 shadow-lg group-hover:flex">
                Emoji
              </span>
            </button>

            <button
              onClick={() => {
                router.push("/articles/publish");
              }}
              className="group relative"
            >
              <MdOutlineArticle
                size={26}
                className="text-green-600 hover:text-green-800 font-bold"
              />
              <span className="absolute top-full mt-1 hidden w-max text-xs font-semibold text-green-600 bg-white rounded-lg px-2 py-1 shadow-lg group-hover:flex">
                Article
              </span>
            </button>
            <div className="relative flex items-center gap-3 rounded-lg">
              <button
                onClick={handleAIPostContentEnhancement}
                disabled={aiLoading}
                className={`group relative flex items-center justify-center rounded-full transition duration-200 ${
                  aiLoading
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-green-600 hover:text-green-700"
                }`}
              >
                <SiGooglegemini size={24} />
                <span className="absolute top-full mt-1 hidden w-max text-xs font-semibold text-green-600 bg-white rounded-lg px-2 py-1 shadow-lg group-hover:flex">
                  ProBot
                </span>
              </button>
              {aiLoading && (
                <span className="text-gray-500 text-sm animate-pulse">
                  ProBot is enhancing your content...!✨
                </span>
              )}
            </div>
          </div>
          <div>
            <button
              onClick={handlePostSubmission}
              className="  hover:bg-green-700 bg-green-600  h-8 w-16 rounded-lg text-white p-1"
            >
              Post
            </button>
          </div>
        </div>
      </div>

      <PostList newPost={newPost} />
    </div>
  );
}
