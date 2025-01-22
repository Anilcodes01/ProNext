"use client";

import Appbar from "@/components/appbar";
import { useState, useRef } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import "/app/quill-custom.css";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="h-96 w-full animate-pulse bg-gray-100 rounded-lg" />
  ),
});

export default function WriteArticle() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { data: session } = useSession();

  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ color: [] }, { background: [] }],
      [{ list: "bullet" }],
      [{ align: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ font: [] }],
      ["clean"],
    ],
  };

  const formats = [
    "bold",
    "italic",
    "underline",
    "color",
    "background",
    "list",
    "bullet",
    "align",
    "size",
    "font",
  ];

  const handleArticleSubmission = async () => {
    if (!session?.user?.id) {
      toast.error("You need to be logged in to publish an article!");
      return;
    }

    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required!");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("content", content);
      formData.append("userId", session.user.id);

      if (image) {
        formData.append("image", image);
      }

      const response = await axios.post("/api/articles/addArticle", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.success("Article published successfully!");
        const articleId = response.data.newArticle.id;
        router.push(`/articles/${articleId}`);
      } else {
        toast.error("Error while publishing article...");
      }
    } catch (error) {
      console.log("Error while publishing article...", error);
      toast.error("Failed to publish article");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white overflow-y-auto hide-scrollbar h-screen">
      <Toaster position="top-right" />
      <div>
        <Appbar />
      </div>
      <div className="lg:p-12 p-2 flex flex-col items-center w-full mx-auto">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="pt-4 rounded-lg text-4xl mt-16 outline-none text-black w-full font-bold "
          type="text"
          placeholder="Title..."
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-4 w-full outline-none rounded-lg p-2 text-black  "
          type="text"
          placeholder="Description..."
        />

        <div className="w-full mt-8 shadow-sm">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            formats={formats}
            className="rounded-lg w-full text-black"
            placeholder="Write something here..."
          />
        </div>

        <div className="w-full mt-16  items-center flex flex-col gap-4">
          <label className="block">
            <span className="sr-only cursor-pointer">Choose article image</span>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-green-50 file:text-green-700
                hover:file:bg-green-100 cursor-pointer
                transition-all"
              accept="image/*"
            />
          </label>

          <button
            onClick={handleArticleSubmission}
            className="bg-green-500 text-white hover:bg-green-600 p-3 px-8 rounded-full w-fit
              font-medium transition-all duration-200 transform hover:scale-105
              focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⏳</span> Publishing...
              </span>
            ) : (
              "Publish"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
