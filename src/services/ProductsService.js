import axios from 'axios';

import config from './config';

const BASE_URL = `${config.API_URL}/api/products`;

const UsersService = {
  add: (body) =>
    axios.post(`${BASE_URL}`, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  addReviews: (productId, body) =>
    axios.post(`${BASE_URL}/${productId}/reviews`, body),
  checkout: (productId, body) =>
    axios.post(`${BASE_URL}/${productId}/checkout`, body),
  delete: (productId) => axios.delete(`${BASE_URL}/${productId}`),
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
  }) =>
    axios.get(`${BASE_URL}`, {
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
  retrieve: (productId) => axios.get(`${BASE_URL}/${productId}`),
  retrieveCategories: () => axios.get(`${BASE_URL}/categories`),
  retrievePlaces: () => axios.get(`${BASE_URL}/places`),
  retrieveSellerProfile: (sellerProfileId) =>
    axios.get(`${BASE_URL}/sellers/${sellerProfileId}`),
  retrieveReview: (productId) => axios.get(`${BASE_URL}/${productId}/review`),
  reviews: (productId, { stars, page, pageSize }) =>
    axios.get(`${BASE_URL}/${productId}/reviews`, {
      params: {
        stars,
        page,
        pageSize,
      },
    }),
  update: (productId, body) =>
    axios.put(`${BASE_URL}/${productId}`, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  updateReview: (productId, body) =>
    axios.put(`${BASE_URL}/${productId}/reviews`, body),
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
  }) =>
    axios.get(`${BASE_URL}/sellers`, {
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
