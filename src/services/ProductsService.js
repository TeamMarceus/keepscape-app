import axios from 'axios';

import config from './config';

const BASE_URL = `${config.API_URL}/api/products`;

const UsersService = {
  create: (body) => axios.post(`${BASE_URL}`, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }), 
  filterList: ({
    search,
    province,
    category,
    sellerId,
    rating,
    minPrice,
    maxPrice,
    page,
    pageSize,
    decending,
  }) => axios.get(`${BASE_URL}/products`, {
    params: {
      search,
      province,
      category,
      sellerId,
      rating,
      minPrice,
      maxPrice,
      page,
      pageSize,
      decending,
    },
  }),
  retrieveCategories: () => axios.get(`${BASE_URL}/categories`),
  retrieveProvinces: () => axios.get(`${BASE_URL}/places`),
  retrieve: (productId) => axios.get(`${BASE_URL}/${productId}`),
  update: (productId, body) => axios.put(`${BASE_URL}/${productId}`, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  delete: (productId) => axios.delete(`${BASE_URL}/${productId}`),
  addReviews: (productId, body) => axios.post(`${BASE_URL}/${productId}/reviews`, body),
};

export default UsersService;
