import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
    credentials: 'include',
});

export const dealershipsApi = createApi ({
    reducerPath: "dealershipsApi",
    baseQuery,
    endpoints: (builder) => ({
        getDealerships: builder.query ({
            query: () => `/dealerships`,
        }),
        getDealershipById: builder.query ({
            query: ({ id }) => `/dealerships/${id}`,
        }),
        addDealership: builder.mutation ({
            query: (dealership) => ({
                url: `/dealerships`,
                method: 'POST',
                body: dealership,
            })
        }),
        updateDealership: builder.mutation({
            query: ({id, ...dealership}) => ({
                url: `/dealerships/${id}`,
                method: 'PUT',
                body: dealership,
            })
        }),
        deleteDealership: builder.mutation ({
            query: ({id}) => ({
                url: `/dealerships/${id}`,
                method: 'DELETE',
            })
        }),
    }),
});

export const {
    useGetDealershipsQuery,
    useGetDealershipByIdQuery,
    useAddDealershipMutation,
    useUpdateDealershipMutation,
    useDeleteDealershipMutation,
} = dealershipsApi;