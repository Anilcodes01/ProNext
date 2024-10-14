"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiCamera } from "react-icons/fi"; // Importing the camera icon

export default function EditProfileForm() {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [city, setCity] = useState("");
  const [website, setWebsite] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null); // Add state for avatar preview
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const userId = session?.user?.id;

  useEffect(() => {
    if (session) {
      setName(session.user.name || "");
      setBio(session.user.bio || "");
      setCity(session.user.city || "");
      setWebsite(session.user.website || "");
    }
  }, [session]);

  // Handle avatar change and set preview
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setAvatar(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
    } else {
      setAvatarPreview(null);
    }
  };

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
        toast.error("Error while changing data, Please try again!");
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
      <div className="text-2xl text-black font-bold">Edit Profile</div>
      <div className="flex text-black pt-4 w-full flex-col gap-4">
        {/* Avatar Upload and Preview */}
        <div className="flex flex-col justify-center items-center relative">
          <div className="w-[192px] h-[192px] rounded-full overflow-hidden mt-4">
            {avatarPreview ? (
              <Image
                src={avatarPreview}
                alt="Avatar Preview"
                width={384}
                height={384}
                className="object-cover w-full h-full"
              />
            ) : (
              <Image
                src={session?.user.avatarUrl || "/default-avatar.png"} // Placeholder for default avatar
                alt="User Avatar"
                width={384}
                height={384}
                className="object-cover w-full h-full"
              />
            )}
          </div>

          {/* Icon for changing the image */}
          <label
            htmlFor="avatar"
            className="absolute bottom-2 right-2 bg-gray-700 p-2 rounded-full cursor-pointer"
          >
            <FiCamera className="text-white" size={20} />
          </label>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden" // Hide the default file input
          />
        </div>

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
