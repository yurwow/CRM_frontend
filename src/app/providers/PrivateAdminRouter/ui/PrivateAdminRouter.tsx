import { Navigate, Outlet } from 'react-router';
import { jwtDecode } from 'jwt-decode';
import { IJwtPayload } from '@/entities/JwtDecode/types.ts';

export const PrivateAdminRouter = () => {
    const accessToken = localStorage.getItem('accessToken');
    const role = accessToken ? jwtDecode<IJwtPayload>(accessToken).role : null;
    console.log(role);

    return role === 'admin' ? <Outlet /> : <Navigate to="/forbidden" />;
};
