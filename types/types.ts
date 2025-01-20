import { User } from "next-auth";

export interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  createdAt: string | Date;
}

export interface ExtendedUser extends User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface ChatProps {
  selectedUserId: string | null;
  selectedUserName: string | null;
  selectedUserAvatarUrl: string | null;
}

export interface ChatHeaderProps {
  selectedUserName: string | null;
  selectedUserAvatarUrl: string | null;
  onBack?: () => void;
}

export interface MessageInputProps {
  newMessage: string;
  setNewMessage: (message: string | ((prev: string) => string)) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
  renderAvatar: (isCurrentUser: boolean) => React.ReactNode;
}

export interface EmptyChatProps {
  type: "loading" | "no-session" | "no-user" | "no-messages";
}
