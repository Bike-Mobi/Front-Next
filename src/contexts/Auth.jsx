'use client'

import { useRouter } from "next/navigation";
import { createContext, useState } from "react";

export const AuthContext = createContext()

export function AuthProvider({ children }) {

    const [authData, setAuthData] = useState(undefined)
    const [error, setError] = useState()

    const router = useRouter()

    async function verifyToken(token) {
        
    }

    async function signIn(email, password) {
        
    }

    function signOut() {
        
    }

    return (
        <AuthContext.Provider value={{ authData, error, signIn, signOut, verifyToken }}>
            {children}
        </AuthContext.Provider>
    )
}