import { configureStore } from '@reduxjs/toolkit';
import authSlice from '@/features/auth/model/authSlice.ts';
import clientSlice from '@/features/clients/model/clientSlice.ts';
import { setupInterceptors } from '@/shared/api/api.ts';
import interactionsSlice from '@/features/interactions/model/interactionsSlice.ts';
import userSlice from '@/features/users/model/userSlice.ts';
import statisticsSlice from '@/features/statistics/model/statisticsSlice.ts';
import { userApi } from '@/features/users/model/userApi.ts';
import { statisticsApi } from '@/features/statistics/model/statisticsApi.ts';
import {authApi} from '@/features/auth/model/authApi.ts';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        clients: clientSlice,
        interactions: interactionsSlice,
        users: userSlice,
        statistics: statisticsSlice,
        [userApi.reducerPath]: userApi.reducer,
        [statisticsApi.reducerPath]: statisticsApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(userApi.middleware)
            .concat(statisticsApi.middleware)
            .concat(authApi.middleware),
});

setupInterceptors(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
