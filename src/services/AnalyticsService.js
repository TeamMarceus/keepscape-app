import axios from 'axios';

import config from './config';

const BASE_URL = `${config.API_URL}/api/Analytics`;

const AnalyticsService = {
  retrieve: (year) => axios.get(`${BASE_URL}`, null, {
    params: {
      year,
    },
  }),
};
export default AnalyticsService;
