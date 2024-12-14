import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const API_BASE_URL = 'http://localhost:8080'; // Adjust based on your backend setup

const ApiService = {
    // Fetch all models by brand ID
    getModelsByBrandId: async (brandId) => {
        let token = localStorage.getItem('token');
            try {
                return axios.get(`${API_BASE_URL}/brands/${brandId}/models`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            } catch (error) {
                console.error('Error fetching models:', error);
                throw error;
            }
    },

    // Fetch a specific brand by ID
    getBrandById: async (brandId) => {
        let token = localStorage.getItem('token');
        try {
            return axios.get(`${API_BASE_URL}/brands/${brandId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error('Error fetching brand:', error);
            throw error;
        }
    },

    // Fetch all brands
    getAllBrands: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/brands/`);
            return response.data; // List of brands
        } catch (error) {
            console.error('Error fetching brands:', error);
            throw error;
        }
    },
};

export default ApiService;
