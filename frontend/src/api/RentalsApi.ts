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
    imagePath: string;
};

export interface RentalRequestDTO {
    id?: number;
    name: string;
    address: string;
    city: string;
    state: string;
    phoneNumber: string;
    email: string;
    website: string;
    openingHours: string;
    image?: File | null;
};

interface PaginatedRentalResponse {
    content: Rental[];
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
}

interface PaginationParams {
    offset?: number;
    pageSize?: number;
    sortBy?: string;
}

export const rentalsApi = createApi ({
    reducerPath: "rentalsApi",
    baseQuery,
    endpoints: (builder) => ({
        getRentals: builder.query<Rental[], void> ({
            query: () => `/rentals`,
        }),
        getRentalsWithPaginaiton: builder.query<PaginatedRentalResponse, PaginationParams>({
            query: (params) => ({
              url: '/rentals/with-pagination',
              params: {
                offset: params?.offset || 0,
                pageSize: params?.pageSize || 10,
                sortBy: params?.sortBy || 'id'
              }
            })
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
        addRental: builder.mutation({
            query: ({ rentalData, image }: { rentalData: RentalRequestDTO; image: File }) => {
                const formData = new FormData();
                formData.append('rental', new Blob([JSON.stringify(rentalData)], { type: 'application/json' }));
                formData.append('image', image);    
                return {
                  url: '/rentals',
                  method: 'POST',
                  body: formData,
                };
            },
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
    useGetRentalsWithPaginaitonQuery,
    useGetRentalByIdQuery,
    useGetRentalsByNameQuery,
    useGetRentalCitiesQuery,
    useGetRentalsByCityQuery,
    useGetNumberOfRentalsByCityQuery,
    useAddRentalMutation,
    useUpdateRentalMutation,
    useDeleteRentalMutation,
} = rentalsApi;