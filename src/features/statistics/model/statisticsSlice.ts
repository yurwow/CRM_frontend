import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '@/shared/api/api.ts';
import { IStats } from '@/entities/Statistics/types.ts';

const initialState: IStats = {
    totalClients: 0,
    newClientsCurrent: 0,
    newClientsPrevious: 0,
    interactionsCurrent: 0,
    interactionsPrevious: 0,
    clientGrowth: 0,
    interactionGrowth: 0,
    activityGrowth: 0,
    interactionsByType: [],
    averageInteractionsPerClient: 0,
    clientsByMonth: [],
    interactionsByMonth: [],
};

export const getStatistics = createAsyncThunk('statistics', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get(`/statistics`);
        return response.data;
    } catch {
        return rejectWithValue('Ошибка загрузки взаимодействий');
    }
});

const statisticsSlice = createSlice({
    name: 'statistics',
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(getStatistics.fulfilled, (state, action) => {
                return { ...state, ...action.payload };
            })
            .addCase(getStatistics.rejected, () => {
                console.error('Ошибка загрузки статистики');
            }),
});

export default statisticsSlice.reducer;
