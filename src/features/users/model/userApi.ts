import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '@/entities/User/types.ts';

interface Me {
    createdAt: string;
    email: string;
    full_name: string;
    id: number;
    password_hash: string;
    refresh_token: string;
    role: string;
    updatedAt: string;
}

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

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: baseQuery /*fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' })*/,
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        getUsers: builder.query<User[], void>({
            query: () => 'users',
            providesTags: ['Users'],
        }),
        getMe: builder.query<Me, void>({
            query: () => 'users/me',
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

export const { useGetUsersQuery, useGetMeQuery, useCreateUserMutation, useDeleteUserMutation } =
    userApi;
