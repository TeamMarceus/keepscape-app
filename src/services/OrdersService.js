import axios from 'axios';

import config from './config';

const BASE_URL = `${config.API_URL}/api/orders`;

const OrdersService = {
  addOrderLogs: (orderId, body) => axios.post(`${BASE_URL}/sellers/${orderId}/logs`, body),
  cancelBuyerOrder: (orderId) => axios.post(`${BASE_URL}/buyers/${orderId}/cancel`),
  cancelSellerOrder: (orderId) => axios.post(`${BASE_URL}/sellers/${orderId}/cancel`),
  confirmOrder: (orderId) => axios.post(`${BASE_URL}/buyers/${orderId}/confirm`),
  count: () => axios.get(`${BASE_URL}/buyers/orders/count`),
  deliverOrder: (orderId) => axios.post(`${BASE_URL}/sellers/${orderId}/deliver`),
  retrieveBuyerOrders: ({
      status,
      search,
      productName,
      buyerName,
      sellerName,
      page,
      pageSize,
   }) => axios.get(`${BASE_URL}/buyers`, {
      params: {
         status,
         search,
         productName,
         buyerName,
         sellerName,
         page,
         pageSize,
      },
   }),
  retrieveSellerOrders: ({
    status,
    search,
    productName,
    buyerName,
    sellerName,
    page,
    pageSize,
  }) => axios.get(`${BASE_URL}/sellers`, {
    params: {
        status,
        search,
        productName,
        buyerName,
        sellerName,
        page,
        pageSize,
    },
  }),
  payOrder: (orderId, paypalOrderId) => axios.post(`${BASE_URL}/buyers/${orderId}/pay`, {
    paypalOrderId,
  }),
  updateOrderDeliveryFee: (orderId, body) => axios.put(`${BASE_URL}/sellers/${orderId}`, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
};

export default OrdersService;
