import axios from 'axios';

import config from './config';

const BASE_URL = `${config.API_URL}/api/carts`;

const CartsService = {
  add: (product) => axios.post(`${BASE_URL}`, product),
  checkout: () => axios.post(`${BASE_URL}/checkout`),
  count: () => axios.get(`${BASE_URL}/count`),
  retrieve: () => axios.get(`${BASE_URL}`),
  deleteCart: (ids) => axios.delete(`${BASE_URL}`, {
    data: ids,
    headers: {
      'Content-Type': 'application/json', 
    },
  })
};

export default CartsService;
