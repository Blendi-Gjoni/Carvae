import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
    credentials: 'include',
});

export const reservationsApi = createApi ({
    reducerPath: 'reservationsApi',
    baseQuery,
    endpoints: (builder) => ({
        getReservations: builder.query ({
            query: () => `/reservations`,
        }),
        getReservationById: builder.query ({
            query: ({ id }) => `/reservations/${id}`,
        }),
        addReservation: builder.mutation ({
            query: (reservation) => ({
                url: `/reservations`,
                method: 'POST',
                body: reservation
            }),
        }),
        updateReservation: builder.mutation ({
            query: ({id, ...reservation}) => ({
                url: `/reservations/${id}`,
                method: 'PUT',
                body: reservation,
            }),
        }),
        deleteReservation: builder.mutation ({
            query: ({ id }) => ({
                url: `/reservations/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetReservationsQuery,
    useGetReservationByIdQuery,
    useAddReservationMutation,
    useUpdateReservationMutation,
    useDeleteReservationMutation,
} = reservationsApi;