"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function EditProfileForm() {
  const { data: session } = useSession(); 
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [city, setCity] = useState("");
  const [website, setWebsite] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null); 
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const userId = session?.user.id;


  useEffect(() => {
    if (session) {
      setName(session.user.name || "");
      setBio(session.user.bio || "");
      setCity(session.user.city || "");
      setWebsite(session.user.website || "");
    }
  }, [session]);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("bio", bio);
      formData.append("city", city);
      formData.append("website", website);
      if (avatar) formData.append("avatar", avatar);

      const response = await axios.post(
        `/api/users/${session?.user?.id}/edit`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Profile data changed successfully!");
        router.push(`/user/${userId}`);
      } else {
        toast.error('Error while changing data, Please try again!')
      }

      console.log("Profile updated:", response.data);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="text-2xl  text-black font-bold">Edit Profile</div>
      <div className="flex text-black pt-4 w-full flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-lg bg-gray-100 outline-none px-2 py-1"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="border bg-gray-100 rounded-lg outline-none  p-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border bg-gray-100 rounded-lg outline-none py-1 px-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="website">Website</label>
          <input
            type="url"
            id="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="border bg-gray-100 rounded-lg outline-none py-1 px-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="avatar">Profile Image</label>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files?.[0] || null)}
            className="border bg-gray-100 rounded p-2"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`p-2 bg-blue-500 rounded-lg mt-2 text-white ${
            isLoading ? "opacity-50" : ""
          }`}
        >
          {isLoading ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </div>
  );
}
