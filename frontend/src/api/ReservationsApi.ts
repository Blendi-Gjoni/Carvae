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
    car: Car;
    startDate: string;
    endDate: string;
    status: string;
    price: number;
};

export interface ReservationDTO {
    id?: number;
    userId: number;
    rentalId: number;
    carId: number;
    startDate: string;
    endDate: string;
};

interface PaginatedReservationResponse {
    content: Reservation[];
    pageable: {
      pageNumber: number;
      pageSize: number;
      sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
      };
    };
    totalElements: number;
    totalPages: number;
    last: boolean;
    size: number;
    number: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    first: boolean;
    numberOfElements: number;
    empty: boolean;
};

interface PaginationParams {
    offset?: number;
    pageSize?: number;
    sortBy?: string;
};

export const reservationsApi = createApi ({
    reducerPath: 'reservationsApi',
    baseQuery,
    endpoints: (builder) => ({
        getReservations: builder.query<Reservation[], void> ({
            query: () => `/reservations`,
        }),
        getReservationsWithPagination: builder.query<PaginatedReservationResponse, PaginationParams> ({
            query: (params) => ({
                url: '/reservations/with-pagination',
                params: {
                    offset: params?.offset || 0,
                    pageSize: params?.pageSize || 10,
                    sortBy: params?.sortBy || 'id'
                  }
            })
        }),
        getReservationById: builder.query<Reservation, number> ({
            query: (id) => `/reservations/${id}`,
        }),
        addReservation: builder.mutation<Reservation, Partial<ReservationDTO>> ({
            query: (reservation) => ({
                url: `/reservations`,
                method: 'POST',
                body: reservation
            }),
        }),
        updateReservation: builder.mutation<Reservation, {id: number, reservation: Partial<ReservationDTO> }> ({
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
    useGetReservationsWithPaginationQuery,
    useGetReservationByIdQuery,
    useAddReservationMutation,
    useUpdateReservationMutation,
    useDeleteReservationMutation,
} = reservationsApi;