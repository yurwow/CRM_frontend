import { Box, useTheme, alpha } from '@mui/material';
import { Header } from '@/widgets/Header';
import { HeaderStatistics } from '@/widgets/HeaderStatistics';
import { StatisticsAll } from '@/widgets/StatisticsAll';

const StatisticsPage = () => {
    const theme = useTheme();

    return (
        <>
            <Header />
            <Box
                sx={{
                    p: 3,
                    bgcolor: alpha(theme.palette.primary.light, 0.04),
                    minHeight: 'calc(100vh - 64px)',
                }}
            >
                <HeaderStatistics />
                <StatisticsAll />
            </Box>
        </>
    );
};

export default StatisticsPage;
