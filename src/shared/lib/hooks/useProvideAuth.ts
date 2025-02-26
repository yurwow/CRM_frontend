import {useCallback, useEffect, useState} from "react";
import axios from "axios";

export const useProvideAuth = () => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("accessToken"));
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const refreshToken = async () => {
            try {
                const response = await axios.post("http://localhost:3000/api/auth/refresh", {
                    withCredentials: true,
                });
                const newToken = response.data.accessToken;
                localStorage.setItem("accessToken", newToken);
                setToken(newToken);
                console.log('рефреш токена')
            } catch (err) {
                console.error("Ошибка обновления токена:", err);
                logout();
            } finally {
                setIsLoading(false);
                console.log("finally ")
            }
        };

        if (!token) {
            refreshToken();
        } else {
            setIsLoading(false);
        }
    }, [token]);

    const login = useCallback((newToken: string) => {
        localStorage.setItem("accessToken", newToken);
        setToken(newToken);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem("accessToken");
        setToken(null);
    }, []);

    return { isAuth: !!token, token, login, logout, isLoading };
};
