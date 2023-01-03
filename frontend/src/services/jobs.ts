import axios from 'axios';
import { Job } from '../types';
const baseUrl = 'http://localhost:3000/api';

const getAll = async (token: string, params?: string) => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };

  console.log(params);

  const response = await axios.get<Job[]>(
    `${baseUrl}/jobs${params ? params : ''}`,
    config
  );

  return response.data;
};

const addNew = async (token: string, payload: Omit<Job, 'id' | 'userId'>) => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };

  const response = await axios.post<Job>(`${baseUrl}/jobs`, payload, config);

  return response.data;
};

const editJob = async (
  token: string,
  payload: Omit<Job, 'id' | 'userId'>,
  id: number
) => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };

  const response = await axios.put<Job>(
    `${baseUrl}/jobs/${id}`,
    payload,
    config
  );

  return response.data;
};

const deleteJob = async (token: string, id: number) => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };

  const response = await axios.delete(`${baseUrl}/jobs/${id}`, config);

  return response.data;
};

export { getAll, addNew, editJob, deleteJob };
