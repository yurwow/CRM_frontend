import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

const ForbiddenPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Нет доступа | Clients CRM';
    }, []);

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#f5f5f5',
                textAlign: 'center',
                px: 2,
            }}
        >
            <Typography variant="h1" color="error" fontWeight={700}>
                403
            </Typography>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Упс! Доступ запрещён.
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
                У вас нет прав для просмотра этой страницы.
            </Typography>
            <Button variant="contained" color="primary" onClick={() => navigate('/')}>
                На главную
            </Button>
        </Box>
    );
};

export default ForbiddenPage;
