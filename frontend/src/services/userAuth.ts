import axios from 'axios';
const baseUrl = 'http://localhost:3000/api';

const login = async (payload: { username: string; password: string }) => {
  const response = await axios.post(`${baseUrl}/login`, payload);
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

const logout = async (token: string) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };
  const response = await axios.delete(`${baseUrl}/logout`, config);

  return response.data;
};

export { login, register, logout };
