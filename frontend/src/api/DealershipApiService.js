import api from '../utils/api';

const DealershipApiService = {
    getAllDealerships: async () => {
        try {
            const response = await api.get(`/dealerships`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching dealerships:`, error);
            throw error;
        }
    },

    getDealershipById: async (id) => {
        try {
            const response = await api.get(`/dealerships/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching dealership by ID: ${id}`, error);
            throw error;
        }
    },

    addDealership: async (dealership) => {
        try {
            const response = await api.post(`/dealerships`, dealership);
            return response.data;
        } catch (error) {
            console.error(`Error adding dealership:`, error);
            throw error;
        }
    },

    updateDealership: async (id, dealership) => {
        try {
            const response = await api.put(`/dealerships/${id}`, dealership);
            return response.data;
        } catch (error) {
            console.error(`Error updating dealership with ID: ${id}`, error);
            throw error;
        }
    },

    deleteDealership: async (id) => {
        try {
            await api.delete(`/dealerships/${id}`);
        } catch (error) {
            console.error(`Error deleting dealership with ID: ${id}`, error);
            throw error;
        }
    }
};

export default DealershipApiService;
