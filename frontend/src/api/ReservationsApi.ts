import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "./UsersApi";
import { Rental } from "./RentalsApi";
import { Car } from "./CarsApi";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
    credentials: 'include',
});

export interface Reservation{
    id?: number;
    user: User;
    rental: Rental;
    cars: Car[];
    startDate: string;
    endDate: string;
    status: string
}

export const reservationsApi = createApi ({
    reducerPath: 'reservationsApi',
    baseQuery,
    endpoints: (builder) => ({
        getReservations: builder.query<Reservation[], void> ({
            query: () => `/reservations`,
        }),
        getReservationById: builder.query<Reservation, number> ({
            query: (id) => `/reservations/${id}`,
        }),
        addReservation: builder.mutation<Reservation, Partial<Reservation>> ({
            query: (reservation) => ({
                url: `/reservations`,
                method: 'POST',
                body: reservation
            }),
        }),
        updateReservation: builder.mutation<Reservation, {id: number, reservation: Partial<Reservation> }> ({
            query: ({id, ...reservation}) => ({
                url: `/reservations/${id}`,
                method: 'PUT',
                body: reservation,
            }),
        }),
        deleteReservation: builder.mutation<void, number> ({
            query: (id) => ({
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