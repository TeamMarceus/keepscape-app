import axios from 'axios';

import config from './config';

const BASE_URL = `${config.API_URL}/api/finances`;

const FinancesService = {
  // Seller Side
  retrieveBalance: () => axios.get(`${BASE_URL}/seller/balance`),
  retriveSellerWithdrawals: ({ page, pageSize }) =>
    axios.get(`${BASE_URL}/seller/balance/withdrawals`, {
      params: {
        page,
        pageSize,
      },
    }),
  retrieveSellerLogs: ({ page, pageSize }) =>
    axios.get(`${BASE_URL}/seller/balance/logs`, {
      params: {
        page,
        pageSize,
      },
    }),
  requestWithdraw: (body) =>
    axios.post(`${BASE_URL}/seller/balance/withdrawals`, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),

  // Admin Side
  retrieveAdminWithdrawals: ({
    page,
    pageSize,
    paymentMethod,
    paymentStatus,
    sellerName,
  }) =>
    axios.get(`${BASE_URL}/admin/balance/withdrawals`, {
      params: {
        page,
        pageSize,
        paymentMethod,
        paymentStatus,
        sellerName,
      },
    }),
  updateWithdrawal: (id, body) =>
    axios.put(`${BASE_URL}/admin/balance/withdrawals/${id}`, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
};

export default FinancesService;
