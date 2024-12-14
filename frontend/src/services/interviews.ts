import axios from 'axios';
import { Interview, NewInterview } from '../types';
const baseUrl = '/api/interviews';

const getAll = async (token: string, userid: number, params?: string) => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
      userid,
    },
  };

  const response = await axios.get<Interview[]>(
    `${baseUrl}/${params ? params : ''}`,
    config
  );

  return response.data;
};

const addNew = async (token: string, userid: number, payload: NewInterview) => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
      userid,
    },
  };

  const response = await axios.post<Interview>(`${baseUrl}`, payload, config);

  return response.data;
};

const edit = async (
  token: string,
  payload: NewInterview,
  userid: number,
  id: number
) => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
      userid,
    },
  };

  const response = await axios.put<Interview>(
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
