import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
    credentials: 'include',
});

export interface Dealership {
    id?: number;
    name: string;
    address: string;
    city: string;
    state: string;
    phoneNumber: string;
    email: string;
    website: string;
    openingHours: string;
}

export const dealershipsApi = createApi ({
    reducerPath: "dealershipsApi",
    baseQuery,
    endpoints: (builder) => ({
        getDealerships: builder.query<Dealership[], void> ({
            query: () => `/dealerships`,
        }),
        getDealershipById: builder.query<Dealership, number> ({
            query: (id) => `/dealerships/${id}`,
        }),
        getNumberOfDealershipsByState: builder.query<Array<[string, number]>, void> ({
            query: () => `/dealerships/number-of-dealerships-by-state`,
        }),
        addDealership: builder.mutation<Dealership, Partial<Dealership>> ({
            query: (dealership) => ({
                url: `/dealerships`,
                method: 'POST',
                body: dealership,
            })
        }),
        updateDealership: builder.mutation<Dealership, { id: number, dealership: Partial<Dealership> }> ({
            query: ({id, ...dealership}) => ({
                url: `/dealerships/${id}`,
                method: 'PUT',
                body: dealership,
            })
        }),
        deleteDealership: builder.mutation<void, number> ({
            query: (id) => ({
                url: `/dealerships/${id}`,
                method: 'DELETE',
            })
        }),
    }),
});

export const {
    useGetDealershipsQuery,
    useGetDealershipByIdQuery,
    useGetNumberOfDealershipsByStateQuery,
    useAddDealershipMutation,
    useUpdateDealershipMutation,
    useDeleteDealershipMutation,
} = dealershipsApi;