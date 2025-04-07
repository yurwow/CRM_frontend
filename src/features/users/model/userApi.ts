import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '@/entities/User/types.ts';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        getUsers: builder.query<User[], void>({
            query: () => 'users',
            providesTags: ['Users'],
        }),
        createUser: builder.mutation<User, Partial<User>>({
            query: (user) => ({
                url: 'auth/register',
                method: 'POST',
                body: user,
            }),
            invalidatesTags: ['Users'],
        }),
        deleteUser: builder.mutation<void, number>({
            query: (id) => ({
                url: `users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Users'],
        }),
    }),
});

export const {
    useGetUsersQuery,
    useCreateUserMutation,
    useDeleteUserMutation,
} = userApi;
