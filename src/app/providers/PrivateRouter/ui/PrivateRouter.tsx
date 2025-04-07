import { Navigate, Outlet } from 'react-router';
import { useAppSelector } from '@/shared/lib/hooks/reduxHooks.ts';

export const PrivateRouter = () => {
    // const { isAuth } = useAppSelector((state) => state.auth);
    const isAuth = true;
    return isAuth ? <Outlet /> : <Navigate to="/login" />;
};
