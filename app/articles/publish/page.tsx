"use client";
import Appbar from "@/components/appbar";
import { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function WriteArticle() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { data: session } = useSession();

  const handleArticleSubmission = async () => {
    if (!session?.user?.id) {
      toast.error("You need to be logged in to publish an article!");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("/api/articles/addArticle", {
        title,
        description,
        content,
        userId: session.user.id,
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
    } finally {
      setLoading(false);
    }
  };

  if(loading) {
    return <div>
      loading...
    </div>
  }

  return (
    <div className="bg-white  min-h-screen">
      <Toaster position="top-right" />
      <div>
        <Appbar />
      </div>
      <div className="p-16 flex flex-col items-center">
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="p-4 rounded-lg text-4xl mt-16 outline-none text-black w-full font-bold"
          type="text"
          placeholder="Title..."
        />
        <input
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          className="mt-4 w-full outline-none rounded-lg p-2 text-black"
          type="text"
          placeholder="Description..."
        />

        <textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          className="rounded-lg h-96 w-full mt-8 text-black p-2 outline-none"
          placeholder="Write something here..."
        ></textarea>

        <button
          onClick={handleArticleSubmission}
          className="bg-gray-800 hover:bg-gray-950 p-2 mt-4 w-24  rounded-full"
        >
          Publish
        </button>
      </div>
    </div>
  );
}
