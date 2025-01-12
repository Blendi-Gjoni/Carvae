import api from '../utils/api';

const OrderApiService = {

    getAllOrders: async () => {
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

    updateOrder: async (id, order) => {
        try {
            const response = await api.put(`/orders/${id}`, order);
            return response.data;
        } catch (error) {
            console.error(`Error updating order with ID: ${id}`, error);
            throw error;
        }
    },

    deleteOrder: async (id) => {
        try {
            const response = await api.delete(`/orders/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting order with ID: ${id}`, error);
            throw error;
        }
    }

};
export default OrderApiService;