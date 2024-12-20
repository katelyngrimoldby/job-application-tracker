import axios from 'axios';
import {
  NewApplicationFile,
  ApplicationFile,
  InterviewFile,
  NewInterviewFile,
} from '../types';
const baseUrl = '/api/files';

const getAll = async (token: string, userId: number) => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
      userId,
    },
  };

  const response = await axios.get<{
    applicationFiles: ApplicationFile[];
    interviewFiles: InterviewFile[];
  }>(`${baseUrl}}`, config);

  return response.data;
};

const addNewAF = async (
  token: string,
  userId: number,
  payload: NewApplicationFile
) => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
      userId,
    },
  };

  const response = await axios.post<ApplicationFile>(
    `${baseUrl}/application`,
    payload,
    config
  );

  return response.data;
};

const addNewIF = async (
  token: string,
  userId: number,
  payload: NewInterviewFile
) => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
      userId,
    },
  };

  const response = await axios.post<InterviewFile>(
    `${baseUrl}/interview`,
    payload,
    config
  );

  return response.data;
};

const editAF = async (
  token: string,
  userId: number,
  payload: NewApplicationFile,
  id: number
) => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
      userId,
    },
  };

  const response = await axios.put<ApplicationFile>(
    `${baseUrl}/application/${id}`,
    payload,
    config
  );

  return response.data;
};

const editIF = async (
  token: string,
  userId: number,
  payload: NewInterviewFile,
  id: number
) => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
      userId,
    },
  };

  const response = await axios.put<InterviewFile>(
    `${baseUrl}/interview/${id}`,
    payload,
    config
  );

  return response.data;
};

const removeAF = async (token: string, userId: number, id: number) => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
      userId,
    },
  };

  const response = await axios.delete<ApplicationFile>(
    `${baseUrl}/application/${id}`,
    config
  );

  return response.data;
};

const removeIF = async (token: string, userId: number, id: number) => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
      userId,
    },
  };

  const response = await axios.delete<InterviewFile>(
    `${baseUrl}/interview/${id}`,
    config
  );

  return response.data;
};

export default {
  getAll,
  addNewAF,
  addNewIF,
  editAF,
  editIF,
  removeAF,
  removeIF,
};
