import axios from 'axios';
import { Job } from '../types';
const baseUrl = 'http://localhost:3000/api';

const getAll = async (token: string) => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };

  const response = await axios.get(`${baseUrl}/jobs`, config);

  return response.data;
};

const addNew = async (token: string, payload: Omit<Job, 'id' | 'userId'>) => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };

  const response = await axios.post(`${baseUrl}/jobs`, payload, config);

  return response.data;
};

export { getAll, addNew };
