import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "@/shared/api/api.ts";
import {IAddClient, IClients} from "@/entities/Client/types.ts";

const initialState: IClients = {
    clients: [],
    currentClient: null,
    status: 'idle',
    error: null,
}

export const getClients = createAsyncThunk(
    'clients/fetchClients',
    async (_, {rejectWithValue }) => {
        try {
            const res = await api.get('/clients')
            return res.data
        } catch {
            return rejectWithValue('Ошибка получения клиентов')
        }
    }
)

export const getClientsById = createAsyncThunk(
    'clients/fetchClientsById',
    async ({id}: {id: number}, {rejectWithValue }) => {
        try {
            const res = await api.get(`/clients/${id}`)
            return res.data
        } catch {
            return rejectWithValue('Ошибка получения клиентов')
        }
    }
)

export const addClient = createAsyncThunk(
    'clients/addClient',
    async (clientData: IAddClient, {rejectWithValue }) => {
        try {
            const res = await api.post(`/clients`, clientData)
            return res.data
        } catch {
            return rejectWithValue('Ошибка при создании клиента')
        }
    }
)

const clientSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getClients.pending, (state) => {
            state.status = 'loading';
            })
            .addCase(getClients.fulfilled, (state, action) => {
                state.clients = action.payload;
                state.status = 'succeeded';
            })
            .addCase(getClients.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(getClientsById.pending, (state) => {
                state.status = 'loading';
                state.currentClient = null;
            })
            .addCase(getClientsById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentClient = action.payload
            })
            .addCase(getClientsById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(addClient.fulfilled, (state, action) => {
                state.clients.push(action.payload);
                state.status ='succeeded';
            })
    }
})

export default clientSlice.reducer;
