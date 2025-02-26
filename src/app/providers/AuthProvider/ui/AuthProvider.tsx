import { ReactNode } from "react";
import {AuthContext} from "@/app/providers/AuthContext/AuthContext.ts";
import {useProvideAuth} from "@/shared/lib/hooks/useProvideAuth.ts";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const auth = useProvideAuth()

    if (auth.isLoading) {
        return <div>Загрузка...</div>;
    }

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
};
