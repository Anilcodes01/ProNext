import {createContext, useCallback, useState, ReactNode,  useContext, use} from 'react'
import { ExtendedUser } from '@/types/types'
import axios from 'axios'
import { UserContextType } from '@/types/types'

const UserContext = createContext<UserContextType | undefined>(undefined);

// export const UserProvider: React.FC<{children: ReactNode}> = ({
//     children
// }) => {
//     const [users, setUsers] = useState<ExtendedUser[]>([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [selectedUser, setSelectedUser] = useState<ExtendedUser | null>(null)

//     const fetchUsers = useCallback
// }