import React, { useState } from "react";
import { Send, Smile } from "lucide-react";
import { MessageInputProps } from "@/types/types";

const EMOJI_LIST = [
  "😊",
  "😂",
  "🥰",
  "😍",
  "😎",
  "🤔",
  "😅",
  "😇",
  "🙂",
  "😉",
  "😌",
  "😋",
  "😄",
  "🤗",
  "😃",
  "😆",
  "👋",
  "❤️",
  "✨",
  "🎉",
  "👍",
  "🔥",
  "💯",
  "🌟",
];

export function MessageInput({
  newMessage,
  setNewMessage,
  onSubmit,
}: MessageInputProps) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  interface EmojiClickHandler {
    (emoji: string): void;
  }

  const handleEmojiClick: EmojiClickHandler = (emoji) => {
    setNewMessage((prev: string) => prev + emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg backdrop-blur-lg bg-opacity-95">
      <div className="max-w-4xl mx-auto relative">
        {showEmojiPicker && (
          <div className="absolute bottom-full mb-2 right-0 bg-white rounded-lg shadow-xl border border-gray-200 p-4 w-64">
            <div className="grid grid-cols-8 gap-2">
              {EMOJI_LIST.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => handleEmojiClick(emoji)}
                  className="text-xl hover:bg-gray-100 p-1 rounded transition-colors duration-200 cursor-pointer"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={onSubmit} className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="w-full rounded-full bg-gray-100 pl-6 pr-12 py-3 text-gray-700 
                       placeholder:text-gray-500 border-2 border-transparent outline-none 
                       transition-all duration-300 focus:border-emerald-500 focus:bg-white 
                       focus:ring-2 focus:ring-emerald-500/20"
              placeholder="Type your message here..."
            />
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 
                       hover:text-emerald-500 transition-colors duration-200"
            >
              <Smile className="w-5 h-5" />
            </button>
          </div>

          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="inline-flex items-center justify-center rounded-full bg-emerald-500 p-3
                     text-white transition-all duration-300 hover:bg-emerald-600 
                     disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300
                     hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0
                     disabled:shadow-none disabled:hover:translate-y-0"
          >
            <Send className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
          </button>
        </form>
      </div>
    </div>
  );
}
