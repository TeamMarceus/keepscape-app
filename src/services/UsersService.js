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
  retrieveSellerApplications: ({
    status, 
    page, 
    pageSize, 
    search}) => axios.get(`${BASE_URL}/sellers/applications`, {
    params: {
      status,
      page,
      pageSize,
      search,
    },
  }),
  updateSellerApplication: (id, body) => axios.put(`${BASE_URL}/sellers/applications/${id}`, body),

  // Users
  retrieveSellers: ({
    page, 
    pageSize,
    isBanned,
    search,
    isDescending,
    orderBy,
    userId,
  }) => axios.get(`${BASE_URL}/sellers`, {
    params: {
      page,
      pageSize,
      isBanned,
      isDescending,
      orderBy,
      userId,
      search,
    },
  }),
  retrieveBuyers: ({
    page, 
    pageSize,
    isBanned,
    search,
    isDescending,
    orderBy,
    userId,
  }) => axios.get(`${BASE_URL}/buyers`, {
    params: {
      page, 
      pageSize,
      isBanned,
      search,
      isDescending,
      orderBy,
      userId,
    },
  }),
  updateUserStatus: (id, body) => axios.put(`${BASE_URL}/${id}`, body),
};

export default UsersService;
