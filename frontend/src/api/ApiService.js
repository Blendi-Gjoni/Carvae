import axios from 'axios';
import Cookies from "js-cookie";

const API_BASE_URL = 'http://localhost:8080'; // Adjust based on your backend setup

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true, // Enable sending cookies with requests
});


axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token') || null;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const ApiService = {
    // Fetch all models by brand ID
    getModelsByBrandId: async (brandId) => {
        try {
            const response = await axiosInstance.get(`/brands/${brandId}/models`);
            return response.data; // Return the actual data
        } catch (error) {
            console.error('Error fetching models:', error.response?.data || error.message);
            throw error;
        }
    },

    // Fetch a specific brand by ID
    getBrandById: async (brandId) => {
        try {
            const response = await axiosInstance.get(`/brands/${brandId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching brand:', error.response?.data || error.message);
            throw error;
        }
    },

    // Fetch all categories
    getAllCategories: async () => {
        try {
            const response = await axiosInstance.get(`/category/all`);
            return response.data;
        } catch (error) {
            console.error('Error fetching categories:', error.response?.data || error.message);
            throw error;
        }
    },

    // Fetch all brands
    getAllBrands: async () => {
        try {
            const response = await axiosInstance.get(`/brands/all`);
            return response.data;
        } catch (error) {
            console.error('Error fetching brands:', error.response?.data || error.message);
            throw error;
        }
    },

    // Fetch all features
    getAllFeatures: async () => {
        try {
            const response = await axiosInstance.get('/features');
            return response.data;  // Adjust the endpoint based on your backend
        } catch (error) {
            console.error('Error fetching features:', error.response?.data || error.message);
            throw error;
        }
    },

};

export default ApiService;
