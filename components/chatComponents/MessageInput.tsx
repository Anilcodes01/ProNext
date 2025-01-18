import { Send } from "lucide-react";
import { MessageInputProps } from "@/types/types";

export function MessageInput({
  newMessage,
  setNewMessage,
  onSubmit,
}: MessageInputProps) {
  return (
    <div className="bg-white border-t mb-16 border-gray-200 p-4">
      <form onSubmit={onSubmit} className=" flex space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 text-black rounded-lg border border-gray-300 px-4 py-2 "
          placeholder="Enter your message here...!"
        />
        <button
          type="submit"
          disabled={!newMessage.trim()}
          className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
