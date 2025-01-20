import { Phone, Video, EllipsisVertical, ChevronLeft } from "lucide-react";
import { ChatHeaderProps } from "@/types/types";

export function ChatHeader({
  selectedUserName,
  selectedUserAvatarUrl,
  onBack,
}: ChatHeaderProps) {
  return (
    <div className="px-4 py-3 bg-white border-b flex justify-between items-center border-gray-200">
      <div className="flex items-center gap-2">
        <button
          onClick={onBack}
          className="md:hidden p-1 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>

        <div className="flex-shrink-0">
          {selectedUserAvatarUrl ? (
            <img
              src={selectedUserAvatarUrl}
              alt={selectedUserName || "User"}
              className="h-8 w-8 object-cover rounded-full"
            />
          ) : (
            <div className="h-8 w-8 rounded-full bg-green-200 flex items-center justify-center">
              <span className="text-green-600 font-medium text-lg">
                {selectedUserName?.charAt(0)}
              </span>
            </div>
          )}
        </div>

        <h2 className="text-lg font-semibold text-gray-800">
          {selectedUserName || "Unknown User"}
        </h2>
      </div>
      <div className="flex items-center gap-4 text-gray-500 text-sm">
        <Phone className="cursor-pointer" size={20} />
        <Video className="cursor-pointer" size={20} />
        <EllipsisVertical className="cursor-pointer" size={20} />
      </div>
    </div>
  );
}
