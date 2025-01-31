import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
    credentials: 'include',
  });

export const rentalsApi = createApi ({
    reducerPath: "rentalsApi",
    baseQuery,
    endpoints: (builder) => ({
        getRentals: builder.query ({
            query: () => `/rentals`,
        }),
        getRentalById: builder.query ({
            query: ({ id }) => `/rentals/${id}`,
        }),
        getRentalsByName: builder.query ({
            query: (name) => ({
                url: `/rentals/by-name`,
                params: {name},
            })
        }),
        getRentalCities: builder.query ({
            query: () => `/rentals/rental-cities`,
        }),
        getRentalsByCity: builder.query ({
            query: (city) => ({
                url: `/rentals/by-city`,
                params: {city},
            })
        }),
        addRental: builder.mutation ({
            query: (rental) => ({
                url: `/rentals`,
                method: 'POST',
                body: rental,
            })
        }),
        updateRental: builder.mutation({
            query: ({id, ...rental}) => ({
                url: `/rentals/${id}`,
                method: 'PUT',
                body: rental,
            })
        }),
        deleteRental: builder.mutation ({
            query: ({id}) => ({
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
    useAddRentalMutation,
    useUpdateRentalMutation,
    useDeleteRentalMutation,
} = rentalsApi;