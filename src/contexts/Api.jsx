'use client'

import axios from "axios";
import { createContext } from "react";

export const ApiContext = createContext()

export function ApiProvider({ children }) {

    const instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_BACK_END,
        headers: {
            Accept : "application/json",
            "Content-Type": "application/json"
        },
    }); 
    
    return (
        <ApiContext.Provider value={{instance}}>
            {children}
        </ApiContext.Provider>
    )
    
}