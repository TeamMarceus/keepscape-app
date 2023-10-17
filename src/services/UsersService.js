import axios from 'axios';

import config from './config';

const BASE_URL = `${config.API_URL}/api/users`;

const UsersService = {
  // Public
  signupBuyer: (body) => axios.post(`${BASE_URL}/buyers/register`, body),
  signupSeller: (body) => axios.post(`${BASE_URL}/sellers/register`, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  login: (body) => axios.post(`${BASE_URL}/login`, body),
  logout: () => axios.post(`${BASE_URL}/logout`),

  // Forgot Password
  acquireCode: (email) => axios.get(`${BASE_URL}/passwords/codes`, {
    params: {
      email,
    },
  }),
  verifyCode: (body) => axios.post(`${BASE_URL}/passwords/codes/verify`, body),
  resetPassword: (body) => axios.post(`${BASE_URL}/passwords/reset`, body),
  updatePassword: (body) => axios.put(`${BASE_URL}/passwords/update`, body),

  // Seller Applications
  retrieveSellerApplications: ({status, page, pageSize}) => axios.get(`${BASE_URL}/sellers/applications`, {
    params: {
      status,
      page,
      pageSize,
    },
  }),
  updateSellerApplication: (id, body) => axios.put(`${BASE_URL}/sellers/applications/${id}`, body),

  // Users
  retrieveSellers: ({page, pageSize}) => axios.get(`${BASE_URL}/sellers`, {
    params: {
      page,
      pageSize,
    },
  }),
  retrieveBuyers: ({page, pageSize}) => axios.get(`${BASE_URL}/buyers`, {
    params: {
      page,
      pageSize,
    },
  }),
  updateUserStatus: (id, body) => axios.put(`${BASE_URL}/${id}`, body),
};

export default UsersService;
