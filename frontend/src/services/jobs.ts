import axios from 'axios';
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

export { getAll };
