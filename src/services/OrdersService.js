import axios from 'axios';

import config from './config';

const BASE_URL = `${config.API_URL}/api/orders`;

const OrdersService = {
   count: () => axios.get(`${BASE_URL}/buyers/orders/count`),
   retrieveSellerOrders: ({
      status,
      productName,
      buyerName,
      sellerName,
      page,
      pageSize,
   }) => axios.get(`${BASE_URL}/sellers`, {
      params: {
         status,
         productName,
         buyerName,
         sellerName,
         page,
         pageSize,
      },
   }),
   updateOrderDeliveryFee: (orderId, body) => axios.put(`${BASE_URL}/sellers/${orderId}`, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  cancelOrder: (orderId) => axios.post(`${BASE_URL}/sellers/${orderId}/cancel`),
  deliverOrder: (orderId) => axios.post(`${BASE_URL}/sellers/${orderId}/deliver`),
  addOrderLogs: (orderId, body) => axios.post(`${BASE_URL}/sellers/${orderId}/logs`, body),
};

export default OrdersService;
