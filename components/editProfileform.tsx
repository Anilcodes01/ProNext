'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AiOutlineLink } from "react-icons/ai";
import Image from "next/image";
import { MapPin, X } from "lucide-react";

export default function EditProfileForm() {
  const { data: session, update: updateSession } = useSession();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [city, setCity] = useState("");
  const [profilePageImage, setProfilePageImage] = useState<File | null>(null)
  const [website, setWebsite] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [profilePageImagePreview, setProfilePageImagePreview] = useState<string | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const router = useRouter();
  const userId = session?.user?.id;

 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`/api/users/${userId}`, {
          headers: {
            "Cache-Control": "no-store, no-cache, max-age=0, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        });
        const user = userResponse.data.user;
        setName(user.name || "");
        setProfilePageImage(user.profilePageImage || "")
        setBio(user.bio || "");
        setCity(user.city || "");
        setWebsite(user.website || "");
        setSkills(user.techStack || []);
        setAvatarPreview(user.avatarUrl || "/default-avatar.png");
        setProfilePageImagePreview(user.ProfilePageImage || "")
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    if (userId) fetchUserData();
  }, [userId]);

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

  const handleProfilePageImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setProfilePageImage(file)

    if(file) {
      const previewUrl = URL.createObjectURL(file);
      setProfilePageImagePreview(previewUrl);
    } else {
      setProfilePageImagePreview(null)
    }
  }

  const addSkill = async () => {
    if (newSkill && !skills.includes(newSkill)) {
      try {
        await axios.post(`/api/user/techstack`, { tech: newSkill, userId });
        setSkills([...skills, newSkill]);
        setNewSkill("");
        toast.success("Skill added successfully!");
      } catch (error) {
        console.error("Failed to add skill:", error);
      }
    }
  };

  const removeSkill = async (skillToRemove: string) => {
    try {
      await axios.delete(`/api/user/techstack`, { data: { tech: skillToRemove, userId } });
      setSkills(skills.filter(skill => skill !== skillToRemove));
      toast.success("Skill removed successfully!");
    } catch (error) {
      console.error("Failed to remove skill:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    if (isLoading) return; 
    
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("bio", bio);
      formData.append("city", city);
      formData.append("website", website);
      if (avatar) formData.append("avatar", avatar);
      if (profilePageImage) formData.append('profilePageImage', profilePageImage)

      const response = await axios.post(
        `/api/users/${userId}/edit`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
      
        if (session) {
          await updateSession({
            ...session,
            user: { 
              ...session.user, 
              name, 
              bio, 
              city, 
              website, 
              avatarUrl: response.data.user.avatarUrl ,
              profilePageImage: response.data.user.ProfilePageImage
            },
          });
        }
        
       
        toast.success("Profile updated successfully!");
        
        
        setTimeout(() => {
          router.push(`/user/${userId}`);
        }, 100);
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Error while updating profile, please try again!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 border m-4 min-h-screen rounded-lg">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="text-2xl text-black font-bold">Edit Profile</div>
      <div className="flex text-black pt-4 w-full flex-col gap-4">


 {/* Profile Page Image Upload and Preview */}
 <div className="flex flex-col justify-center relative">
          <div className="w-full h-[20vh] rounded-lg overflow-hidden mt-4">
            {profilePageImagePreview && (
              <Image src={profilePageImagePreview} alt="Profile Page Image Preview" width={150} height={150} className="object-cover w-full h-full" />
            )}
          </div>
          <button
            type="button"
            className="mt-2 border p-2 rounded cursor-pointer text-sm"
            onClick={() => document.getElementById('profilePageImage')?.click()}
          >
            Change Profile Page Image
          </button>
          <input
            type="file"
            id="profilePageImage"
            accept="image/*"
            onChange={handleProfilePageImageChange}
            className="hidden"
          />
        </div>
        
        {/* Avatar Upload and Preview */}
        <div className="flex flex-col justify-center relative">


          <div className="w-[100px] h-[100px] rounded-full overflow-hidden mt-4">
            {avatarPreview ? (
              <Image src={avatarPreview} alt="Avatar Preview" width={384} height={384} className="object-cover w-full h-full" />
            ) : (
              <Image src={session?.user.avatarUrl || "/default-avatar.png"} alt="User Avatar" width={384} height={384} className="object-cover w-full h-full" />
            )}
          </div>
          <button
            type="button" 
            className="absolute bottom-2 right-2 border p-2 rounded cursor-pointer text-sm"
            onClick={() => document.getElementById('avatar')?.click()}
          >
            Change Avatar
          </button>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>



        <div className="flex flex-col">
          <label className="text-sm mb-2" htmlFor="name">Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="border rounded-lg text-sm outline-none px-2 py-1" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm mb-2" htmlFor="bio">Bio</label>
          <textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} className="border rounded-lg outline-none p-2" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm mb-2" htmlFor="city">Location</label>
          <div className="flex flex-row items-center gap-2">
            <MapPin className="w-4 h-4 shrink-0" />
            <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} className="border text-sm w-full rounded-lg outline-none py-1 px-2" />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-sm mb-2" htmlFor="website">Website</label>
          <div className="flex gap-2 items-center">
            <AiOutlineLink />
            <input type="url" id="website" value={website} onChange={(e) => setWebsite(e.target.value)} className="border text-sm w-full rounded-lg outline-none py-1 px-2" />
          </div>
        </div>

        {/* Skills Section */}
        <div className="flex flex-col">
          <label className="text-sm mb-2">Skills</label>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div key={skill} className="flex items-center bg-gray-200 rounded-full px-2 py-1 text-sm">
                {skill}
                <button
                  type="button" 
                  className="h-4 w-4 ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full"
                  onClick={() => removeSkill(skill)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {skill} skill</span>
                </button>
              </div>
            ))}
          </div>
          <div className="flex mt-2 gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="border rounded-lg text-sm px-2 py-1"
              placeholder="Add a new skill"
            />
            <button 
              type="button" 
              onClick={addSkill} 
              className="px-4 py-1 bg-blue-500 text-white rounded-lg"
            >
              Add
            </button>
          </div>
        </div>

        <button 
          type="submit"
          disabled={isLoading} 
          className={`p-2 bg-blue-500 rounded-lg mt-2 text-white ${isLoading ? "opacity-50" : ""}`}
        >
          {isLoading ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </form>
  );
}