import { useState, useEffect } from "react";
import { Message } from "@/types/types";
import { useSocket } from "./useSocket";
import { useSession } from "next-auth/react";

export const useMessages = (selectedUserId: string | null) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const socket = useSocket(session?.user.id || "");

  useEffect(() => {
    if (session?.user.id && selectedUserId) {
      setIsLoading(true);
      fetch(
        `/api/messages?senderId=${session.user.id}&receiverId=${selectedUserId}`
      )
        .then((res) => res.json())
        .then((data) => {
          setMessages(data);
          return data;
        })
        .catch((err) => {
          console.error("Error loading messages:", err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setMessages([]);
    }
  }, [session?.user.id, selectedUserId]);

  useEffect(() => {
    if (socket) {
      const handleMessage = (message: Message) => {
        if (
          message.senderId === selectedUserId ||
          (message.senderId === session?.user.id &&
            message.receiverId === selectedUserId)
        ) {
          setMessages((prevMessages) => [...prevMessages, message]);
        }
      };

      socket.on("receiveMessage", handleMessage);
      socket.on("messageSaved", handleMessage);

      return () => {
        socket.off("receiveMessage");
        socket.off("messageSaved");
      };
    }
  }, [socket, selectedUserId, session?.user.id]);

  return { messages, setMessages, isLoading, socket };
};
