import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router';
import { LogoutButton } from '@/widgets/LogoutButton';
import { jwtDecode } from 'jwt-decode';
import { IJwtPayload } from '@/entities/JwtDecode/types.ts';

export const Header = () => {
    const navigate = useNavigate();

    const accessToken = localStorage.getItem('accessToken');
    const role = accessToken ? jwtDecode<IJwtPayload>(accessToken).role : null;

    return (
        <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
            <Container>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                        <Link style={{ textDecoration: 'none' }} to="/">
                            Clients CRM
                        </Link>
                    </Typography>
                    <Box>
                        {role === 'admin' && (
                            <Button color="inherit" onClick={() => navigate('/admin')} sx={{ fontSize: '1rem', mx: 1 }}>
                                Пользователи
                            </Button>
                        )}
                        <Button color="inherit" onClick={() => navigate('/')} sx={{ fontSize: '1rem', mx: 1 }}>
                            Клиенты
                        </Button>
                        <Button color="inherit" onClick={() => navigate('/statistics')} sx={{ fontSize: '1rem', mx: 1 }}>
                            Статистика
                        </Button>
                        <Button color="inherit" onClick={() => navigate('/contractors')} sx={{ fontSize: '1rem', mx: 1 }}>
                            Подрядчики
                        </Button>
                    </Box>
                    <LogoutButton />
                </Toolbar>
            </Container>
        </AppBar>
    );
};
