import axios from 'axios';

import config from './config';

const BASE_URL = `${config.API_URL}/api/Codes`;

const ConfirmationCodesService = {
  acquire: (email) =>
    axios.post(`${BASE_URL}/Acquire`, null, {
      params: {
        email,
      },
    }),
  verify: (body) => axios.post(`${BASE_URL}/Verify`, body),
};

export default ConfirmationCodesService;
