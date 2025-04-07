import { createApi } from '@reduxjs/toolkit/query/react';
import { IStats } from '@/entities/Statistics/types.ts';
import { baseQueryWithReauth } from '@/shared/api/baseQueryWithReauth.ts';

export const statisticsApi = createApi({
    reducerPath: 'statisticsApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getStatistics: builder.query<IStats, void>({
            query: () => ({
                url: '/statistics',
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetStatisticsQuery } = statisticsApi;
