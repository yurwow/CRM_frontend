export interface IStats {
    totalClients: number;
    newClientsCurrent: number;
    newClientsPrevious: number;
    interactionsCurrent: number;
    interactionsPrevious: number;
    clientGrowth: number;
    interactionGrowth: number;
    activityGrowth: number;
    interactionsByType: IStatsInteractionType[];
    averageInteractionsPerClient: number;
    clientsByMonth: IStatsInteractionMonth[];
    interactionsByMonth: IStatsInteractionMonth[];
}

export interface IStatsInteractionType {
    type: string;
    count: number;
}

export interface IStatsInteractionMonth {
    month: string;
    count: number;
}
