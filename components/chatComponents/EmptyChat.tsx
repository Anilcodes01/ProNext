import { User, MessageSquare, Loader, Smile } from "lucide-react";
import { EmptyChatProps } from "@/types/types";

export function EmptyChat({ type }: EmptyChatProps) {
  if (type === "loading") {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (type === "no-session") {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Smile className="w-12 h-12 text-yellow-500 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900">
            Sign In to Chat
          </h2>
          <p className="text-sm text-gray-500">Join the fun! 🎉</p>
        </div>
      </div>
    );
  }

  if (type === "no-user") {
    return (
      <div className="hidden md:flex flex-col items-center justify-center h-full bg-gradient-to-b from-gray-50 to-gray-100">
        <User className="w-14 h-14 text-blue-600 mb-4 animate-pulse" />
        <h2 className="text-xl font-semibold text-gray-800">Pick a Buddy</h2>
        <p className="text-sm text-gray-500">Tap someone and say hello!</p>
      </div>
    );
  }

  if (type === "no-messages") {
    return (
      <div className="flex flex-col items-center justify-center h-full  ">
        <MessageSquare className="w-14 h-14 text-emerald-500 mb-4 animate-bounce" />
        <h2 className="text-2xl font-semibold text-gray-900">No Chats Yet!</h2>
        <p className=" text-gray-500">Be the first to break the ice! ❄️</p>
      </div>
    );
  }

  return null;
}
