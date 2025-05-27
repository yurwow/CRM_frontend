import { IStatsInteractionMonth } from '@/entities/Statistics/types.ts';

export const mergeMonthlyData = (
    clientsData: IStatsInteractionMonth[] = [],
    interactionsData: IStatsInteractionMonth[] = [],
) => {
    const mergedData: {
        [key: string]: { month: string; clients: number; interactions: number };
    } = {};

    clientsData.forEach((item) => {
        const month = item.month;
        const count = item.count;
        if (!mergedData[month]) {
            mergedData[month] = { month, clients: 0, interactions: 0 };
        }
        mergedData[month].clients = count;
    });

    interactionsData.forEach((item) => {
        const month = item.month;
        const count = item.count;
        if (!mergedData[month]) {
            mergedData[month] = { month, clients: 0, interactions: 0 };
        }
        mergedData[month].interactions = count;
    });

    return Object.values(mergedData).sort((a, b) => {
        const dateA = new Date(a.month);
        const dateB = new Date(b.month);
        return dateA.getTime() - dateB.getTime();
    });
};
