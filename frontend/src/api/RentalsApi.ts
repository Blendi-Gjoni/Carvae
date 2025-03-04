import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
    credentials: 'include',
  });

export interface Rental {
    id?: number;
    name: string;
    address: string;
    city: string;
    state: string;
    phoneNumber: string;
    email: string;
    website: string;
    openingHours: string;
};

export const rentalsApi = createApi ({
    reducerPath: "rentalsApi",
    baseQuery,
    endpoints: (builder) => ({
        getRentals: builder.query<Rental[], void> ({
            query: () => `/rentals`,
        }),
        getRentalById: builder.query<Rental, number> ({
            query: (id) => `/rentals/${id}`,
        }),
        getRentalsByName: builder.query<Rental[], string> ({
            query: (name) => ({
                url: `/rentals/by-name`,
                params: {name},
            })
        }),
        getRentalCities: builder.query<string[], void> ({
            query: () => `/rentals/rental-cities`,
        }),
        getRentalsByCity: builder.query<Rental[], string> ({
            query: (city) => ({
                url: `/rentals/by-city`,
                params: {city},
            })
        }),
        getNumberOfRentalsByCity: builder.query<Array<[string, number]>, void> ({
            query: () => `/rentals/number-of-rentals-by-city`,
        }),
        addRental: builder.mutation<Rental, Partial<Rental>> ({
            query: (rental) => ({
                url: `/rentals`,
                method: 'POST',
                body: rental,
            })
        }),
        updateRental: builder.mutation<Rental, { id: number; rental: Partial<Rental> }> ({
            query: ({id, ...rental}) => ({
                url: `/rentals/${id}`,
                method: 'PUT',
                body: rental,
            })
        }),
        deleteRental: builder.mutation<void, number> ({
            query: (id) => ({
                url: `/rentals/${id}`,
                method: 'DELETE',
            })
        }),
    }),
});

export const {
    useGetRentalsQuery,
    useGetRentalByIdQuery,
    useGetRentalsByNameQuery,
    useGetRentalCitiesQuery,
    useGetRentalsByCityQuery,
    useGetNumberOfRentalsByCityQuery,
    useAddRentalMutation,
    useUpdateRentalMutation,
    useDeleteRentalMutation,
} = rentalsApi;