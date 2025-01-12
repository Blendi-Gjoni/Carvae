import api from '../utils/api';

const RentalApiService = {
    getAllRentals: async () => {
        try {
            const response = await api.get(`/rentals`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching rentals:`, error);
            throw error;
        }
    },
    
    getRentalById: async (id) => {
        try {
            const response = await api.get(`/rentals/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching rental by ID: ${id}`, error);
            throw error;
        }
    },
    
    addRental: async (rental) => {
        try {
            const response = await api.post(`/rentals`, rental);
            return response.data;
        } catch (error) {
            console.error(`Error adding rental:`, error);
            throw error;
        }
    },
    
    updateRental: async (id, rental) => {
        try {
            const response = await api.put(`/rentals/${id}`, rental);
            return response.data;
        } catch (error) {
            console.error(`Error updating rental with ID: ${id}`, error);
            throw error;
        }
    },
    
    deleteRental: async (id) => {
        try {
            await api.delete(`/rentals/${id}`);
        } catch (error) {
            console.error(`Error deleting rental with ID: ${id}`, error);
            throw error;
        }
    }
};

export default RentalApiService;