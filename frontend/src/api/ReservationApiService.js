import api from '../utils/api';

const ReservationApiService = {
    getAllReservations: async () => {
        try {
            const response = await api.get(`/reservations`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching reservations:`, error);
            throw error;
        }
    },

    getReservationById: async (id) => {
        try {
            const response = await api.get(`/reservations/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching reservation by ID: ${id}`, error);
            throw error;
        }
    },

    createReservation: async (reservation) => {
        try {
            const response = await api.post(`/reservations`, reservation);
            return response.data;
        } catch (error) {
            console.error(`Error creating reservation:`, error);
            throw error;
        }
    },

    updateReservation: async (id, reservation) => {
        try {
            const response = await api.put(`/reservations/${id}`, reservation);
            return response.data;
        } catch (error) {
            console.error(`Error updating reservation with ID: ${id}`, error);
            throw error;
        }
    },

    deleteReservation: async (id) => {
        try {
            await api.delete(`/reservations/${id}`);
        } catch (error) {
            console.error(`Error deleting reservation with ID: ${id}`, error);
            throw error;
        }
    }
};

export default ReservationApiService;
