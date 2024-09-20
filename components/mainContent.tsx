"use client";
import { useSession } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { FaImage } from "react-icons/fa6";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { LiaPollSolid } from "react-icons/lia";
import { IoMdClose } from "react-icons/io";
import PostCard from "./postCard";
import axios from "axios";
import Image from "next/image";
import { MdOutlineArticle } from "react-icons/md";
import { useRouter } from "next/navigation";
import EmojiPicker from "emoji-picker-react";
import { EmojiClickData } from "emoji-picker-react";

interface Post {
  id: string;
  title: string;
  content: string;
  image?: string; // No `null`, only string or undefined
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: {
    name: string;
    avatarUrl?: string;
  };
}

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
  const [posts, setPosts] = useState<Post[]>([]); // Local state for posts

  // Fetch posts using useEffect
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/post/fetchPost');
        setPosts(response.data.getPosts);
      } catch (error) {
        console.error("Failed to fetch posts", error);
        setError("Failed to fetch posts");
      }
    };

    fetchPosts();
  }, []); // Run once on component mount

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
        // Refresh posts after creating a new post
        setPosts((prevPosts) => [response.data.createPost, ...prevPosts]);
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
    setPostContent((prevContent) => prevContent + emojiObject.emoji); // Add emoji to post content
    setShowEmojiPicker(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 w-full">
      <div className="text-3xl w-full text-white font-bold">
        Welcome back, {session?.user?.name}!
      </div>
      <div className="border border-black w-full bg-gray-950 rounded-xl mt-8 p-1">
        <textarea
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          className="outline-none border border-black text-white bg-black text-gray-400 w-full h-30 text-lg rounded-lg p-2"
          placeholder="What's on your mind?..."
        ></textarea>
        {previewUrl && (
          <div className="relative w-full h-60 mt-2">
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

        <div className="flex justify-between mt-2">
          <div className="flex gap-4 ml-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
              ref={fileInputRef}
            />
            <button onClick={() => fileInputRef.current?.click()}>
              <FaImage
                size={20}
                className="text-green-600 hover:text-green-800 font-bold"
              />
            </button>
            <button onClick={() => setShowEmojiPicker((prev) => !prev)}>
              <MdOutlineEmojiEmotions
                size={24}
                className="text-green-600 hover:text-green-800 font-bold"
              />
            </button>
            <button>
              <LiaPollSolid
                size={26}
                className="text-green-600 hover:text-green-800 font-bold"
              />
            </button>
            <button
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
              className="border text-white hover:text-green-800 border-green-700 h-8 w-16 rounded-full text-black p-1"
            >
              Post
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8">
        {error && <p className="text-red-500">{error}</p>}
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <PostCard key={post.id ?? `post-${index}`} post={post} />
          ))
        ) : (
          <p className="text-gray-500">No posts available</p>
        )}
      </div>
    </div>
  );
}
