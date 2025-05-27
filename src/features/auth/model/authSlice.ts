import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

interface IState {
    accessToken: string | null;
    refreshToken: string | null;
    isAuth: boolean;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: null | string;
}

const initialState: IState = {
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    isAuth: !!localStorage.getItem('accessToken'),
    status: 'idle',
    error: null,
};

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                email,
                password,
            });
            const { accessToken, refreshToken } = response.data;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            console.log(accessToken, refreshToken);
            return { accessToken, refreshToken };
        } catch {
            return rejectWithValue('Ошибка входа');
        }
    },
);

export const refresh = createAsyncThunk('auth/refresh', async (_, { rejectWithValue }) => {
    try {
        const storedRefreshToken = localStorage.getItem('refreshToken');
        if (!storedRefreshToken) {
            return rejectWithValue('Отсутствует refreshToken');
        }
        const response = await axios.post(`${API_URL}/auth/refresh`, {
            refreshToken: storedRefreshToken,
        });
        const { accessToken, refreshToken } = response.data;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        console.log('токены обновились');
        return { accessToken, refreshToken };
    } catch (err) {
        const message = axios.isAxiosError(err)
            ? err.response?.data?.error || 'Ошибка при обновлении токена'
            : 'Неизвестная ошибка';
        return rejectWithValue(message);
    }
});

export const logout = createAsyncThunk('/auth/logout', async (_, { rejectWithValue }) => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');

        if (refreshToken) {
            await axios.post(`${API_URL}/auth/logout`, { refreshToken });
        }

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        return null;
    } catch {
        return rejectWithValue('Ошибка выхода');
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.isAuth = true;
                console.log(state);
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(refresh.fulfilled, (state, action) => {
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.isAuth = true;
            })
            .addCase(refresh.rejected, (state) => {
                state.accessToken = null;
                state.refreshToken = null;
                state.isAuth = false;
            })
            .addCase(logout.fulfilled, (state) => {
                state.accessToken = null;
                state.refreshToken = null;
                state.isAuth = false;
            });
    },
});

export default authSlice.reducer;
