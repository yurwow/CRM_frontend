import { CardsStatistics } from '@/widgets/CardsStatistics/ui/CardsStatistics.tsx';
import { Grid } from '@mui/material';
import { StatsTable } from '@/widgets/StatsTable';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/reduxHooks.ts';
import { useEffect } from 'react';
import { getStatistics } from '@/features/statistics/model/statisticsSlice.ts';

export const StatisticsAll = () => {
    const dispatch = useAppDispatch();
    const stats = useAppSelector((state) => state.statistics);

    useEffect(() => {
        dispatch(getStatistics());
    }, [dispatch]);

    return (
        <>
            <CardsStatistics stats={stats} />
            <Grid container spacing={3}>
                {/*<InteractionStatsByType stats={stats}/>*/}
                {/*<AverageStatsByClient stats={stats}/>*/}
                <StatsTable stats={stats} />
            </Grid>
        </>
    );
};
