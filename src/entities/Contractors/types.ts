import { Review } from '@/entities/Review/types.ts';

export interface Contractor {
    readonly id: number;
    name: string;
    contact_person: string;
    phone: string;
    email: string;
    specialization: string;
    info: string;
    address: string;
    readonly created_at: string;
    readonly updated_at: string;
    average_rating: string | null;
    reviews: Review[];
}
