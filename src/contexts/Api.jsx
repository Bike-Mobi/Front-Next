'use client'

import axios from "axios";
import { createContext } from "react";

export const ApiContext = createContext()

let instance = axios.create({
    baseURL: 'https://bikemobi.com.br/api',
    headers: {
        'Content-Type': 'multipart/form-data',
        Accept: "application/json",
        // "Content-Type": "multipart/form-data" // Ajuste o Content-Type para multipart/form-data
    },
}); 

export function ApiProvider({ children }) {
    
    return (
        <ApiContext.Provider value={{instance}}>
            {children}
        </ApiContext.Provider>
    )
    
}