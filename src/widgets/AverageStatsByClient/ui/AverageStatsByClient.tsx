import { alpha, Box, Grid, Paper, Typography, useTheme } from '@mui/material';
import { IStats } from '@/entities/Statistics/types.ts';

interface AverageStatsByClientProps {
    stats: IStats;
}

export const AverageStatsByClient = ({ stats }: AverageStatsByClientProps) => {
    const theme = useTheme();
    return (
        <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                <Box sx={{ p: 2, bgcolor: alpha(theme.palette.primary.light, 0.1) }}>
                    <Typography variant="h6" fontWeight="bold">
                        Среднее количество взаимодействий на клиента
                    </Typography>
                </Box>
                <Box sx={{ p: 2, height: 350 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            flexDirection: 'column',
                        }}
                    >
                        <Typography
                            variant="h2"
                            color={theme.palette.primary.main}
                            fontWeight="bold"
                        >
                            {stats.averageInteractionsPerClient || '0'}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                            взаимодействий на одного клиента
                        </Typography>
                        <Typography
                            variant="body2"
                            color={stats.activityGrowth > 0 ? 'success.main' : 'error.main'}
                            sx={{ mt: 1 }}
                        >
                            {stats.activityGrowth > 0 ? '+' : ''}
                            {stats.activityGrowth}% к предыдущему периоду
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Grid>
    );
};
