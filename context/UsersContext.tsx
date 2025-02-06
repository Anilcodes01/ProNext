import {
  createContext,
  useCallback,
  useState,
  ReactNode,
  useContext,
  
} from "react";
import { ExtendedUser } from "@/types/types";
import axios from "axios";
import { UserContextType } from "@/types/types";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<ExtendedUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<ExtendedUser | null>(null);

  const fetchUsers = useCallback(async () => {
    if (loading || users.length > 0) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get("/api/users");
      setUsers(response.data.users);
      setError(null);
    } catch (error) {
      setError("Failed to fetch users...!");
    } finally {
      setLoading(false);
    }
  }, [loading, users.length]);

  return (
    <UserContext.Provider
      value={{
        users,
        loading,
        error,
        fetchUsers,
        selectedUser,
        setSelectedUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("UseUsers must be used within an UserProvider");
  }
  return context;
};
