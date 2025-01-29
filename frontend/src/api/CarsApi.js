import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
    credentials: 'include',
});

export const carsApi = createApi ({
    reducerPath: 'carsApi',
    baseQuery,
    endpoints: (builder) => ({
        getModelsByBrandId: builder.query ({
            query: (brandId) => `/brands/${brandId}/models`,
        }),
        getCarsByType: builder.query ({
            query: (carType) => `/car/ty[e?carType=${carType}`,
        }),
        getBrandById: builder.query ({
            query: (brandId) => `/brands/${brandId}`,
        }),
        getCars: builder.query ({
            query: () => `/car/allCars`,
        }),
        addCar: builder.mutation ({
            query: (car) => ({
                url: `/car/add`,
                method: 'POST',
                body: car,
            })
        }),
        getCarById: builder.query ({
            query: ({ id }) => `/car/${id}`,
        }),
        getCategories: builder.query ({
            query: () => `/category/all`,
        }),
        getBrands: builder.query ({
            query: () => `/brands/all`,
        }),
        getFeatures: builder.query ({
            query: () => `/features`,
        }),
        updateCar: builder.mutation ({
            query: ({id, ...car}) => ({
                url: `/car/${id}`,
                method: 'PUT',
                body: car,
            })
        }),
        deleteCar: builder.mutation ({
            query: ({ id }) => ({
                url: `/car/${id}`,
                method: 'DELETE',
            })
        }),
    }),
});

export const {
    useGetModelsByBrandIdQuery,
    useGetCarsByTypeQuery,
    useGetBrandByIdQuery,
    useGetCarsQuery,
    useAddCarMutation,
    useGetCarByIdQuery,
    useGetCategoriesQuery,
    useGetBrandsQuery,
    useGetFeaturesQuery,
    useUpdateCarMutation,
    useDeleteCarMutation,
} = carsApi;