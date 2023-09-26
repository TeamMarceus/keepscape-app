import axios from 'axios';

import config from './config';

const BASE_URL = `${config.API_URL}/api/Users`;

const UsersService = {
  signup: (body) => axios.post(`${BASE_URL}/Register`, body),
  login: (body) => axios.post(`${BASE_URL}/Login`, body),
  logout: () => axios.post(`${BASE_URL}/Logout`),
  resetPassword: (body) => axios.put(`${BASE_URL}/Password/Reset`, body),
  updatePassword: (body) => axios.put(`${BASE_URL}/Password/Update`, body),
};

export default UsersService;
