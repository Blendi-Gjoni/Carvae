import api from '../utils/api';

const AddCarApiService = {
    // Fetch all models by brand ID
    getModelsByBrandId: async (brandId) => {
        try {
            const response = await api.get(`/brands/${brandId}/models`);
            return response.data; // Return the actual data
        } catch (error) {
            console.error('Error fetching models:', error.response?.data || error.message);
            throw error;
        }
    },

    getCarsByType: async(carType) => {
        try{
            const response = await api.get(`/car/type?carType=${carType}`);
            return response;
        }catch(error){
            console.error('Error fetching cars: ', error.response?.data || error.message);
            throw error;
        }
    },

    // Fetch a specific brand by ID
    getBrandById: async (brandId) => {
        try {
            const response = await api.get(`/brands/${brandId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching brand:', error.response?.data || error.message);
            throw error;
        }
    },

    getAllCars: async() => {
      try{
          const response = await api.get('/car/allCars');
          return response.data;
      }catch(error){
          console.error('Error fetching cars: ', error.response?.data || error.message);
          throw error;
      }
    },

    addCar: async (car) => {
        try {
            const response = await api.post('/car/add', car);
            return response.data; // Return the actual response data
        } catch (error) {
            console.error('Error adding car:', error.response?.data || error.message);
            throw error; // Rethrow the error to handle it in the calling function
        }
    },

    getCarById: async (carId) => {
        try{
            const response = await api.get(`car/${carId}`)
            return response.data;
        }catch(error){
            console.error('Error fetching car: ', error.response?.data || error.message);
            throw error;
        }
    },

    // Fetch all categories
    getAllCategories: async () => {
        try {
            const response = await api.get(`/category/all`);
            return response.data;
        } catch (error) {
            console.error('Error fetching categories:', error.response?.data || error.message);
            throw error;
        }
    },

    // Fetch all brands
    getAllBrands: async () => {
        try {
            const response = await api.get(`/brands/all`);
            return response.data;
        } catch (error) {
            console.error('Error fetching brands:', error.response?.data || error.message);
            throw error;
        }
    },

    // Fetch all features
    getAllFeatures: async () => {
        try {
            const response = await api.get('/features');
            return response.data;
        } catch (error) {
            console.error('Error fetching features:', error.response?.data || error.message);
            throw error;
        }
    },

    // updateCar: async (id, car) => {
    //     try {
    //         console.log('Update Car ID:', id);
    //         console.log('Car Data:', car);
    //         const response = await api.put(`/car/${id}`, car);
    //         return response.data;
    //     } catch (error) {
    //         console.error(`Error updating car with ID: ${id}`, error);
    //         throw error;
    //     }
    // },
    deleteCar: async (id) => {
        try{
            await api.delete('/car/${id}');
        }catch (error) {
            console.error(`Error deleting car with ID: ${id}`, error);
            throw error;
        }
    }

};

export default AddCarApiService;
