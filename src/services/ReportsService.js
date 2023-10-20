import axios from 'axios';

import config from './config';

const BASE_URL = `${config.API_URL}/api/reports`;

const AnalyticsService = {
  productList: () => axios.get(`${BASE_URL}/products`),
  orderList: () => axios.get(`${BASE_URL}/orders`),
  productReports: (id) => axios.get(`${BASE_URL}/products/${id}`),
  orderReports: (id) => axios.get(`${BASE_URL}/orders/${id}`),
  resolveProductReports: (id) => axios.post(`${BASE_URL}/products/${id}/resolve`),
  resolveOrderReports: (id) => axios.post(`${BASE_URL}/orders/${id}/resolve`),
};

export default AnalyticsService;
