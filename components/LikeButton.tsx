'use client';

import { useState } from 'react';
import axios from 'axios';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; 

type LikeButtonProps = {
  articleId: string;
  initialLiked: boolean;
  initialLikeCount: number;
};

export default function LikeButton({ articleId, initialLiked, initialLikeCount }: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [loading, setLoading] = useState(false);

  console.log(loading)

  const toggleLike = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`/api/articles/${articleId}/like`);
      if (res.status === 200 || res.status === 201) {
        
        setLiked(res.data.liked);
        setLikeCount((prevCount) => (res.data.liked ? prevCount + 1 : prevCount - 1));
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex   items-center">
      <button
        onClick={toggleLike}
      
        className={`gap-1 flex  items-center ${liked ? "text-red-500" : "text-gray-400"} hover:text-red-600`}
      >
       {liked ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
      </button>
      {likeCount > 0 && ( 
        <span className="ml-1 text-xs text-gray-600">{likeCount}</span>
      )}
    </div>
  );
}
