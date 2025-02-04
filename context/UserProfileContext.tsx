import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import axios from "axios";
import {
  Article,
  Project,
  UserProfile,
  Post,
  UserProfileContextType,
} from "@/types/types";

const UserProfileContext = createContext<UserProfileContextType | undefined>(
  undefined
);

export function UserProfileProvider({ children }: { children: ReactNode }) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"posts" | "articles" | "projects">(
    "posts"
  );

  const fetchUserData = async (userId: string) => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    try {
      const userResponse = await axios.get(`/api/users/${userId}`);

      const userData = userResponse.data.user;
      setUserProfile(userData);
      setPosts(userData.posts);
      setArticles(userData.articles);
      setProjects(userData.projects);
    } catch (error) {
      console.error("Failed to fetch user data", error);
      setError("Failed to fetch user data...!");
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (updatedProfile: Partial<UserProfile>) => {
    if (!userProfile?.id) return;

    try {
      const response = await axios.put(
        `/api/users/${userProfile.id}`,
        updatedProfile
      );
      setUserProfile((prev) =>
        prev ? { ...prev, ...response.data.user } : null
      );
    } catch (error) {
      console.error("Failed to update user profile", error);
      throw error;
    }
  };

  const value = {
    userProfile,
    posts,
    projects,
    articles,
    loading,
    error,
    viewMode,
    setViewMode,
    fetchUserData,
    updateUserProfile,
  };

  return (
    <UserProfileContext.Provider value={value}>
      {children}
    </UserProfileContext.Provider>
  );
}

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error(
      "useUserProfile must be wrapped within a UserProfileProvider"
    );
  }

  return context;
};
