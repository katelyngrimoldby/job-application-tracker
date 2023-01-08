import axios from 'axios';
const baseUrl = '/api';

const login = async (payload: { username: string; password: string }) => {
  const response = await axios.post(`${baseUrl}/auth/login`, payload);
  return response.data;
};

const register = async (payload: {
  username: string;
  name: string;
  password: string;
}) => {
  const response = await axios.post(`${baseUrl}/users`, payload);
  return response.data;
};

const getSession = async (id: number) => {
  const response = await axios.get(`${baseUrl}/auth/${id}`);

  return response.data;
};

const logout = async (token: string) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };
  const response = await axios.delete(`${baseUrl}/auth/logout`, config);

  return response.data;
};

export { login, register, getSession, logout };
