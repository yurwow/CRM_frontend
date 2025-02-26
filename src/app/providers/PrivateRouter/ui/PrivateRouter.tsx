import {Navigate, Outlet} from "react-router";
import {useAuth} from "@/shared/lib/hooks/useAuth.ts";

export const PrivateRouter = () => {
    const {isAuth} = useAuth()

    return isAuth ? <Outlet/> : <Navigate to="/login"/>
}
