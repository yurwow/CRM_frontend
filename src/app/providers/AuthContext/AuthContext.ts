import {createContext} from "react";

interface AuthContextType {
    isAuth: boolean;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
    isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null)
