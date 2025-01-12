import api from '../utils/api';

const OrderApiService = {

    getOrder: async () => {
        try {
            const response = await api.get('orders');
            return response.data;
        }catch(error){
            console.error('Error fetching orders: ', error.response?.data || error.message);
            throw error;
        }
    },


    getOrderById: async (orderId) => {
        try{
            const response = await api.get(`/orders/${orderId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching order: ', error.response?.data || error.message);
            throw error;
        }
    },

    getOrderByCar: async (carId) => {
        try{
            const response = await api.get(`orders/car/${carId}`);
            return response.data;
        }catch(error){
            console.error('Error fetching orders: ', error.response?.data || error.message);
            throw error;
        }
    },

    getOrderByUserId: async (userId) => {
        try {
            const response = await api.get(`orders/user/${userId}`);
            return response.data;
        }catch (error){
            console.error('Error fetching orders: ', error.response?.data || error.message);
            throw error;
        }
    },
    addOrder: async (order) => {
        try {
            const response = await api.post('/orders', order);
            return response.data;
        } catch (error) {
            console.error('Error adding order: ', error.response?.data || error.message); throw error;
        }
    },

};
export default OrderApiService;