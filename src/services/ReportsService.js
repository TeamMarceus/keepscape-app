import axios from 'axios';

import config from './config';

const BASE_URL = `${config.API_URL}/api/reports`;

const ReportsService = {
  productList: ({ productName, sellerName, page, pageSize }) =>
    axios.get(`${BASE_URL}/products`, {
      params: {
        productName,
        sellerName,
        page,
        pageSize,
      },
    }),
  orderList: ({ sellerName, buyerName, page, pageSize }) =>
    axios.get(`${BASE_URL}/orders`, {
      params: {
        sellerName,
        buyerName,
        page,
        pageSize,
      },
    }),
  productReports: (id) => axios.get(`${BASE_URL}/products/${id}`),
  orderReports: (id) => axios.get(`${BASE_URL}/orders/${id}`),
  resolveProductReports: (id) =>
    axios.post(`${BASE_URL}/products/${id}/resolve`),
  resolveOrderReports: (id) => axios.post(`${BASE_URL}/orders/${id}/resolve`),
  refund: (id) => axios.post(`${BASE_URL}/orders/${id}/refund`),
  reportProduct: (id, body) => axios.post(`${BASE_URL}/products/${id}`, body),
  reportOrder: (id, body) => axios.post(`${BASE_URL}/orders/${id}`, body),
};

export default ReportsService;
