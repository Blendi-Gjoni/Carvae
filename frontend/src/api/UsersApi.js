import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
    credentials: 'include',
});

export const usersApi = createApi ({
    reducerPath: 'usersApi',
    baseQuery,
    endpoints: (builder) => ({
        getUsers: builder.query ({
            query: () => `/users`,
        }),
        getCurrentUser: builder.query ({
            query: () => `/users/me`,
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetCurrentUserQuery,
} = usersApi;