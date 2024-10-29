import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AiOutlineLink } from "react-icons/ai";
import Image from "next/image";
import {

  MapPin,
} from "lucide-react";


export default function EditProfileForm() {
  const { data: session, update: updateSession } = useSession(); // Add update method from useSession
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
        toast.success("Profile updated successfully!");

        // Manually update the session after the profile is updated
        if (session) {
          await updateSession({
            ...session, // Spread the current session
            user: {
              ...session.user, // Use optional chaining if necessary
              name: name,
              bio: bio,
              city: city,
              website: website,
              avatarUrl: response.data.user.avatarUrl, // Update avatar URL
            },
          });
        } else {
          console.error("Session is null, cannot update user information");
        }
        

        router.push(`/user/${userId}`);
      } else {
        toast.error("Error while updating profile, Please try again!");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 border m-4 rounded-lg">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="text-2xl text-black font-bold">Edit Profile</div>
      <div className="flex text-black pt-4 w-full flex-col gap-4">
        {/* Avatar Upload and Preview */}
        <div className="flex flex-col justify-center relative">
          <div className="w-[100px] h-[100px] rounded-full overflow-hidden mt-4">
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
            className="absolute bottom-2 right-2 border p-2 rounded cursor-pointer"
          >
            <button className="text-sm ">
              Change Avatar
            </button>
          </label>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden" // Hide the default file input
          />
        </div>

        {/* Other profile fields */}
        <div className="flex flex-col">
          <label className="text-sm mb-2" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-lg text-sm outline-none px-2 py-1"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm mb-2" htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="border rounded-lg outline-none  p-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm mb-2" htmlFor="city">Location</label>
          <div className="flex flex-row items-center gap-2">
          <MapPin className="w-4 h-4 shrink-0" />
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border w-full  rounded-lg outline-none py-1 px-2"
          />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-sm mb-2" htmlFor="website">Website</label>
         <div className="flex gap-2 items-center">
         <AiOutlineLink />
          <input
            type="url"
            id="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="border w-full rounded-lg outline-none py-1 px-2"
          />
         </div>
        </div>

        <div >
          <p className="text-sm mb-2">Join Date</p>
          
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
