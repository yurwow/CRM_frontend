import { alpha, Box, Grid, Paper, Typography, useTheme } from '@mui/material';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { COLORS } from '@/pages/StatisticsPage/const/colors.ts';
import { IStats } from '@/entities/Statistics/types.ts';

interface InteractionStatsByTypeProps {
    stats: IStats;
}

export const InteractionStatsByType = ({ stats }: InteractionStatsByTypeProps) => {
    const theme = useTheme();

    return (
        <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                <Box sx={{ p: 2, bgcolor: alpha(theme.palette.primary.light, 0.1) }}>
                    <Typography variant="h6" fontWeight="bold">
                        Количество взаимодействий по типу
                    </Typography>
                </Box>
                <Box sx={{ p: 2, height: 350 }}>
                    {stats.interactionsByType?.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats.interactionsByType}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="type" />
                                <YAxis />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: 8,
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                        border: 'none',
                                    }}
                                />
                                <Legend />
                                <Bar dataKey="count" name="Количество" fill={COLORS[0]} radius={[4, 4, 0, 0]} animationDuration={1500} />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            <Typography variant="body2" color="text.secondary">
                                Нет данных для отображения
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Paper>
        </Grid>
    );
};
