export interface Author {
    full_name: string;
}

export interface Review {
    id: number;
    contractor_id: number;
    author_id: number;
    rating: 1 | 2 | 3 | 4 | 5;
    comment?: string | null;
    created_at: string;
    author: Author;
}
