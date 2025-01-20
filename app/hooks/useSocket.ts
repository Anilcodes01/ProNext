import { useEffect, useRef } from "react";
import io from "socket.io-client";

type SocketType = ReturnType<typeof io>;

interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  chatId: string;
  read: boolean;
  createdAt: string;
  sender?: {
    id: string;
    username: string;
  };
}

export const useSocket = (userId: string) => {
  const socket = useRef<SocketType | null>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (userId && !isInitialized.current) {
      socket.current = io("https://pronext-socket-server.onrender.com", {
        transports: ["websocket", "polling"],
        autoConnect: true,
        
      });

      socket.current.on("connect", () => {
        console.log("Connected to socket server");
        socket.current?.emit("register", userId);
      });

      socket.current.on("connect_error", (err: Error) => {
        console.error("Socket connection error", err);
      });

      isInitialized.current = true;
    }

    return () => {
      if (socket.current) {
        socket.current.disconnect();
        socket.current = null;
        isInitialized.current = false;
      }
    };
  }, [userId]);

  return socket.current;
};

export type { Message };
