import { MessageBubbleProps } from "@/types/types";

export function MessageBubble({
  message,
  isCurrentUser,
  renderAvatar,
}: MessageBubbleProps) {
  const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}: ${minutes} ${ampm}`;
  };

  return (
    <div
      className={`flex relative gap-2 ${
        isCurrentUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <div
        className={`flex-shrink-0 rounded-full ${
          isCurrentUser
            ? "absolute bottom-[-8px] right-[-8px] border-[3px] border-white"
            : "absolute bottom-[-8px] left-[-8px] border-[3px] border-white"
        }`}
      >
        {renderAvatar(isCurrentUser)}
      </div>

      <div
        className={`max-w-[70%] rounded-lg px-2 min-w-[10%] py-2 shadow-sm ${
          isCurrentUser ? "bg-green-600 text-white" : "bg-[#F3F4F6] text-black"
        }`}
      >
        <p className={`break-words ${isCurrentUser ? "" : "ml-3"}`}>
          {message.content}
        </p>
        <span
          className={`text-xs mr-4 block ${
            isCurrentUser
              ? "text-end text-white"
              : "text-start ml-3 text-[#5e5e5e]"
          }`}
        >
          {formatTime(new Date(message.createdAt))}
        </span>
      </div>
    </div>
  );
}
