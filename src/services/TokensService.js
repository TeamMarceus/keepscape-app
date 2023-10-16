import axios from 'axios';

import config from './config';

const BASE_URL = `${config.API_URL}/api/tokens`;

const TokensService = {
  acquire: (body) => axios.post(`${BASE_URL}/acquire`, body),
  verify: (body) => axios.post(`${BASE_URL}/verify`, body),
  renew: (body) => axios.post(`${BASE_URL}/renew`, body),
};

export default TokensService;
