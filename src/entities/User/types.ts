export interface User {
    id: number;
    full_name: string;
    email: string;
    role: string;
}

export interface IState {
    users: User[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}
