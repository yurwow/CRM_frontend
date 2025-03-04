import { Provider } from 'react-redux';
import {store} from "@/app/store.ts";
import {ReactNode} from "react";

export const StoreProvider = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>{children}</Provider>
);
