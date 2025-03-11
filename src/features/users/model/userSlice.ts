import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


export const getUser = createAsyncThunk(
    'user',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get('http://localhost:3000/api/users')
            return response.data
        } catch {
            return rejectWithValue("Ошибка загрузки данных о пользователе");
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: [],
        status: 'idle',
        error: ''
    },
    reducers: {},
    extraReducers: builder => {
        builder
           .addCase(getUser.pending, (state) => {
                state.error = '';
                state.status = 'loading';
            })
           .addCase(getUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.status ='succeeded';
            })
           .addCase(getUser.rejected, (state, action) => {
                state.error = action.payload as string;
            })
    }
})


export default userSlice.reducer;
