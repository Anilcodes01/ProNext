import { User, MessageSquare, Loader } from "lucide-react";
import { EmptyChatProps } from "@/types/types";

export function EmptyChat({ type }: EmptyChatProps) {
  if (type === "loading") {
    return (
      <div className="flex justify-center items-center pt-4">
        <Loader className="w-6 h-6 animate-spin text-green-600" />
      </div>
    );
  }

  if (type === "no-session") {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Please Sign In
          </h2>
          <p className="mt-2 text-gray-600">
            You need to be signed in to access the chat.
          </p>
        </div>
      </div>
    );
  }

  if (type === "no-user") {
    return (
      <div className="hidden md:flex flex-col items-center justify-center h-full bg-gray-50">
        <User className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-800">Select a User</h2>
        <p className="mt-2 text-gray-600">
          Choose someone to start chatting with
        </p>
      </div>
    );
  }

  if (type === "no-messages") {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <MessageSquare className="w-16 h-16 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-800">No messages yet</h3>
        <p className="text-gray-600">Send a message to start chatting</p>
      </div>
    );
  }

  return null;
}
