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

export interface CarRequestDTO {
    modelId: number;
    year: number;
    horsepower: number;
    kilometers: number;
    description: string;
    exterior: string;
    interior: string;
    fuelType: string;
    transmission: string;
    categoryId: number;
    features: number[];
    carType: string;
    price: number;
    images?: File[] | null;
};

interface PaginatedCarResponse {
    content: CarDTO[];
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
            query: () => `/car`,
        }),
        getCarsWithPagination: builder.query<PaginatedCarResponse, PaginationParams>({
            query: (params) => ({
                url: '/car/with-pagination',
                params: {
                    offset: params?.offset || 0,
                    pageSize: params?.pageSize || 10,
                    sortBy: params?.sortBy || 'id'
                }
            })
        }),
        addCar: builder.mutation<Car, { carData: CarRequestDTO; images: File[] }>({
            query: ({ carData, images }) => {
              const formData = new FormData();
              
              formData.append('car', new Blob([JSON.stringify({
                ...carData,
                modelId: Number(carData.modelId),
                year: Number(carData.year),
                price: Number(carData.price),
                horsepower: Number(carData.horsepower),
                kilometers: Number(carData.kilometers),
                categoryId: Number(carData.categoryId),
                features: carData.features.map(Number)
              })], {
                type: 'application/json'
              }));
              
              images.forEach((image) => {
                formData.append('images', image);
              });
          
              return {
                url: '/car/add',
                method: 'POST',
                body: formData,
                headers: {
                }
              };
            }
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
    useGetCarsWithPaginationQuery,
    useAddCarMutation,
    useGetCarByIdQuery,
    useGetCategoriesQuery,
    useGetBrandsQuery,
    useGetFeaturesQuery,
    useUpdateCarMutation,
    useDeleteCarMutation,
    useGetCarImportDutyQuery,
} = carsApi;