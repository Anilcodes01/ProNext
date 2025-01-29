import { Users, MessageSquare, Loader, Smile } from "lucide-react";
import { EmptyChatProps } from "@/types/types";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { MessageSquarePlus } from "lucide-react";

export function EmptyChat({ type }: EmptyChatProps) {
  if (type === "loading") {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader className="w-8 h-8 animate-spin text-emerald-600" />
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
          <p className=" text-gray-500">Join the fun! 🎉</p>
        </div>
      </div>
    );
  }

  if (type === "no-user") {
    return (
      <div className="hidden md:flex flex-col items-center justify-center h-full bg-gradient-to-br from-white via-gray-50 to-blue-50 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-100 rounded-full opacity-20 blur-xl" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-100 rounded-full opacity-20 blur-xl" />

        <div className="relative flex flex-col items-center space-y-6 p-8 text-center max-w-md">
          <div className="relative">
            <DotLottieReact
              src="https://lottie.host/771de96d-2cce-494c-9c6a-628edec470a0/tcomFDVx1O.lottie"
              loop
              autoplay
              className="w-64 h-64"
            />
            <div className="absolute -right-4 -bottom-4 bg-white p-2 rounded-full shadow-lg">
              <MessageSquarePlus className="w-6 h-6 text-blue-500" />
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-800">
              Start a Conversation
            </h2>
            <p className="text-gray-600 max-w-sm">
              Connect with your buddies! Select someone from the list to begin
              chatting...!
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500 bg-white/80 px-4 py-2 rounded-full shadow-sm">
            <Users className="w-4 h-4" />
            <span>Select a buddy from the list</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20" />
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
