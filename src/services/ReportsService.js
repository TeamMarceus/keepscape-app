import axios from 'axios';

import config from './config';

const BASE_URL = `${config.API_URL}/api/reports`;

const AnalyticsService = {
  productList: () => axios.get(`${BASE_URL}/products`),
  orderList: () => axios.get(`${BASE_URL}/orders`),
};

export default AnalyticsService;
