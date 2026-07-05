import api from './axios';

export const getSettings = async () => {
  try {
    const response = await api.get('/api/settings');
    return response.data.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network Error' };
  }
};

export const updateSettings = async (data) => {
  try {
    const response = await api.post('/api/settings', data);
    return response.data.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network Error' };
  }
};
