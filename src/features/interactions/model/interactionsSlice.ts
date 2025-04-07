import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IInteraction, IState } from '@/entities/Interactions/types.ts';
import api from '@/shared/api/api.ts';

const initialState: IState = {
    interactions: [],
    status: 'idle',
    error: null,
};

export const getInteractionsById = createAsyncThunk('interactions/fetchByClientId', async ({ id }: { id: number }, { rejectWithValue }) => {
    try {
        const response = await api.get(`/interactions/client/${id}`);
        return response.data;
    } catch {
        return rejectWithValue('Ошибка загрузки взаимодействий');
    }
});

export const addInteractionById = createAsyncThunk(
    'interactions/add',
    async ({ client_id, type, notes, date }: IInteraction, { rejectWithValue }) => {
        try {
            const response = await api.post(`/interactions`, { client_id, type, notes, date });
            return response.data;
        } catch {
            return rejectWithValue('Ошибка добавления взаимодействия');
        }
    },
);

export const updateInteractionById = createAsyncThunk(
    'interactions/update',
    async ({ id, client_id, type, notes, date }: IInteraction, { rejectWithValue }) => {
        try {
            const response = await api.put(`/interactions/${id}`, { client_id, type, notes, date });
            return response.data;
        } catch {
            return rejectWithValue('Ошибка редактирования взаимодействия');
        }
    },
);
export const removeInteractionById = createAsyncThunk('interactions/delete', async ({ id }: { id: number }, { rejectWithValue }) => {
    try {
        await api.delete(`/interactions/${id}`);
        return id;
    } catch {
        return rejectWithValue('Ошибка удаления взаимодействия');
    }
});

export const interactionsSlice = createSlice({
    name: 'interactions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getInteractionsById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getInteractionsById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.interactions = action.payload;
            })
            .addCase(getInteractionsById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message as string;
            })
            .addCase(addInteractionById.fulfilled, (state, action) => {
                state.interactions.push(action.payload);
                state.status = 'succeeded';
            })
            .addCase(updateInteractionById.fulfilled, (state, action) => {
                const index = state.interactions.findIndex((inter) => inter.id === action.payload.id);
                if (index !== -1) {
                    state.interactions[index] = action.payload;
                }
            })
            .addCase(removeInteractionById.fulfilled, (state, action) => {
                state.interactions = state.interactions.filter((interaction) => interaction.id !== action.payload);
            });
    },
});

export default interactionsSlice.reducer;
