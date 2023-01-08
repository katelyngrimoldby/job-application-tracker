import axios from 'axios';
import { Job } from '../types';
const baseUrl = '/api/jobs';

const getAll = async (token: string, params?: string) => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };

  const response = await axios.get<Job[]>(
    `${baseUrl}/${params ? params : ''}`,
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

  const response = await axios.post<Job>(`${baseUrl}`, payload, config);

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

  const response = await axios.put<Job>(`${baseUrl}/${id}`, payload, config);

  return response.data;
};

const deleteJob = async (token: string, id: number) => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);

  return response.data;
};

export { getAll, addNew, editJob, deleteJob };
