export interface IInteraction {
    readonly id?: number;
    readonly client_id?: number;
    readonly createdAt?: string;
    readonly updatedAt?: string;
    type: string;
    notes: string;
    date: string;
}

export interface IState {
    interactions: IInteraction[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}
