export interface IClients {
    clients: IClient[],
    currentClient: IClient | null,
    status: "idle" | "loading" | "succeeded" | "failed",
    error: string | null,
}

export interface IClient {
    address: string,
    contact_person: string,
    readonly createdAt: string,
    email: string,
    readonly id: number,
    industry: string,
    manager_id: number | null,
    name: string,
    phone: string,
    readonly updatedAt: string,
}

export interface IAddClient {
    address: string,
    contact_person: string,
    email: string,
    industry: string,
    name: string,
    phone: string,
}
