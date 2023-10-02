'use client'

import axios from "axios";
import { createContext } from "react";

export const ApiContext = createContext()

export function ApiProvider({ children }) {

    let instance = axios.create({
        baseURL: 'https://bikemobi.com.br/api',
        headers: {
            'Content-Type': 'multipart/form-data',
            Accept: "application/json",
            // "Content-Type": "multipart/form-data" // Ajuste o Content-Type para multipart/form-data
        },
    }); 
    
    return (
        <ApiContext.Provider value={{instance}}>
            {children}
        </ApiContext.Provider>
    )
    
}