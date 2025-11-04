import { createContext, useState, useContext, ReactNode, useMemo, useEffect, use } from "react";
import axios from "axios";

// URL del backend
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Obtener el token inicial desde el almacenamiento local
const initialToken = localStorage.getItem("authToken");

if (initialToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${initialToken}`;
}

// Tipos para Typescript
interface AuthContextType {
    token: string | null;
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

// Crear el contexto de autenticación
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(initialToken);

    // Efecto para sincronizar el token con el almacenamiento local y axios
    useEffect(() => {
        if (token) {
            localStorage.setItem("authToken", token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
            localStorage.removeItem("authToken");
            delete axios.defaults.headers.common["Authorization"];
        }   
    }, [token]);

    // Función para iniciar sesión
    const login = async (username: string, password: string) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                username: username,
                password: password,
            });

            // Si el backend responde 200 OK, guardar el token
            const { token: newToken } = response.data;
            setToken(newToken);

        } catch (error) {
            console.error("Login failed:", error);
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data.message || "Login failed");
            } 
            throw new Error("Network error or server did not respond");
        }
    };

    // Función para cerrar sesión
    const logout = () => {
        setToken(null);
    };

    // Valor del contexto memorizado
    const value = useMemo(
        () => ({
            token,
            isAuthenticated: !!token,
            login,
            logout,
        }),
        [token]
    );

    return (<AuthContext.Provider value={value}>{children}</AuthContext.Provider>);
};

// Hook para usar el contexto de autenticación
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};