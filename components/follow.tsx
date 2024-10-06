'use client'
import { useState } from "react";
import axios from "axios";

interface FollowButtonProps {
  isFollowing: boolean;
  followingId: string;  // ID of the user being followed/unfollowed
}

export default function FollowButton({ isFollowing, followingId }: FollowButtonProps) {
  const [isFollowingState, setIsFollowingState] = useState(isFollowing);
  const [loading, setLoading] = useState(false);

  const handleFollow = async () => {
    setLoading(true);
    try {
      if (isFollowingState) {
        await axios.delete("/api/follow", { data: { followingId } });
      } else {
        await axios.post("/api/follow", { followingId });
      }
      setIsFollowingState(!isFollowingState);
    } catch (error) {
      console.error("Error updating follow status", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleFollow}
      disabled={loading}
      className={`p-1 text-sm font-medium rounded-full ${isFollowingState ? "text-red-500" : "text-blue-500"}`}
    >
      {loading ? "Loading..." : isFollowingState ? "Unfollow" : "Follow"}
    </button>
  );
}
