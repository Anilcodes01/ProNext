import { createContext, useState, useContext, ReactNode, useCallback, useRef } from "react";
import { Post } from "@/types/types";
import axios from "axios";
import { PostContextType } from "@/types/types";

const PostContext = createContext<PostContextType>({
  posts: [],
  postLoading: false,
  postError: null,
  fetchPosts: async () => {},
  addPost: () => {},
  deletePost: async (postId: string) => {}
});

export const PostProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postLoading, setPostLoading] = useState(false);
  const [postError, setPostError] = useState<string | null>(null);
  const hasInitialFetch = useRef(false);

  const fetchPosts = useCallback(async () => {
    if (postLoading || (posts.length > 0 && hasInitialFetch.current)) {
      return;
    }

    setPostLoading(true);
    try {
      const response = await axios.get("/api/post/fetchPost");
      setPosts(response.data.posts);
      setPostError(null);
      hasInitialFetch.current = true;
    } catch (error) {
      console.error(error);
      setPostError("Failed to fetch posts.");
    } finally {
      setPostLoading(false);
    }
  }, [postLoading, posts.length]);

  const addPost = useCallback((newPost: Post) => {
    setPosts(currentPosts => [newPost, ...currentPosts]);
  }, []);

  const deletePost = useCallback(async (postId: string) => {
    try {
      await axios.delete(`/api/post/deletePost/${postId}`);
      setPosts((currentPosts) => currentPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Failed to delete post", error);
      setPostError("Failed to delete post.");
    }
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts,
        postLoading,
        postError,
        fetchPosts,
        addPost,
        deletePost
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePosts must be used within a PostProvider");
  }
  return context;
};