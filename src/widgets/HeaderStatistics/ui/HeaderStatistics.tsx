import { Box, Divider, Typography } from '@mui/material';

export const HeaderStatistics = () => {
    return (
        <>
            <Box
                sx={{
                    mb: 4,
                    mt: 2,
                    textAlign: 'center',
                    position: 'relative',
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 'bold',
                        backgroundImage: 'linear-gradient(45deg, #3f51b5, #00bcd4)',
                        backgroundClip: 'text',
                        color: 'transparent',
                        mb: 1,
                    }}
                >
                    Аналитика и статистика
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Общая информация и показатели по клиентам и взаимодействиям
                </Typography>
                <Divider sx={{ mt: 2 }} />
            </Box>
        </>
    );
};
