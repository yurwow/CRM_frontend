import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box, Container } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router';
import { LogoutButton } from '@/widgets/LogoutButton';
import { jwtDecode } from 'jwt-decode';
import { IJwtPayload } from '@/entities/JwtDecode/types.ts';

export const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const accessToken = localStorage.getItem('accessToken');
    const role = accessToken ? jwtDecode<IJwtPayload>(accessToken).role : null;

    const isActive = (path: string) => location.pathname === path;

    const getButtonStyles = (path: string) => ({
        fontSize: '1rem',
        mx: 1,
        color: 'white',
        backgroundColor: isActive(path) ? 'rgb(145,177,236)' : 'rgb(25, 118, 210)',
        '&:hover': {
            backgroundColor: isActive(path) ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
        },
    });

    return (
        <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
            <Container>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                        <Link style={{ textDecoration: 'none', color: 'white' }} to="/">
                            Clients CRM
                        </Link>
                    </Typography>
                    <Box>
                        {role === 'admin' && (
                            <Button onClick={() => navigate('/admin')} sx={getButtonStyles('/admin')}>
                                Пользователи
                            </Button>
                        )}
                        <Button onClick={() => navigate('/')} sx={getButtonStyles('/')}>
                            Клиенты
                        </Button>
                        <Button onClick={() => navigate('/statistics')} sx={getButtonStyles('/statistics')}>
                            Статистика
                        </Button>
                        <Button onClick={() => navigate('/contractors')} sx={getButtonStyles('/contractors')}>
                            Подрядчики
                        </Button>
                    </Box>
                    <LogoutButton />
                </Toolbar>
            </Container>
        </AppBar>
    );
};
