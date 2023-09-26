import axios from 'axios';

import config from './config';

const BASE_URL = `${config.API_URL}/api/Tokens`;

const TokensService = {
  acquire: (body) => axios.post(`${BASE_URL}/Acquire`, body),
  verify: (body) => axios.post(`${BASE_URL}/Verify`, body),
  renew: (body) => axios.post(`${BASE_URL}/Renew`, body),
};

export default TokensService;
