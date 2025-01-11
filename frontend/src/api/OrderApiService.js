import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'http://localhost:8080';

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

const OrderApiService = {

    getOrder: async () => {
        try {
            const response = await axiosInstance.get('orders');
            return response.data;
        }catch(error){
            console.error('Error fetching orders: ', error.response?.data || error.message);
            throw error;
        }
    },


    getOrderById: async (orderId) => {
        try{
            const response = await axiosInstance.get(`/orders/${orderId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching order: ', error.response?.data || error.message);
            throw error;
        }
    },

    getOrderByCar: async (carId) => {
        try{
            const response = await axiosInstance.get(`orders/car/${carId}`);
            return response.data;
        }catch(error){
            console.error('Error fetching orders: ', error.response?.data || error.message);
            throw error;
        }
    },

    getOrderByUserId: async (userId) => {
        try {
            const response = await axiosInstance.get(`orders/user/${userId}`);
            return response.data;
        }catch (error){
            console.error('Error fetching orders: ', error.response?.data || error.message);
            throw error;
        }
    },
    addOrder: async(order) => {
        try{
            const response = await axiosInstance.post('orders/add', order);
            return response.data
        }catch (error){
            console.error('Error adding order: ', error.response?.data || error.message);
            throw error;
        }
    },

}