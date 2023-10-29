import axios from 'axios';

import config from './config';

const BASE_URL = `${config.API_URL}/api/users`;

const UsersService = {
  acquireCode: (email) => axios.get(`${BASE_URL}/passwords/codes`, {
    params: {
      email,
    },
  }),
  
  login: (body) => axios.post(`${BASE_URL}/login`, body),
  logout: () => axios.post(`${BASE_URL}/logout`),

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
  retrieveUser: (id) => axios.get(`${BASE_URL}/${id}`),
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
  resetPassword: (body) => axios.post(`${BASE_URL}/passwords/reset`, body),

  updateAccount: (userType, body) => axios.put(`${BASE_URL}/${userType}`, body),
  updatePassword: (body) => axios.put(`${BASE_URL}/passwords/update`, body),
  updateUserStatus: (id, body) => axios.put(`${BASE_URL}/${id}`, body),
  updateSellerApplication: (id, body) => axios.put(`${BASE_URL}/sellers/applications/${id}`, body),

  signupBuyer: (body) => axios.post(`${BASE_URL}/buyers/register`, body),
  signupSeller: (body) => axios.post(`${BASE_URL}/sellers/register`, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),

  verifyCode: (body) => axios.post(`${BASE_URL}/passwords/codes/verify`, body),
};

export default UsersService;
