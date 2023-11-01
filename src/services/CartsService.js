import axios from 'axios';

import config from './config';

const BASE_URL = `${config.API_URL}/api/carts`;

const CartsService = {
  add: (product) => axios.post(`${BASE_URL}`, product),
  checkout: () => axios.post(`${BASE_URL}/checkout`),
  count: () => axios.get(`${BASE_URL}/count`),
  retrieve: () => axios.get(`${BASE_URL}`),
  remove: (ids) => axios.delete(`${BASE_URL}`, ids),
};

export default CartsService;
