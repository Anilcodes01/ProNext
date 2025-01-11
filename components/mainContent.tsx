"use client";
import { useSession } from "next-auth/react";
import { useState, useRef } from "react";
import { FaImage } from "react-icons/fa6";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { LiaPollSolid } from "react-icons/lia";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import Image from "next/image";
import { MdOutlineArticle } from "react-icons/md";
import { useRouter } from "next/navigation";
import EmojiPicker from "emoji-picker-react";
import { EmojiClickData } from "emoji-picker-react";
import { FaUserCircle } from "react-icons/fa";
import PostList from "./postList";

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
      <div className="w-full sm:p-8 p-4">
        <div className="text-2xl sm:text-3xl w-full text-black font-bold">
          Welcome back, {session?.user?.name}!
        </div>
        <div className="border border-gray-200 w-full bg-white rounded-xl mt-8 p-1">
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="outline-none border text-black bg-gray-200  w-full h-20 sm:h-30 text-lg rounded-lg p-2 resize-none"
            placeholder="What's on your mind?..."
          ></textarea>
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
                className="absolute top-2 right-2 bg-red-500 rounded-full p-1"
              >
                <IoMdClose size={20} color="white" />
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
                title="Media"
              >
                <FaImage
                  size={20}
                  className="text-green-600 hover:text-green-800 font-bold"
                />
              </button>
              <button
                title="Emoji"
                onClick={() => setShowEmojiPicker((prev) => !prev)}
              >
                <MdOutlineEmojiEmotions
                  size={24}
                  className="text-green-600 hover:text-green-800 font-bold"
                />
              </button>
              <button
                title="Poll"
                onClick={() => {
                  router.push("/polls");
                }}
              >
                <LiaPollSolid
                  size={26}
                  className="text-green-600 hover:text-green-800 font-bold"
                />
              </button>
              <button
                title="article"
                onClick={() => {
                  router.push("/articles/publish");
                }}
              >
                <MdOutlineArticle
                  size={26}
                  className="text-green-600 hover:text-green-800 font-bold"
                />
              </button>
            </div>
            <div>
              <button
                onClick={handlePostSubmission}
                className="  hover:bg-green-800 bg-green-600 h-8 w-16  text-white p-1"
              >
                Hello...!
              </button>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div className="h-32 bg-gray-200 rounded-lg dark-gray-300 w-full mb-4"></div>
          <div className="h-32 bg-gray-200 rounded-lg dark-gray-300 w-full mb-4"></div>
          <div className="h-32 bg-gray-200 rounded-lg dark-gray-300 w-full mb-4"></div>
          <div className="h-32 bg-gray-200 rounded-lg dark-gray-300 w-full mb-4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-black m-5  text-xl  min-h-screen">
        <div>Please signin first to create a Post...!</div>
        <button
          onClick={() => {
            router.push("/auth/signin");
          }}
          type="button"
          className="text-white mt-5 ml-24 bg-gray-800 hover:bg-gray-900   font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-70 dark:border-gray-700"
        >
          Signin
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 mt-12  w-full">
      <div className="border border-gray-200  w-full bg-white rounded-xl mt-8 p-4">
        <div className="flex items-start border-b border-gray-200">
          <div className="h-10 w-10 overflow-hidden">
            {session?.user.avatarUrl ? (
              <Image
                src={session.user.avatarUrl}
                alt="User Profile Picture"
                width={192}
                height={192}
                className="rounded-full w-10 h-10 object-cover overflow-hidden cursor-pointer "
              />
            ) : (
              <FaUserCircle size={32} className="text-gray-500" />
            )}
          </div>

          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="outline-none  p-2 text-gray-800  w-full h-20 sm:h-30 text-  rounded-lg resize-none"
            placeholder="What's on your mind?..."
          ></textarea>
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
            <button onClick={() => fileInputRef.current?.click()} title="Media">
              <FaImage
                size={20}
                className="text-green-600 hover:text-green-800 font-bold"
              />
            </button>
            <button
              title="Emoji"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
            >
              <MdOutlineEmojiEmotions
                size={24}
                className="text-green-600 hover:text-green-800 font-bold"
              />
            </button>

            <button
              title="article"
              onClick={() => {
                router.push("/articles/publish");
              }}
            >
              <MdOutlineArticle
                size={26}
                className="text-green-600 hover:text-green-800 font-bold"
              />
            </button>
          </div>
          <div>
            <button
              onClick={handlePostSubmission}
              className="  hover:bg-green-700 bg-green-500  h-8 w-16 rounded text-white p-1"
            >
              Post
            </button>
          </div>
        </div>
      </div>

      <PostList />
    </div>
  );
}
