import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Car } from "./CarsApi";
import { User } from "./UsersApi";
import { Dealership } from "./DealershipsApi";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
    credentials: 'include',
});

export interface Order {
    id?: number;
    car: Car;
    user: User;
    orderDate: string;
    dealership: Dealership;
    deliveryDate: string;
    status: string;
    price: number;
    updatedAt: string;
};

export interface OrderDTO {
    id?: number;
    carId: number;
    userId: number;
    dealershipId: number;
};

export const ordersApi = createApi ({
    reducerPath: 'ordersApi',
    baseQuery,
    endpoints: (builder) => ({
        getOrders: builder.query<Order[], void> ({
            query: () => `/orders`,
        }),
        getOrderById: builder.query<Order, number> ({
            query: (id) => `/orders/${id}`,
        }),
        getOrdersByCar: builder.query<Order[], number> ({
            query: (carId) => `/orders/car/${carId}`,
        }),
        getOrdersByUserId: builder.query<Order[], number> ({
            query: (userId) => `/orders/user/${userId}`,
        }),
        addOrder: builder.mutation<Order, Partial<OrderDTO>> ({
            query: (order) => ({
                url: `/orders`,
                method: 'POST',
                body: order,
            }),
        }),
        updateOrder: builder.mutation<Order, {id: number, order: Partial<OrderDTO>}> ({
            query: ({id, ...order}) => ({
                url: `/orders/${id}`,
                method: 'PUT',
                body: order,
            }),
        }),
        deleteOrder: builder.mutation<void, number> ({
            query: (id) => ({
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