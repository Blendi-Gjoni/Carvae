import api from '../utils/api';

const UserApiService =  {
    getAllUsers: async() => {
        try {
          const response = await api.get(`/users`);
          return response.data;
        } catch (error) {
          console.error('Error fetching users:', error);
          throw error;
        }
    },
  getCurrentUserId: async() => {
      try{
        const response = await api.get('/users/me');
        return response.data.id;
      }catch (error){
        console.error('Error fetching user: '. error);
        throw error;
      }
  }
};

export default UserApiService;