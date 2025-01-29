import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
    credentials: 'include',
});

export const ordersApi = createApi ({
    reducerPath: 'ordersApi',
    baseQuery,
    endpoints: (builder) => ({
        getOrders: builder.query ({
            query: () => `/orders`,
        }),
        getOrderById: builder.query ({
            query: ({ id }) => `/orders/${id}`,
        }),
        getOrdersByCar: builder.query ({
            query: ({ carId }) => `/orders/car/${carId}`,
        }),
        getOrdersByUserId: builder.query ({
            query: ({ userId }) => `/orders/user/${userId}`,
        }),
        addOrder: builder.mutation ({
            query: (order) => ({
                url: `/orders`,
                method: 'POST',
                body: order,
            }),
        }),
        updateOrder: builder.mutation ({
            query: ({id, ...order}) => ({
                url: `/orders/${id}`,
                method: 'PUT',
                body: order,
            }),
        }),
        deleteOrder: builder.mutatoin ({
            query: ({ id }) => ({
                url: `/orders/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetOrdersQuery,
    useGetOrderByIdQuery,
    useGetOrdersByCarQuery,
    useGetOrdersByUserIdQuery,
    useAddOrderMutation,
    useUpdateOrderMutation,
    useDeleteOrderMutation,
} = ordersApi;