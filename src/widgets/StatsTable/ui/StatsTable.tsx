import { alpha, Box, Grid, Paper, Typography, useTheme } from '@mui/material';
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { COLORS } from '@/pages/StatisticsPage/const/colors.ts';
import { IStats } from '@/entities/Statistics/types.ts';
import { mergeMonthlyData } from '@/widgets/StatsTable/help/mergeMonthlyData.ts';

interface StatsTableProps {
    stats: IStats;
}

export const StatsTable = ({ stats }: StatsTableProps) => {
    const theme = useTheme();
    return (
        <Grid item xs={12}>
            <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                <Box sx={{ p: 2, bgcolor: alpha(theme.palette.primary.light, 0.1) }}>
                    <Typography variant="h6" fontWeight="bold">
                        Активность по месяцам
                    </Typography>
                </Box>
                <Box sx={{ p: 2, height: 350 }}>
                    {stats.clientsByMonth?.length > 0 || stats.interactionsByMonth?.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={mergeMonthlyData(stats.clientsByMonth, stats.interactionsByMonth)}
                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="month"
                                    tickFormatter={(date) => {
                                        const d = new Date(date);
                                        return new Intl.DateTimeFormat('ru-RU', { month: 'short' }).format(d);
                                    }}
                                />
                                <YAxis />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: 8,
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                        border: 'none',
                                    }}
                                    formatter={(value, name) => [value, name === 'clients' ? 'Клиенты' : 'Взаимодействия']}
                                    labelFormatter={(label) => {
                                        const d = new Date(label);
                                        return new Intl.DateTimeFormat('ru-RU', { month: 'long', year: 'numeric' }).format(d);
                                    }}
                                />
                                <Legend formatter={(value) => (value === 'clients' ? 'Новые клиенты' : 'Взаимодействия')} />
                                <Area
                                    type="monotone"
                                    dataKey="clients"
                                    name="clients"
                                    stroke={COLORS[0]}
                                    fill={alpha(COLORS[0], 0.3)}
                                    animationDuration={1500}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="interactions"
                                    name="interactions"
                                    stroke={COLORS[1]}
                                    fill={alpha(COLORS[1], 0.3)}
                                    animationDuration={1500}
                                />
                            </AreaChart>
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
