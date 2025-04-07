import { Box, Grid, Paper, Typography, useTheme } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import EventNoteIcon from '@mui/icons-material/EventNote';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { IStats } from '@/entities/Statistics/types.ts';

interface CardsStatisticsProps {
    stats: IStats;
}

export const CardsStatistics = ({ stats }: CardsStatisticsProps) => {
    const theme = useTheme();

    return (
        <>
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper
                        elevation={3}
                        sx={{
                            p: 3,
                            borderRadius: 2,
                            backgroundImage: 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)',
                            color: 'white',
                            transition: 'all 0.3s',
                            '&:hover': {
                                transform: 'translateY(-5px)',
                                boxShadow: theme.shadows[10],
                            },
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <PeopleIcon sx={{ fontSize: 40, mr: 2, opacity: 0.8 }} />
                            <Typography variant="h6">Клиенты</Typography>
                        </Box>
                        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                            {stats?.totalClients}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                            Всего в базе
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Paper
                        elevation={3}
                        sx={{
                            p: 3,
                            borderRadius: 2,
                            backgroundImage: 'linear-gradient(135deg, #00796b 0%, #009688 100%)',
                            color: 'white',
                            transition: 'all 0.3s',
                            '&:hover': {
                                transform: 'translateY(-5px)',
                                boxShadow: theme.shadows[10],
                            },
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <EventNoteIcon sx={{ fontSize: 40, mr: 2, opacity: 0.8 }} />
                            <Typography variant="h6">Взаимодействия</Typography>
                        </Box>
                        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                            {stats?.interactionsCurrent || 0}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                            Зарегистрировано всего
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Paper
                        elevation={3}
                        sx={{
                            p: 3,
                            borderRadius: 2,
                            backgroundImage: 'linear-gradient(135deg, #c2185b 0%, #e91e63 100%)',
                            color: 'white',
                            transition: 'all 0.3s',
                            '&:hover': {
                                transform: 'translateY(-5px)',
                                boxShadow: theme.shadows[10],
                            },
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <TrendingUpIcon sx={{ fontSize: 40, mr: 2, opacity: 0.8 }} />
                            <Typography variant="h6">Среднее</Typography>
                        </Box>
                        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                            {stats?.averageInteractionsPerClient || '0'}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                            Взаимодействий на клиента
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Paper
                        elevation={3}
                        sx={{
                            p: 3,
                            borderRadius: 2,
                            backgroundImage: 'linear-gradient(135deg, #ef6c00 0%, #ff9800 100%)',
                            color: 'white',
                            transition: 'all 0.3s',
                            '&:hover': {
                                transform: 'translateY(-5px)',
                                boxShadow: theme.shadows[10],
                            },
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <AccessTimeIcon sx={{ fontSize: 40, mr: 2, opacity: 0.8 }} />
                            <Typography variant="h6">Активность</Typography>
                        </Box>
                        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                            {stats?.activityGrowth}%
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                            Рост за последний месяц
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};
