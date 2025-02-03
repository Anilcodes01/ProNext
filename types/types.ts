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
  selectedUserEmail: string | null;
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

export interface ErrorProps {
  type: "no-session" | "ai-error" | "fetch-post";
}

export interface Post {
  id: string;
  title?: string;
  content: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: {
    id: string;
    name: string;
    username: string;
    avatarUrl?: string;
  };
  isLiked: boolean;
  likeCount: number;
  commentCount: number;
  comments: Comment[];
  isBookmarked: boolean;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  description: string;
  image?: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: {
    id: string;
    name: string;
    avatarUrl?: string | null;
    username: string;
  };
  liked: boolean;
  likeCount: number;
  bookmarked: boolean;
}

export interface Project {
  id: string;
  projectName: string;
  projectDescription: string;
  createdAt: string;
  image: string;
  userId: string;
  projectLink: string;
  projectRepoLink: string;
  user: {
    id: string;
    username: string
    name: string;
    avatarUrl: string;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  avatarUrl?: string;
  createdAt: string;
  bio?: string;
  website?: string;
  city?: string;
  ProfilePageImage?: string;
  techStack?: string[];
}

export interface Follow {
  followingId: string;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string | Date;
  user: User;
}

export interface PostListProps {
  newPost?: Post | null;
  onGeminiClick?: (postContent: string) => void
}

export interface PostContextType {
  posts: Post[];
  postLoading: boolean;
  postError: string | null;
  fetchPosts: () => Promise<void>;
  addPost: (post: Post) => void;
}

export interface ArticleContextType {
  articles: Article[];
  loading: boolean;
  error: string | null;
  fetchArticles: () => Promise<void>;
  
}

export interface ProjectCardProps {
  project: {
    id: string;
    projectName: string;
    projectDescription: string;
    createdAt: string;
    image: string;
    userId: string;
    projectLink: string;
    projectRepoLink: string;
    user: {
      id: string;
      username: string
      name: string;
      avatarUrl: string;
    };
  };
}