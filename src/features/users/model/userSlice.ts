import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { IState, User } from '@/entities/User/types.ts';

interface ErrorResponse {
    message: string;
}

export const getUsers = createAsyncThunk<User[], void, { rejectValue: ErrorResponse }>(
    'user/getUsers',
    async (_, { rejectWithValue }): Promise<User[]> => {
        try {
            const response = await axios.get('http://localhost:3000/api/users');
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue({ message: error.response.data?.message || 'Ошибка загрузки данных о пользователе' });
            }
            return rejectWithValue({ message: 'Неизвестная ошибка' });
        }
    },
);

export const createUser = createAsyncThunk('user/createUser', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:3000/api/auth/register', data);

        return response.data;
    } catch {
        return rejectWithValue('Ошибка создания пользователя');
    }
});

export const deleteUser = createAsyncThunk('user/deleteUser', async (id: number) => {
    await axios.delete(`http://localhost:3000/api/users/${id}`);
    return id;
});

const initialState: IState = {
    users: [],
    status: 'idle',
    error: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.error = '';
                state.status = 'loading';
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.status = 'succeeded';
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(createUser.pending, (state) => {
                state.status = 'loading';
                state.error = '';
            })
            .addCase(createUser.fulfilled, (state) => {
                state.status = 'succeeded';
                // state.users.push(action.payload);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = (action.payload as string) || 'Ошибка создания пользователя';
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter((user) => user.id !== action.payload);
            });
    },
});

export default userSlice.reducer;
