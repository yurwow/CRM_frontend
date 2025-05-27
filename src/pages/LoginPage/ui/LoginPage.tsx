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

    useEffect(() => {
        document.title = 'Вход | Clients CRM';
    }, []);

    return (
        <>
            <LoginForm />
        </>
    );
};

export default LoginPage;
