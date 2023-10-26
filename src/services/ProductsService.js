import axios from 'axios';

import config from './config';

const BASE_URL = `${config.API_URL}/api/products`;

const UsersService = {
  add: (body) => axios.post(`${BASE_URL}`, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }), 
  productList: ({
    sellerProfileId,
    search,
    provinces,
    categories,
    rating,
    minPrice,
    maxPrice,
    isHidden,
    page,
    pageSize,
    descending,
  }) => axios.get(`${BASE_URL}`, {
    params: {
      sellerProfileId,
      search,
      provinces,
      categories,
      rating,
      minPrice,
      maxPrice,
      isHidden,
      page,
      pageSize,
      descending,
    },
  }),
  retrieveCategories: () => axios.get(`${BASE_URL}/categories`),
  retrievePlaces: () => axios.get(`${BASE_URL}/places`),
  retrieve: (productId) => axios.get(`${BASE_URL}/${productId}`),
  update: (productId, body) => axios.put(`${BASE_URL}/${productId}`, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  delete: (productId) => axios.delete(`${BASE_URL}/${productId}`),
  reviews: (productId,{
    stars,
    page,
    pageSize,
  }) => axios.get(`${BASE_URL}/${productId}/reviews`, {
    params: {
      stars,
      page,
      pageSize,
    },
  }),
  addReviews: (productId, body) => axios.post(`${BASE_URL}/${productId}/reviews`, body),
  sellerProductList: ({
    sellerProfileId,
    search,
    provinces,
    categories,
    rating,
    minPrice,
    maxPrice,
    isHidden,
    page,
    pageSize,
    descending,
  }) => axios.get(`${BASE_URL}/sellers`, {
    params: {
      sellerProfileId,
      search,
      provinces,
      categories,
      rating,
      minPrice,
      maxPrice,
      isHidden,
      page,
      pageSize,
      descending,
    },
  }),
};

export default UsersService;
