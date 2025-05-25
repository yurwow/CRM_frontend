import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Contractor } from '@/entities/Contractors/types.ts';

export const contractorsApi = createApi({
    reducerPath: 'contractorsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
    tagTypes: ['Contractors'],
    endpoints: (builder) => ({
        getContractors: builder.query<Contractor[], void>({
            query: () => 'contractors',
            providesTags: ['Contractors'],
        }),
        getContractorById: builder.query<Contractor, number>({
            query: (id: number) => `contractors/${id}`,
            providesTags: ['Contractors'],
        }),
        createContractor: builder.mutation<Contractor, Partial<Contractor>>({
            query: (data) => ({
                url: 'contractors',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Contractors'],
        }),
        updateContractor: builder.mutation<Contractor, { id: number; data: Partial<Contractor> }>({
            query: ({ id, data }) => ({
                url: `contractors/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Contractors'],
        }),

        deleteContractor: builder.mutation<void, number>({
            query: (id) => ({
                url: `contractors/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Contractors'],
        }),
    }),
});

export const {
    useGetContractorsQuery,
    useGetContractorByIdQuery,
    useCreateContractorMutation,
    useUpdateContractorMutation,
    useDeleteContractorMutation,
} = contractorsApi;
