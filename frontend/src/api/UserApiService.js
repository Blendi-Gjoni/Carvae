import api from '../utils/api';

const getAllUsers = async () => {
  try {
    const response = await api.get(`/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export default {
  getAllUsers,
};
