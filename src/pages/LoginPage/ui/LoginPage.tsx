import LoginForm from '../../../features/auth/ui/LoginForm.tsx';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

const LoginPage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token, navigate]);

    return (
        <>
            <LoginForm />
        </>
    );
};

export default LoginPage;
