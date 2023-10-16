import axios from 'axios';

import config from './config';

const BASE_URL = `${config.API_URL}/api/users`;

const UsersService = {
  signupBuyer: (body) => axios.post(`${BASE_URL}/buyers/register`, body),
  signupSeller: (body) => axios.post(`${BASE_URL}/sellers/register`, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  login: (body) => axios.post(`${BASE_URL}/login`, body),
  logout: () => axios.post(`${BASE_URL}/logout`),
  acquireCode: (email) => axios.get(`${BASE_URL}/passwords/codes`, {
    params: {
      email,
    },
  }),
  resetPassword: (body) => axios.put(`${BASE_URL}/passwords/reset`, body),
  updatePassword: (body) => axios.put(`${BASE_URL}/passwords/update`, body),
};

export default UsersService;
