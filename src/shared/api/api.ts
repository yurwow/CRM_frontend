import axios from "axios";

const API_URL = "http://localhost:3000/api";

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true, // Чтобы сервер мог отправлять HTTP-only куки (refreshToken)
});

// Перехватчик запросов: добавляет accessToken
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Перехватчик ответов: обновляет токен при 401
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            try {
                // Обновляем токен
                const { data } = await axios.post(`${API_URL}/auth/refresh`, { withCredentials: true });
                localStorage.setItem("accessToken", data.accessToken);

                // Повторяем оригинальный запрос с новым токеном
                error.config.headers.Authorization = `Bearer ${data.accessToken}`;
                return axios(error.config);
            } catch (err) {
                console.error("Ошибка обновления токена", err);
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
