import {configureStore} from "@reduxjs/toolkit";
import authSlice from "@/features/auth/model/authSlice.ts";
import clientSlice from "@/features/clients/model/clientSlice.ts";
import {setupInterceptors} from "@/shared/api/api.ts";
import interactionsSlice from "@/features/interactions/model/interactionsSlice.ts";


export const store = configureStore({
    reducer: {
        auth: authSlice,
        clients: clientSlice,
        interactions: interactionsSlice
    },
})

setupInterceptors(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

