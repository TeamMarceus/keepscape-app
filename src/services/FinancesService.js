import axios from 'axios';

import config from './config';

const BASE_URL = `${config.API_URL}/api/finances`;

const FinancesService = {

  // Seller Side
  retrieveBalance: () => axios.get(`${BASE_URL}/balance`),
  withdraw: (body) => axios.post(`${BASE_URL}/balance/withdrawals`, body , {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),

  // Admin Side
  retrieveWithdrawals: ({
    page,
    pageSize,
    paymentMethod,
    paymentStatus,
    sellerName,
  }) => axios.get(`${BASE_URL}/balance/withdrawals`, {
    params: {
      page,
      pageSize,
      paymentMethod,
      paymentStatus,
      sellerName,
    },
  }),
  updateWithdrawal: (id, body) => axios.put(`${BASE_URL}/balance/withdrawals/${id}`, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
};

export default FinancesService;
