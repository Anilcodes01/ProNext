'use client'
import { useState, useEffect } from "react"
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { MessageSquare } from "lucide-react";
import { ExtendedUser } from "@/types/types";

export default function Users({onSelectUser}: {onSelectUser: (user: ExtendedUser) => void} ) {
    const [users, setUsers] = useState<ExtendedUser[]>([]);
    const [isLoading , setIsLoading] = useState(true);
    const {data: session} = useSession();

    useEffect(() => {
        
    })
}