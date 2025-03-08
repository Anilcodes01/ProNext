"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { useSession } from "next-auth/react";

export default function UploadProject() {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectRepoLink, setProjectRepoLink] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const {data: session} = useSession();

  const userId = session?.user.id;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("projectName", projectName);
    formData.append("projectDescription", projectDescription);
    formData.append("projectLink", projectLink);
    formData.append("projectRepoLink", projectRepoLink);
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.post("/api/project/createProject", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      router.push(`/user/${userId}`); 
    } catch (error) {
      console.error("Failed to upload project:", error);
      setError("Failed to upload project. Please try again.");
    }
  };

  return (
   <div className="bg-white min-h-screen">
   
    <div className="flex">
        <div className="hidden md:block fixed w-52 lg:w-80 h-full">
            <Sidebar />
        </div>
        <div className="w-full ml-0 md:ml-52 mt-16  lg:ml-80 h-screen lg:mr-80 border-r border-l border-gray-200">
        <div className="min-h-screen flex w-full flex-col  p-5">
      <form
        className="flex flex-col gap-4 border w-full p-5 rounded-md  "
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl text-green-600 font-bold">Upload New Project</h2>
        
        {error && <p className="text-red-500">{error}</p>}

        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="border text-black outline-none p-2 rounded-lg"
          required
        />
        
        <textarea
          placeholder="Project Description"
          value={projectDescription}
          rows={5}
          onChange={(e) => setProjectDescription(e.target.value)}
          className="border text-black outline-none p-2 rounded-lg"
          required
        />
        
        <input
          type="url"
          placeholder="Live Project Link"
          value={projectLink}
          onChange={(e) => setProjectLink(e.target.value)}
          className="border text-black outline-none p-2 rounded-lg"
        />
        
        <input
          type="url"
          placeholder="GitHub Repo Link"
          value={projectRepoLink}
          onChange={(e) => setProjectRepoLink(e.target.value)}
          className="border text-black outline-none p-2 rounded-lg"
        />
        
        <input
          type="file"
          onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          className="border text-green-600 outline-none p-2 rounded-lg"
        />
        
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Upload Project
        </button>
      </form>
    </div>
        </div>
    </div>
   </div>
  );
}
