export interface IJwtPayload {
    id: number;
    email: string;
    role: 'admin' | 'manager';
    exp: number;
    iat: number;
}
