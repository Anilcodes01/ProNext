
import { MessageCircleMore, Heart, BookmarkCheck, Share2 } from "lucide-react";
import { FaHeart, FaBookmark } from "react-icons/fa";

interface PostEngagementIconsProps {
  liked: boolean;
  bookmarked: boolean;
  likeCount: number;
  commentCount: number;
  onLikeClick: () => void;
  onCommentClick: () => void;
  onBookmarkClick: () => void;
}

export default function PostEngagementIcons({
  liked,
  bookmarked,
  likeCount,
  commentCount,
  onLikeClick,
  onCommentClick,
  onBookmarkClick,
}: PostEngagementIconsProps) {
  return (
    <div className="mt-3 ml-2 flex gap-8">
      <button
        className={`gap-1 flex items-center ${
          liked ? "text-green-600" : "text-gray-500"
        } hover:text-green-600`}
        onClick={(e) => {
          e.stopPropagation();
          onLikeClick();
        }}
      >
        {liked ? <FaHeart size={20} /> : <Heart size={20} />}
        {likeCount > 0 && <div className="text-sm">{likeCount}</div>}
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onCommentClick();
        }}
        className="text-gray-500 gap-1 hover:text-green-600 flex items-center"
      >
        <MessageCircleMore size={20} />
        {commentCount > 0 && <div className="text-sm">{commentCount}</div>}
      </button>

      <button className="text-gray-500 gap-1 hover:text-green-600 flex items-center">
        <Share2 size={20} />
        <div className="text-sm">6</div>
      </button>

      <button
        className={`gap-1 flex items-center ${
          bookmarked ? "text-green-600" : "text-gray-500"
        } hover:text-green-600`}
        onClick={(e) => {
          e.stopPropagation();
          onBookmarkClick();
        }}
      >
        {bookmarked ? <FaBookmark size={20} /> : <BookmarkCheck size={20} />}
      </button>
    </div>
  );
}