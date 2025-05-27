import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Review } from '@/entities/Review/types.ts';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const reviewApi = createApi({
    reducerPath: 'reviewApi',
    baseQuery: baseQuery,
    tagTypes: ['Review'],
    endpoints: (builder) => ({
        getReview: builder.query<Review[], void>({
            query: () => 'reviews',
            providesTags: ['Review'],
        }),
        getReviewsById: builder.query<Review[], number>({
            query: (id) => ({
                url: `reviews/contractor/${id}`,
            }),
            providesTags: ['Review'],
        }),
        createReview: builder.mutation<Review, Partial<Review>>({
            query: (review) => ({
                url: 'reviews',
                method: 'POST',
                body: review,
            }),
            invalidatesTags: ['Review'],
        }),
        deleteReview: builder.mutation<void, number>({
            query: (id) => ({
                url: `reviews/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Review'],
        }),
    }),
});

export const {
    useGetReviewQuery,
    useGetReviewsByIdQuery,
    useCreateReviewMutation,
    useDeleteReviewMutation,
} = reviewApi;
