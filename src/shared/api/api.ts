import axios from "axios";
import {logout, refresh} from "@/features/auth/model/authSlice.ts";
import {AppStore} from "@/app/store.ts";

const API_URL = "http://localhost:3000/api";

const api = axios.create({
    baseURL: API_URL,
});

export const setupInterceptors = (store: AppStore) => {
    api.interceptors.request.use((config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response?.status === 401) {
                try {
                    const resultAction = await store.dispatch(refresh());

                    if (refresh.fulfilled.match(resultAction)) {
                        error.config.headers.Authorization = `Bearer ${resultAction.payload.accessToken}`;
                        return api(error.config);
                    } else {
                        store.dispatch(logout());
                        return Promise.reject(error);
                    }
                } catch {
                    return Promise.reject(error);
                }
            }
            return Promise.reject(error);
        }
    );
};

export default api;
