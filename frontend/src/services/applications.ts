import axios from 'axios';
import { NewApplication, Application } from '../types';
const baseUrl = '/api/applications';

const getAll = async (token: string, userid: number, params?: string) => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
      userid,
    },
  };

  const response = await axios.get<Application[]>(
    `${baseUrl}/${params ? params : ''}`,
    config
  );

  return response.data;
};

const addNew = async (
  token: string,
  userid: number,
  payload: NewApplication
) => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
      userid,
    },
  };

  const response = await axios.post<Application>(`${baseUrl}`, payload, config);

  return response.data;
};

const edit = async (
  token: string,
  payload: NewApplication,
  userid: number,
  id: number
) => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
      userid,
    },
  };

  const response = await axios.put<Application>(
    `${baseUrl}/${id}`,
    payload,
    config
  );

  return response.data;
};

const remove = async (token: string, userid: number, id: number) => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
      userid,
    },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);

  return response.data;
};

export { getAll, addNew, edit, remove };
