import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
    credentials: 'include',
});

interface Brand {
    id: number;
    name: string;
};

interface Model {
    id: number;
    name: string;
    brand: Brand;
};

interface Category {
    id: number;
    name: string;
    description: string;
};

interface Features {
    id: number;
    name: string;
    description: string;
};

export interface Car {
    id: number;
    model: Model;
    year: number;
    horsepower: number;
    kilometers: number;
    description: string;
    exterior: string;
    interior: string;
    fuelType: string;
    transmission: string;
    category: Category;
    features: Features[];
    price: number;
    carType: string;
    imagePaths: string[];
};

export interface CarDTO {
    id: number;
    modelId: number;
    brandName: string;
    modelName: string;
    year: number;
    horsepower: number;
    kilometers: number;
    description: string;
    exterior: string;
    interior: string;
    fuelType: string;
    transmission: string;
    categoryId: number;
    categoryName: string;
    features: number[];
    price: number;
    carType: string;
    imagePaths: string[];
};

export const carsApi = createApi ({
    reducerPath: 'carsApi',
    baseQuery,
    endpoints: (builder) => ({
        getModelsByBrandId: builder.query<Model[], number> ({
            query: (brandId) => `/brands/${brandId}/models`,
        }),
        getCarsByType: builder.query<CarDTO[], string> ({
            query: (carType) => `/car/type?carType=${carType}`,
        }),
        getBrandById: builder.query<Brand, number> ({
            query: (brandId) => `/brands/${brandId}`,
        }),
        getCars: builder.query<CarDTO[], void> ({
            query: () => `/car/allCars`,
        }),
        addCar: builder.mutation<Car, Partial<CarDTO>> ({
            query: (car) => ({
                url: `/car/add`,
                method: 'POST',
                body: car,
            })
        }),
        getCarById: builder.query<Car, number> ({
            query: (id) => `/car/${id}`,
        }),
        getCategories: builder.query<Category[], void> ({
            query: () => `/category/all`,
        }),
        getBrands: builder.query<Brand[], void> ({
            query: () => `/brands/all`,
        }),
        getFeatures: builder.query<Features[], void> ({
            query: () => `/features`,
        }),
        updateCar: builder.mutation<Car, { id: number, car: Partial<CarDTO> }> ({
            query: ({id, ...car}) => ({
                url: `/car/${id}`,
                method: 'PUT',
                body: car,
            })
        }),
        deleteCar: builder.mutation<void, number> ({
            query: (id) => ({
                url: `/car/${id}`,
                method: 'DELETE',
            })
        }),
        getCarImportDuty: builder.query<number[], number> ({
            query: (id) => `/car/import-duty/${id}`,
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
    useGetCarImportDutyQuery,
} = carsApi;