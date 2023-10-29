import axios from 'axios';

import config from './config';

const BASE_URL = `${config.API_URL}/api/carts`;

const CartsService = {
  count: () => axios.get(`${BASE_URL}/count`),
};

export default CartsService;
